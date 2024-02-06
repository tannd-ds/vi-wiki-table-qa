import { defineStore } from "pinia";
import { useGeneralStore } from "~/stores/generalStore";

class FileData {
  constructor(key, file) {
    this.local_storage_key = key;
    this.file_data = {
      name: "demo",
      data: [],
    };

    this.load_from_local_storage();

    if (file) {
      this.file_data.name = file.name;
      this.file_data.data = file.data;
    }
  }

  load_from_local_storage() {
    let local_data = window.localStorage.getItem(this.local_storage_key);
    if (local_data) {
      local_data = JSON.parse(local_data);
      this.file_data = local_data;
      console.log(`Successfully read data from key ${this.local_storage_key}`);
    }
  }

  has_file_locally() {
    let local_data = window.localStorage.getItem(this.local_storage_key);
    return !!local_data;
  }

  get data() {
    return this.file_data.data;
  }

  get n_data() {
    if (this.file_data.data.length)
      return this.file_data.data.length;
    return 0;
  }

  get name() {
    return this.file_data.name;
  }

  set data(new_data) {
    this.file_data.data = new_data;
  }

  set name(new_name) {
    this.file_data.name = new_name;
  }

  update_file_data(new_file_data, update_local = true) {
    if (this.local_storage_key === 'cv_anno_file') {
      let check_data_point = new_file_data.data[0];
      if (!check_data_point.table_html) {
        useGeneralStore().show_toast('error', 'You uploaded a wrong file!');
        return;
      }
    } else if (this.local_storage_key === 'cv_cross_file') {
      let check_data_point = new_file_data.data[0];
      let has_question = check_data_point.question !== undefined;
      let has_answer = check_data_point.answer !== undefined;
      let has_table_id = check_data_point.table_id !== undefined;

      if (!has_answer || !has_answer || !has_table_id) {
        useGeneralStore().show_toast('error', 'You uploaded a wrong file!');
        return;
      }
    }

    this.file_data = new_file_data;

    if (update_local) {
      let local_data = JSON.stringify(this.file_data);
      window.localStorage.setItem(this.local_storage_key, local_data);
    }
  }

  reset(update_local = true) {
    if (!confirm("Are you sure?"))
      return;

    this.file_data.name = "demo";
    this.file_data.data = [];

    if (update_local)
      window.localStorage.removeItem(this.local_storage_key);
  }
}

export const useCrossValidationStore = defineStore("cross_validation", {
  state: () => {
    return {
      all_data: {
        'cv_anno_file': new FileData("cv_anno_file", null),
        'cv_cross_file': new FileData("cv_cross_file", null),
        'cv_answer_file': new FileData("cv_answer_file", null),
      },
      current_display_table_index: 0,
      current_display_question_index: 0,
    };
  },
  actions: {
    has_file_locally(key) {
      return this.all_data[key].has_file_locally()
    },

    all_file_data_valid() {
      for (let local_storage_key in this.all_data) {
        let data_length = this.all_data[local_storage_key].file_data.data.length;
        if (data_length === 0 && local_storage_key !== 'cv_answer_file')
          return false;
      }

      if (this.all_data['cv_answer_file'].file_data.data.length === 0) {
        console.log('Init new answer file...');
        this.init_answer_file();
      }

      return true;
    },

    get_table_html_from_index(index) {
      return this.all_data['cv_anno_file'].file_data.data[index]["table_html"];
    },

    init_answer_file() {
      this.all_data['cv_answer_file'] = {...this.all_data['cv_cross_file']};
      let new_name = this.all_data['cv_anno_file'].file_data.name;
      new_name = new_name.slice(0, new_name.length - 5) + '_cross.json';
      this.all_data['cv_answer_file'].file_data.name = new_name;
      for (let i in this.all_data['cv_answer_file'].file_data.data) {
        this.all_data['cv_answer_file'].file_data.data[i].answer = "";
      }

      window.localStorage.setItem(
        'cv_answer_file',
        JSON.stringify(this.all_data['cv_answer_file'].file_data)
      );

      reloadNuxtApp({force: true});
    },

    set_current_display_table(new_index) {
      this.current_display_table_index = new_index;
    },

    set_current_display_question(new_index) {
      this.current_display_question_index = new_index;
      this.current_display_table_index = this.all_data['cv_cross_file'].file_data.data[new_index].table_id;
    },

    prev_display_question() {
      let max_index = this.get_n_question - 1;
      let prev = this.current_display_question_index - 1;
      if (prev < 0)
        prev = max_index;
      this.set_current_display_question(prev);
    },

    next_display_question() {
      let max_index = this.get_n_question - 1;
      let next = this.current_display_question_index + 1;
      if (next > max_index)
        next = 0;
      this.set_current_display_question(next);
    },

    is_answer_empty(index) {
      return this.all_data['cv_answer_file'].file_data.data[index].answer === "";
    },

    update_answer_file() {
      let local_key = 'cv_answer_file'
      window.localStorage.setItem(local_key, JSON.stringify(this.all_data[local_key].file_data));
      useGeneralStore().show_toast("success", "Save Your Data Successfully.");

      // To next step on default
      // this.next_display_question();
    },

    download_answer_file() {
      if (this.get_n_question_remain > 0) {
        useGeneralStore().show_toast(
            "error",
            `There are ${this.get_n_question_remain} Question remain!`,
        );
        return;
      }
      let target_file = this.all_data['cv_answer_file'].file_data;
      const jsonString = JSON.stringify(target_file.data);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = `${target_file.name}`;
      link.click();

      URL.revokeObjectURL(url);
      useGeneralStore().show_toast(
          "success",
          `Successfully Download ${target_file.name}`,
      );
    },

    reset_file(key) {
      this.all_data[key].reset()

      if (key !== 'cv_answer_file')
        this.init_answer_file();
    },

  },
  getters: {
    get_current_display_question() {
      let index = this.current_display_question_index;
      return this.all_data['cv_cross_file'].file_data.data[index].question;
    },

    get_n_question() {
      return this.all_data['cv_answer_file'].file_data.data.length;
    },

    get_n_question_remain() {
      let n = 0;
      let content = this.all_data['cv_answer_file'].file_data.data;
      for (let index in content) {
        n += (content[index].answer === "");
      }
      return n;
    },
  },
});
