---
title:  Vuejs Todo App
date:   2015-12-16 13:00:00
description:  How to build an TODO app using Vuejs
---
<a href="http://vuejs.org" target="_new">Vuejs</a> is a <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel" target="_new">MVVM</a> JavaScript framework. With Vuejs easy to understand <a href="http://vuejs.org/guide/" target="_new">documentation</a> and <a href="http://getbootstrap.com/">bootstrap</a> for styling I created this simple TODO app, <a href="http://osterbergmarcus.github.io/todo/" target="_new">check it out!</a>
<br/>
<br/>
Lets go over the structure and API used for this app. See code <a href="https://github.com/osterbergmarcus/vuejs-todo-app">source</a> for reference.
<br/>
##JS
```javascript
// Create a new Vue instance where we define the DOM element that Vue should manage,
// in this case el: '#app' with the data objects newTodo and todos
new Vue({
  el: '#app',

  data: {
    newTodo: '',
    todos: [{
      task: 'Learn vuejs',
      completed: false
    }, {
      task: 'Build a todo app',
      completed: true
    }]
  }
});

// Create a child instance of vue where we define a new component called 'my-tasks'
// and pass through the properties 'list' and 'new-task' from our parent by using props
Vue.component('my-tasks', {
  props: ['list', 'new-task'],

// We are defining a template called '#my-tasks-template' that
// will be used for our component <my-tasks>
  template: '#my-tasks-template',

// Computed property for logic and method property for functions
  computed: {
    complete: function(todo){
      return this.list.filter(this.isCompleted);
    },

    remaining: function(todo) {
      return this.list.filter(this.inProgress);
    }
  },

  methods: {
    isCompleted: function(todo){
      return todo.completed;
    },

    inProgress: function(todo){
      return ! this.isCompleted(todo);
    },

    addTodo: function (todo) {
      var text = this.newTask.trim();
      this.list.push({
        task: text,
        completed: false
      });
      this.newTask = '';
    },

    removeTodo: function (todo) {
      this.list.$remove(todo);
    },

    editTodo: function (todo) {
      this.removeTodo(todo);
      this.newTask = todo.task;
    },
    completed: function(todo){
      todo.completed = ! todo.completed;
    },
    clearAllCompleted: function(){
    this.list = this.list.filter(this.inProgress);
    }
  }
});
```
<br/>
<br/>

##HTML
```
// We will have to set an attribute on our component to bind
// list to todos and newTask to newTodo
<my-tasks :list="todos" :new-task="newTodo">

// Use v-model for data binding,
// here we are binding an element to our data object newTask and an onkeyup event to invoke our method 'addTodo'
// NOTE: when we are refering newTask to new-task we are using
// camelCase for newTask and kebab-case for our html attribute new-task.
<input class="form-control" v-model="newTask" @keyup.enter="addTodo(todo)">

// Render our computed method remaining using v-show and output the length of remaining todos using double mustache tags
<span v-show="remaining">({{ "{{ remaining.length " }}}})</span>

// Using rendering condition v-for.
// Every item inside remaining in this case we refer to items as "todo", output the todo.task
//  Again inside double musttache tag
<li class="list-group-item list-group-item-info" v-for="todo in remaining">
  <span>{{ "{{ todo.task " }}}}</span>

// Set v-else on element for conditional rendering
 <p v-else>No tasks yet, get a life and add some tasks!</p>

// Use v-if directive to render number of completed todos if any todo are completed
 <div v-if="complete.length">
```
<br/>
<br/>
This was my first Vuejs experience and I'm already planing to use Vuejs for future projects and so should you. Very enjoyable framework!

Feel free to improve this app by requesting issues or pull requests on <a href="https://github.com/osterbergmarcus/vuejs-todo-app" target="_new">Github</a>
