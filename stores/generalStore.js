import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general_store", {
  state: () => {
    return {
      use_darkmode: true,
      use_sounds: true,
      isLargeScreen: true,
      current_step: window.localStorage.getItem("current_step")
        ? Number(window.localStorage.getItem("current_step"))
        : 0,
      n_steps: 2,
      overlay: {
        is_show: false,
        type: "edit",
        list: [],
      },
      toast: {
        id: "",
        is_show: false,
        type: "success",
        content: "Toast Content",
      },
      toast_list: [],
    };
  },
  actions: {
    show_toast(type = "sucess", content) {
      let newToast = {
        type: type,
        content: content,
      };

      if (this.toast_list.length <= 0) newToast["id"] = "0";
      else {
        // Prevent Annotator from spamming the toast
        let previous_toast = this.toast_list[this.toast_list.length - 1];
        if (previous_toast["content"] == newToast["content"]) return;

        newToast["id"] = String(Number(previous_toast["id"]) + 1);
      }
      this.toast_list.push(newToast);
    },
    show_overlay(overlay_name) {
      // Check if overlay_name is already on display
      if (this.overlay.list[this.toast_list.length - 1] == overlay_name) return;

      // check if overlay_name is already in OverlayList
      const previous_type_instant_index =
        this.overlay.list.indexOf(overlay_name);

      if (previous_type_instant_index != -1)
        this.overlay.list.splice(previous_type_instant_index, 1);

      // display this overlay_name
      this.overlay.list.push(overlay_name);
    },
    close_overlay() {
      this.overlay.list.pop();
    },
    update_step(to_step) {
      this.current_step = to_step;
      window.localStorage.setItem("current_step", this.current_step);
    },
    check_step(to_page) {
      // Check if page is a "step" page
      if (!/^step_[0-9]+/.test(to_page)) return to_page;

      const to_step = Number(to_page.substring(5, to_page.length));
      if (to_step > this.current_step) {
        return "/step_" + String(this.current_step);
      }
      return to_page;
    },
  },
  getters: {
    getPreviousStep() {
      if (this.current_step == 0) return this.current_step;
      return this.current_step - 1;
    },
    overlayIsShow() {
      return this.overlay.list.length > 0;
    },
  },
});
