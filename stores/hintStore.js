import { defineStore } from "pinia";
import { useGeneralStore } from "~/stores/generalStore";

export const useHintStore = defineStore("hint", {
    state: () => {
        return {
            all_hints: [
                'Câu hỏi phải bao gồm từ "Bao nhiêu" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Thứ" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Và" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Hoặc" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Không" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Nào" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Thuộc" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Ở đâu" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Khi nào" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Cái gì" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Ai" hoặc các từ đồng nghĩa',
                'Câu hỏi phải bao gồm từ "Tại sao" hoặc các từ đồng nghĩa',
            ],
            hint_set: {
                table_index_01: [
                    {
                        hint_index: 0,
                        is_checked: false,
                        percent_on_display_next: 1.0,
                        checked_count: 0,
                    },
                ],
            },
            n_displayed_hints: 3,
        }
    },
    actions: {
        init_hint_set(n_tables, hint_set_key = "hint_set") {
            let local_hints_set = localStorage.getItem(hint_set_key);
            if (local_hints_set)
                this.hint_set = JSON.parse(local_hints_set);
            else {
                this.hint_set = {};
                for (let table_index = 0; table_index < n_tables; table_index++) {
                    this.hint_set[table_index] = [];
                    for (let hint_index = 0; hint_index < this.all_hints.length; hint_index++) {
                        let hint_content = this.all_hints[hint_index];
                        this.hint_set[table_index].push({
                            content: hint_content,
                            is_checked: false,
                            percent_on_display_next: 0.4,
                            checked_count: 0,
                        });
                    }
                    this.hint_set[table_index] = this.update_display_hints(table_index, true, false);
                }
                window.localStorage.setItem(hint_set_key, JSON.stringify(this.hint_set));
            }
        },

        update_display_hints(current_table_index, is_first_run = false, inplace = true) {
            let current_hints_set = this.hint_set[current_table_index];

            // Update checked_count before updating the hints table
            for (let i = 0; i < current_hints_set.length; i++) {
                if (current_hints_set[i].is_checked)
                    current_hints_set[i].checked_count++;
                current_hints_set[i].is_checked = false;
            }

            /*
              ALPHA: The importance degree of checked_count
              h    : The sum of all hint's checked_count
            */
            const ALPHA = 0.8;
            const EPSILON = 0.0001;
            const h = Object.values(current_hints_set).reduce(
                (sum, current_hint) => sum + current_hint.checked_count,
                0,
            );
            for (let i = 0; i < current_hints_set.length; i++) {
                current_hints_set[i].percent_on_display_next =
                    ALPHA *
                    (-1 /
                        (1 +
                            Math.exp(-20 * (current_hints_set[i].checked_count / (h + EPSILON)) + 4,
                            )) +
                        1) +
                    (1 - ALPHA) * Math.random();
            }
            current_hints_set.sort((a, b) => b.percent_on_display_next - a.percent_on_display_next);

            if (inplace === true) {
                // Update the current hint_set for the current table
                this.hint_set[current_table_index] = current_hints_set;
                // And update the local storage
                window.localStorage.setItem("hint_set", JSON.stringify(this.hint_set));
            }

            return [...current_hints_set];
        },

        get_checked_hints(current_table_index) {
            let hints = this.hint_set[current_table_index];
            let checked_hints = [];
            for (let i = 0; i < hints.length; i++) {
                if (hints[i].is_checked)
                    checked_hints.push(hints[i].content);
            }
            return checked_hints;
        },
    }
});
