import { defineStore } from 'pinia'
import { useGeneralStore } from "~/stores/generalStore"

export const useAnnotationInputStore = defineStore('annotation_input', {
    state: () => {
        return {
            question: "",
            answer: "",
            chosen_table: null,
            tables: [
              {
                'id': '001',
                'content': [[0, 1, 2], [3, 4, 5]],
              },
              {
                'id': '002',
                'content': [[0, 1, 2], [3, 4, 5]],
              },
              {
                'id': '003',
                'content': [[1, 2, 3], [4, 5, 6]],
              }
            ],
            confirmedData: [],
            anno_file_data: null,
            current_table_index: 0,
        }
    },
    actions: { 
      loadConfirmedData() {
        let confirmed_qa = localStorage.getItem('confirmed_qa')
        if (confirmed_qa) this.confirmedData = JSON.parse(confirmed_qa)
  
        let anno_file_data = localStorage.getItem('anno_file_data')
        if (anno_file_data) this.anno_file_data = JSON.parse(anno_file_data)

        let current_table_index = localStorage.getItem('current_table_index')
        if (current_table_index) this.current_table_index = Number(current_table_index)
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
          "table_id": this.getCurrentTableID,
        }
        this.confirmedData.push(dataPoint)
        window.localStorage.setItem('confirmed_qa', JSON.stringify(this.confirmedData))
        useGeneralStore().show_toast('success', 'Save Your Data Successfully.')
        // Reset Input QA Values
        this.question = ""
        this.answer = "" 
      },
      download_confirmed() {
        console.log(this.confirmedData)
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
    },
    getters: {
      hasTable() {
          return this.table != null
      },

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