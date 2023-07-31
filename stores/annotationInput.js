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
            anno_name: "Annotator 1",
            hints: {
              'all_hints': [
                "Câu hỏi phải bao gồm từ \"Bao nhiêu\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Thứ\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Và\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Hoặc\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Không\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Nào\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Thuộc\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Ở đâu\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Khi nào\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Cái gì\" hoặc các từ đồng nghĩa",
                "Câu hỏi phải bao gồm từ \"Ai\" hoặc các từ đồng nghĩa"
              ],
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
        let anno_name = localStorage.getItem('anno_name')
        if (anno_name) this.anno_name = anno_name

        let confirmed_qa = localStorage.getItem('confirmed_qa')
        if (confirmed_qa) this.confirmedData = JSON.parse(confirmed_qa)
  
        let anno_file_data = localStorage.getItem('anno_file_data')
        if (anno_file_data) this.anno_file_data = JSON.parse(anno_file_data)

        let current_table_index = localStorage.getItem('current_table_index')
        if (current_table_index) this.current_table_index = Number(current_table_index)

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
                'percent_on_display_next': 0.4,
              })
            }
            current_hints_set[table_index] = this.update_display_hints(current_hints_set[table_index], true)
          }
          this.hints['current_hints_set'] = current_hints_set
          window.localStorage.setItem('current_hints_set', JSON.stringify(this.hints['current_hints_set']))
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
        let checked_hints = this.getCheckedHintsContent(this.hints['current_hints_set'][this.current_table_index].slice(0, this.hints['n_displayed_hints']))
        if (checked_hints.length < 1) {
          useGeneralStore().show_toast('error', 'Please choose AT LEAST ONE Hint!')
          return
        }
        let dataPoint = {
          "question": this.question,
          "answer": this.answer,
          "table_id": this.current_table_index,
          "hints": checked_hints,
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
        if (this.confirmedData.length == 0) 
          useGeneralStore().overlay.is_show = false
      },
      update_anno_file_data(new_data) {
        if (this.anno_file_data != null)
          if (!confirm('There is already data uploaded, Are you sure to continue?'))
            return
        // Reset Confirmed Data
        this.confirmedData = []
        window.localStorage.removeItem('anno_file_data')

        this.anno_file_data = new_data
        if (new_data == null)
          window.localStorage.removeItem('anno_file_data')
        else 
          window.localStorage.setItem('anno_file_data', JSON.stringify(new_data))
      },
      setCurrentTableID(new_id) {
        this.current_table_index = new_id
      },
      update_display_hints(current_hints_set, is_first_run=false) {

        if (!is_first_run) {
          for (let i = 0; i < this.hints.n_displayed_hints; i++) {
            if (current_hints_set[i].is_checked) current_hints_set[i].percent_on_display_next /= 3
            else current_hints_set[i].percent_on_display_next /= 2
            current_hints_set[i].is_checked = false
          }
          for (let i = this.hints.n_displayed_hints; i < current_hints_set.length; i++)
            current_hints_set[i].percent_on_display_next = Math.min(current_hints_set[i].percent_on_display_next + 0.10, 1.0)
          current_hints_set.push(...current_hints_set.slice(0, 3))
          current_hints_set.splice(0, 3)
        }
        let chosen_hints = []
        let hint_index = 0
        while (chosen_hints.length < this.hints.n_displayed_hints) {
          let threshhold = current_hints_set[hint_index].percent_on_display_next
          
          let random_number = Math.random()
          if (random_number < threshhold) {
            chosen_hints.push(current_hints_set[hint_index])
            current_hints_set.splice(hint_index, 1)
          }
          hint_index = (hint_index + 1) % current_hints_set.length
        }
        return [...chosen_hints, ...current_hints_set]
      },
      getCheckedHintsContent(hints) {
        let checked_hints = []
        for (let i = 0; i < hints.length; i++) {
          if (hints[i].is_checked)
            checked_hints.push(this.hints.all_hints[hints[i]['hint_index']])
        }
        return checked_hints
      },
      save_anno_name(new_name) {
        // TODO: Check Name validity


        this.anno_name = new_name
        window.localStorage.setItem('anno_name', this.anno_name)
        useGeneralStore().overlay.is_show = false
        useGeneralStore().show_toast('success', 'Save Your Name Successfully')
      },
      getTableHTMLFromIndex(index) {
        return this.anno_file_data[index]['table_html']
      },
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