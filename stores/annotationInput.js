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
        if (!this.chosen_table) {
          useGeneralStore().show_toast('error', 'Please choose (or input) a Table')
          return
        }
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
          "table_id": this.chosen_table.id,
        }
        this.confirmedData.push(dataPoint)
        window.localStorage.setItem('confirmed_qa', JSON.stringify(this.confirmedData))
        useGeneralStore().show_toast('success', 'Save Your Data Successfully.')
        // Reset Input QA Values
        this.question = ""
        this.answer = "" 
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

      getTableFromHTML() {
        // Variable to store the final csv data
        var csv_data = [];
        // Get each row data
        var rows = document.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
          // Get each column data
          var cols = rows[i].querySelectorAll('td,th');
          // Stores each csv row data
          var csvrow = [];
          for (var j = 0; j < cols.length; j++) {
              // Get the text data of each cell of
              // a row and push it to csvrow
              csvrow.push(cols[j].innerHTML);
          }
          // Combine each column value with comma
          csv_data.push(csvrow.join(","));
        }
        // combine each row data with new line character
        csv_data = csv_data.join('\n');
        return csv_data
      },

      getTableFromCSV() {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        let strData = this.tableInput
        console.log(strData)
        let strDelimiter = ","

        // Create a regular expression to parse the CSV values.
        let objPattern = new RegExp(
          (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );

        // Create an array to hold our data. Give the array a default empty first row.
        let arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        let arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          let strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if ( strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
          }

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            let strMatchedValue = arrMatches[ 2 ].replace(
              new RegExp( "\"\"", "g" ),
              "\""
              );
          } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];
          }

          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue )
        }

        // Return the parsed data.
        console.log(arrData)
        return( arrData )
      }
    }
})