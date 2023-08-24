import { defineStore } from "pinia";

export const useValidationStore = defineStore("validation", {
  state: () => {
    return {
      anno_file: {
        name: "demo.json",
        tables: [],
      },
      confirmed_file: {
        name: "demo_done.json",
        confirmed: [],
      },
    };
  },
  getters: {
    is_valid_anno_file() {
      const has_minimal_length = this.anno_file.tables.length > 0;
      if (!has_minimal_length) {
        alert("Your annotator file uploaded is not valid! Please try again");
        return false;
      }
      const has_table = this.anno_file.tables[0].table_html != undefined;
      if (!has_table) {
        alert("Your annotator file uploaded is not valid! Please try again");
        return false;
      }
      return true;
    },
    is_valid_confirmed_file() {
      const has_minimal_length = this.confirmed_file.confirmed.length > 0;
      if (!has_minimal_length) {
        alert("Your confirmed file uploaded is not valid! Please try again");
        return false;
      }
      const has_table = this.confirmed_file.confirmed[0].question != undefined;
      if (!has_table) {
        alert("Your confirmed file uploaded is not valid! Please try again");
        return false;
      }
      return true;
    },
    is_same_file() {
      const anno_name = this.anno_file.name.slice(
        0,
        this.anno_file.name.indexOf(".json"),
      );
      const confirmed_name = this.confirmed_file.name.slice(
        0,
        this.confirmed_file.name.indexOf("_done.json"),
      );
      if (anno_name != confirmed_name) return false;
      return true;
    },
  },
  actions: {
    loadLocalStorage() {
      const anno_file = localStorage.getItem("cv_anno_file");
      if (anno_file) this.anno_file = JSON.parse(anno_file);

      const confirmed_file = localStorage.getItem("cv_confirmed_file");
      if (confirmed_file) this.confirmed_file = JSON.parse(confirmed_file);
    },
    async download_confirmed_file() {
      if (this.confirmed_file.confirmed.length == 0) {
        useGeneralStore().show_toast(
          "error",
          "There is no confirmed data to be downloaded",
        );
        return;
      }
      const jsonString = JSON.stringify(this.confirmed_file.confirmed);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = `${this.anno_file.name.slice(
        0,
        this.anno_file.name.length - 5,
      )}_valid.json`;
      link.click();

      URL.revokeObjectURL(url);
      useGeneralStore().show_toast("success", `Successfully Download`);
    },
    update_anno_file(data) {
      this.anno_file.name = data.name;
      this.anno_file.tables = data.data;
      localStorage.setItem("cv_anno_file", JSON.stringify(this.anno_file));
    },
    update_confirmed_file(data) {
      this.confirmed_file.name = data.name;
      this.confirmed_file.confirmed = data.data;
      localStorage.setItem(
        "cv_confirmed_file",
        JSON.stringify(this.confirmed_file),
      );
    },
    delete_anno_file() {
      if (!confirm("Are you sure you want to reset?")) return;
      this.anno_file = {
        name: "demo.json",
        tables: [],
      };
      localStorage.removeItem("cv_anno_file");
    },
    delete_confirmed_file() {
      if (!confirm("Are you sure you want to reset?")) return;
      this.confirmed_file = {
        name: "demo_done.json",
        confirmed: [],
      };
      localStorage.removeItem("cv_confirmed_file");
    },
    delete_one_confirmed(confirmed) {
      if (!confirm("Are you sure you want to delete?")) return;
      const confirmed_index = this.confirmed_file.confirmed.indexOf(confirmed);
      this.confirmed_file.confirmed.splice(confirmed_index, 1);
      window.localStorage.setItem(
        "cv_confirmed_file",
        JSON.stringify(this.confirmed_file),
      );
    },
  },
});
