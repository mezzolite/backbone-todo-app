const Task = Backbone.Model.extend({
    defaults: {
        task: '',
        due_date: ''
    }
})

const Tasks = Backbone.Collection.extend({})

const tasks = new Tasks()