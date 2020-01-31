const Task = Backbone.Model.extend({
    defaults: {
        task_title: '',
        due_date: ''
    }
})

const Tasks = Backbone.Collection.extend({})

const tasks = new Tasks()

const TaskView = Backbone.View.extend({
    model: new Task(),
    tagName: 'li',
    initialize: function(){
        this.template = _.template($('.task-list-template').html())
    },
    events: {
        'click .complete-task': 'complete'
    },
    complete: function(event){
        $('.completed-todo-ul').append($(event.target).parent())
        $(event.target).remove()
        console.log(tasks)
        tasks.remove(this.model)
        console.log(tasks)

    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()))
        return this
    }

})

const TasksView = Backbone.View.extend({
    model: tasks,
    el: $('.todo-ul'),
    initialize: function(){
        this.model.on('add', this.render, this)
    },
    render: function(){
        const self = this
        this.$el.html('')
        _.each(this.model.toArray(), function(task){
            self.$el.append((new TaskView({model: task})).render().$el)
        })
        return this
    }
})

const tasksView = new TasksView

$(document).ready(function(){
    $('.add-todos-form').on('submit', function(event) {
        event.preventDefault()
        let task = new Task({
            task_title: $('#task-title').val(),
            due_date: $('#task-due-date').val()
        })
        $('#task-title').val('')
        $('#task-due-date').val('')
        tasks.add(task)
    })
})