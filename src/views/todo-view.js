import { LitElement, html } from 'lit-element'; 


const VisibilityFilters = { 
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
  };


class TodoView extends LitElement { 


  static get properties() { 
        return {
          todos: { type: Array },
          filter: { type: String },
          task: { type: String },
          firstitem: { type: String },
          seconditem: { type: String },
          thirditem: { type: String }
        };
      }

  constructor() { 
        super();
        this.todos = this.getInicialToDos();
        this.filter = VisibilityFilters.SHOW_ALL;
        this.task = '';
    }

    getInicialToDos() {
      let initialTodos = [];
      let names = ["first", "second", "third"]
      names.forEach(name => {
        if (this.getAttribute(name + "item")){
          initialTodos.push({ 
            task: this.getAttribute(name + "item"),
            complete: false
        })
        }
      })
      return initialTodos
    }

  addTodo() {
    if (this.task) {
        this.todos = [...this.todos, { 
            task: this.task,
            complete: false
        }];
        this.task = ''; 
        }
    }

  shortcutListener(e) {
        if (e.key === 'Enter') { 
          this.addTodo();
        }
    }

   updateTask(e) {
        this.task = e.target.value;
    }

   updateTodoStatus(updatedTodo, complete) {
        this.todos = this.todos.map(todo =>
          updatedTodo === todo ? { ...updatedTodo, complete } : todo
        );
        console.log(this.todos);
    }

  render() {
    return html`
      <style>
        .todo-item {
          text-align: left;
        }

        .todo-element {
          display: inline-block;
        }
      </style>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <input placeholder="Task" value="${this.task}" @change="${this.updateTask}">
        <button @click="${this.addTodo}">
            Add Todo
        </button>
      </div>
      <div class="todos-list">
      ${this.todos.filter(todo => !todo.complete).map(
        todo => html` 
          <div class="todo-item">
          <p class="todo-element">${todo.task}</p>
            <input class="todo-element" type="checkbox"
              ?checked="${todo.complete}" 
              @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
          </div>
        `
      )
    }
      </div>
    `;
  }
}

customElements.define('todo-view', TodoView);