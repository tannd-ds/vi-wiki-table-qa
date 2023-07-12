import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general_store', {
    state: () => {
        return { 
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
        }
    },
    getters: {
    }
  
})