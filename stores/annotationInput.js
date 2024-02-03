import { defineStore } from "pinia";
import { useGeneralStore } from "~/stores/generalStore";
import { useHintStore} from "~/stores//hintStore";

export const useAnnotationInputStore = defineStore("annotation_input", {
  state: () => {
    return {
      question: "",
      answer: "",
      confirmedData: [],
      anno_file_data: null,
      anno_file_name: "data",
      current_table_index: 0,
      anno_name: "Annotator 1",
      hints: useHintStore(),
    };
  },
  actions: {
    async load_confirmed_qas() {
      let anno_name            = localStorage.getItem("anno_name"),
          local_anno_file_data = localStorage.getItem("anno_file_data"),
          local_anno_file_name = localStorage.getItem("anno_file_name"),
          local_confirmed_qa   = localStorage.getItem("confirmed_qa"),
          current_table_index  = localStorage.getItem("current_table_index");

      if (anno_name)
        this.anno_name = anno_name;

      if (!local_anno_file_data) return;
      this.anno_file_data = JSON.parse(local_anno_file_data);

      if (local_anno_file_name)
        this.anno_file_name = local_anno_file_name;

      if (local_confirmed_qa)
        this.confirmedData = JSON.parse(local_confirmed_qa);

      if (current_table_index)
        this.current_table_index = Number(current_table_index);

      // Create New Hints Set for each table
      this.hints.init_hint_set(this.getNumOfTables);
    },

    check_valid_qa() {
      if (!this.question) {
        useGeneralStore().show_toast("error", "Please Enter a Question!");
        return false;
      }
      if (!this.answer) {
        useGeneralStore().show_toast("error", "Please Enter an Answer!");
        return false;
      }
      let checked_hints = this.hints.get_checked_hints(this.current_table_index);
      if (checked_hints.length < 1) {
        useGeneralStore().show_toast(
        "error",
        "Please choose AT LEAST ONE Hint!",
        );
        return false;
      }
      return true;
    },

    confirm_qa() {
      if (!this.check_valid_qa()) return;

      let checked_hints = this.hints.get_checked_hints(this.current_table_index);
      let dataPoint = {
        question: this.question,
        answer: this.answer,
        table_id: this.current_table_index,
        hints: checked_hints,
      };

      // Save to current confirmed data and local storage
      this.confirmedData.push(dataPoint);
      window.localStorage.setItem(
        "confirmed_qa",
        JSON.stringify(this.confirmedData),
      );
      useGeneralStore().show_toast("success", "Save Your Data Successfully.");

      // Reset Input QA Values
      this.question = "";
      this.answer = "";
      // Update New Hints set
      this.hints.update_display_hints(this.current_table_index);
    },

    download_confirmed() {
      if (this.confirmedData.length === 0) {
        useGeneralStore().show_toast(
          "error",
          "There is no confirmed data to be downloaded",
        );
        return;
      }
      const jsonString = JSON.stringify(this.confirmedData);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = `${this.anno_file_name}_done.json`;
      link.click();

      URL.revokeObjectURL(url);
      useGeneralStore().show_toast(
        "success",
        `Successfully Download ${this.anno_file_name}_done.json`,
      );
    },

    async download_as_confirmed() {
      const dataType = ref("Text");
      const res = useFileSystemAccess({
        suggestedName: `${this.anno_file_name}_done.json`,
        dataType,
        types: [
          {
            description: "JSON",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
        excludeAcceptAllOption: true,
      });
      res.data.value = JSON.stringify(this.confirmedData);
      await res.saveAs();
      useGeneralStore().show_toast(
        "success",
        "Successfully Download Your Confirmed",
      );
    },

    removeConfirmed(confirmed) {
      if (!confirm("Are you sure want to remove this?")) return;
      // Update checked_count
      // Loop through every hint in hint list of this table
      for (let i = 0; i < this.hints.hint_set[confirmed.table_id].length; i++) {
        // check if this hint[i] is in confirmed's hint
        let hint_i_index =
          this.hints.hint_set[confirmed.table_id][i].hint_index;
        let hint_i_content = this.hints.all_hints[hint_i_index];
        let found_index = confirmed.hints.indexOf(hint_i_content);
        if (found_index !== -1) {
          this.hints.hint_set[confirmed.table_id][i].checked_count--;
        }
      }

      // Remove Confirmed
      this.confirmedData.splice(this.confirmedData.indexOf(confirmed), 1);
      window.localStorage.setItem(
        "confirmed_qa",
        JSON.stringify(this.confirmedData),
      );
      if (this.confirmedData.length === 0)
        useGeneralStore().overlay.is_show = false;
    },
    update_confirmed(new_confirmed) {
      window.localStorage.setItem(
        "confirmed_qa",
        JSON.stringify(this.confirmedData),
      );
      useGeneralStore().show_toast(
        "success",
        "Your QA is updated successfully",
      );
    },
    update_anno_file_data(new_data, file_name) {
      if (this.anno_file_data != null)
        if (!confirm("There is already data uploaded, Are you sure to continue?"))
          return;
      // Reset Confirmed Data
      this.confirmedData = [];
      window.localStorage.removeItem("anno_file_data");
      window.localStorage.removeItem("confirmed_qa");
      window.localStorage.removeItem("current_hints_set");

      this.anno_file_data = new_data;
      this.anno_file_name = file_name;
      if (new_data == null) window.localStorage.removeItem("anno_file_data");
      else {
        window.localStorage.setItem("anno_file_data", JSON.stringify(new_data));
        window.localStorage.setItem("anno_file_name", file_name);
      }
      this.load_confirmed_qas();
    },
    setCurrentTableID(new_id) {
      this.current_table_index = new_id;
    },
    SaveAnnoName(new_name) {
      // TODO: Check Name validity

      this.anno_name = new_name;
      window.localStorage.setItem("anno_name", this.anno_name);
      useGeneralStore().overlay.is_show = false;
      useGeneralStore().show_toast("success", "Save Your Name Successfully");
    },
    getTableHTMLFromIndex(index) {
      return this.anno_file_data[index]["table_html"];
    },
  },
  getters: {
    getNumOfTables() {
      return this.anno_file_data.length;
    },
    getConfirmedData() {
      return this.confirmedData["qa"];
    },
    getCurrentTableHTML() {
      return this.anno_file_data[this.current_table_index]["table_html"];
    },
    getCurrentTableID() {
      return this.anno_file_data[this.current_table_index]["id"];
    },
  },
});
