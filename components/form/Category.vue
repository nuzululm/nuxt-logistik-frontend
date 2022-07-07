<template>
    <div>
        <div class="form-group">
            <label for="">Category</label>
            <input type="text" class="form-control" v-model="category.name">
        </div>
        <div class="form-group">
            <label for="">Description</label>
            <input type="text" class="form-control" v-model="category.description">
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    created() {
        if (this.selected) {
            this.category = {
                id: this.selected.id,
                name: this.selected.name,
                description: this.selected.description,
            }
        }
    },

    props: {
        selected: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            category: {
                name: '',
                description: ''
            },
        }
    },
    methods: {
        ...mapActions('category', ['storeCategoryData', 'updateCategoryData']),
        submit() {
            this.storeCategoryData(this.category).then(() => {
                this.clearForm()
            })
        },
        clearForm() {
            this.category = {
                name: '',
                description: ''
            }
        },
        update() {
            return new Promise((resolve, reject) => {
                // let data = Object.assign(this.category, {id: this.selected.id})
                this.updateCategoryData(this.category).then(() => resolve())
            })
        },
    }
}
</script>