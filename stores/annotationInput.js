import { defineStore } from 'pinia'
import { useGeneralStore } from "~/stores/generalStore"

export const useAnnotationInputStore = defineStore('annotation_input', {
    state: () => {
        return {
            question: "",
            answer: "",
            confirmedData: [],
            anno_file_data: null,
            current_table_index: 0,
            hints: {
              'all_hints': [],
              'current_hints_set': {
                "table_index_01": [
                  {
                    'hint_index': 0,
                    'is_checked': false,
                    'percent_on_display_next': 1.0,
                  }
                ]
              },
              'n_displayed_hints': 3,
            },
        }
    },
    actions: { 
      async loadConfirmedData() {
        let confirmed_qa = localStorage.getItem('confirmed_qa')
        if (confirmed_qa) this.confirmedData = JSON.parse(confirmed_qa)
  
        let anno_file_data = localStorage.getItem('anno_file_data')
        if (anno_file_data) this.anno_file_data = JSON.parse(anno_file_data)

        let current_table_index = localStorage.getItem('current_table_index')
        if (current_table_index) this.current_table_index = Number(current_table_index)

        let { data: hints } = await useFetch('/server/api/hints.txt')
        this.hints['all_hints'] = hints.value.split('\n')
        // Create New Hints Set for each table
        let current_hints_set = localStorage.getItem('current_hints_set')
        if (current_hints_set) this.hints['current_hints_set'] = JSON.parse(current_hints_set)
        else {
          current_hints_set = {}
          for (let table_index = 0; table_index < this.anno_file_data.length; table_index++) {
            current_hints_set[table_index] = []
            for (let hint_index = 0; hint_index < this.hints['all_hints'].length; hint_index++) {
              current_hints_set[table_index].push({
                'hint_index': hint_index,
                'is_checked': false,
                'percent_on_display_next': 1.0,
              })
            }
          }
          this.hints['current_hints_set'] = current_hints_set
        }
      },
      confirmData() {
        if (!this.question) {
          useGeneralStore().show_toast('error', 'Please Enter a Question!')
          return
        }
        if (!this.answer) {
          useGeneralStore().show_toast('error', 'Please Enter an Answer!')
          return
        }
        let dataPoint = {
          "question": this.question,
          "answer": this.answer,
          "table_id": this.current_table_index,
          "hints": this.hints['current_hints_set'][this.current_table_index].slice(0, this.hints['n_displayed_hints'])
        }
        this.confirmedData.push(dataPoint)
        window.localStorage.setItem('confirmed_qa', JSON.stringify(this.confirmedData))
        useGeneralStore().show_toast('success', 'Save Your Data Successfully.')
        // Reset Input QA Values
        this.question = ""
        this.answer = "" 
        // Update New Hints set
        this.hints['current_hints_set'][this.current_table_index] = this.update_display_hints(this.hints['current_hints_set'][this.current_table_index])
        window.localStorage.setItem('current_hints_set', JSON.stringify(this.hints['current_hints_set']))
      },
      download_confirmed() {
        if (this.confirmedData.length == 0) {
          useGeneralStore().show_toast('error', "There is no confirmed data to be downloaded")
          return
        }
        const jsonString = JSON.stringify(this.confirmedData);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        link.download = "data.json";
        link.click();

        URL.revokeObjectURL(url);
        useGeneralStore().show_toast('success', "Successfully Download data.json");
      },
      removeConfirmed(confirmed) {
        if (!confirm('Are you sure want to remove this?'))
          return
        this.confirmedData.splice(this.confirmedData.indexOf(confirmed), 1)
        window.localStorage.setItem('confirmed_qa', JSON.stringify(this.confirmedData))
      },
      update_anno_file_data(new_data) {
        if (this.anno_file_data != null)
          if (!confirm('There is already data uploaded, Are you sure to continue?'))
            return
        this.anno_file_data = new_data
        if (new_data == null)
          window.localStorage.removeItem('anno_file_data')
        else 
          window.localStorage.setItem('anno_file_data', JSON.stringify(new_data))
      },
      setCurrentTableID(new_id) {
        this.current_table_index = new_id
      },
      update_display_hints(current_hints_set) {
        for (let i = 0; i < 3; i++) {
          let hints = current_hints_set[0]
          hints['is_checked'] = false
          current_hints_set.splice(0, 1)
          current_hints_set.push(hints)
        }
        return current_hints_set
      }
    },
    getters: {
      getConfirmedData() {
        return this.confirmedData['qa']
      },

      getCurrentTableHTML() {
        return this.anno_file_data[this.current_table_index]['table_html']
      },
      getCurrentTableID() {
        return this.anno_file_data[this.current_table_index]['id']
      },
    }
})