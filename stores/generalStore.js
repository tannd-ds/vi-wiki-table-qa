import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general_store', {
    state: () => {
        return { 
            use_darkmode: true,
            current_step: window.localStorage.getItem('current_step') ? window.localStorage.getItem('current_step') : 0,
            overlay: {
                is_show: false,
                type: "edit",
            },
            toast: {
                id: "",
                is_show: false,
                type: "success",
                content: "Toast Content",
            }, 
            toast_list: [ ]
        }
    },
    actions: {
        show_toast(type='sucess', content) {
            let newToast = {
                'type': type,
                'content': content,
            }

            if (this.toast_list.length <= 0)
                newToast['id'] = '0'
            else
                newToast['id'] = String(Number(this.toast_list[this.toast_list.length - 1].id) + 1)
            this.toast_list.push(newToast)
        },
        show_overlay(type="table_list") {
            this.overlay.type = type
            this.overlay.is_show = true
        },
        update_step(to_step) {
            this.current_step = Math.max(this.current_step, to_step)
            window.localStorage.setItem('current_step', this.current_step)
        },
        check_step(to_page) {
            // Check if page is a "step" page
            if (!/^step_[0-9]+/.test(to_page)) return to_page

            const to_step = Number(to_page.substring(5, to_page.length))
            if (to_step > this.current_step) {
                console.log('redirected')
                return '/step_' + String(this.current_step)
            }
            return to_page
        }
    },
    getters: {
        getPreviousStep() {
            if (this.current_step == 0)
                return this.current_step
            return this.current_step - 1
        }
    }
  
})