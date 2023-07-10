import { defineStore } from 'pinia'
import { useGeneralStore } from "~/stores/generalStore"

export const useAnnotationInputStore = defineStore('annotation_input', {
    state: () => {
        return {
            question: "",
            answer: "",
            table_id: "",
            table: null,
            tableInput: "",
            confirmed: [],
            confirmedData: useCookie('confirmed_data')
        }
    },
    // persist: true,
    actions: { 
      loadConfirmedData() {
        if (!this.confirmedData) {
          this.confirmedData = { 
            'qa': [],
            'table': []
          }
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
          "table_id": this.table,
        }
        this.confirmedData['qa'].push(dataPoint)
        useGeneralStore().show_toast('success', 'Save Your Data Successfully.')
      }
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