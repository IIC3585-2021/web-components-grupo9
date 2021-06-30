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

        #search-button, .remove-button {
          width: 35px;
          height: 35px;
          text-align: center;
          border-color: transparent;
          fill: transparent;
          background-color: transparent;
        }
            
        #search-button, svg, .remove-button {
          width: 20px;
          height: 20px;
        }
        #search-button:hover, .remove-button:hover svg {
          filter: invert(27%) sepia(31%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
        }
      </style>
      <div class="todos-list">
      ${this.todos.filter(todo => !todo.complete).map(
        todo => html` 
          <div class="todo-item">
          <p class="todo-element">${todo.task}</p>
            <button class="remove-button" @click="${ () => this.updateTodoStatus(todo, true)}">
            <svg class="minus-icon" class="search-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 96.7 96.7" style="enable-background:new 0 0 96.7 96.7;" xml:space="preserve">
                  <style type="text/css">
                    .st0{fill:#010202;}
                  </style>
                  <g id="XMLID_1_">
                    <g id="XMLID_4_">
                      <path id="XMLID_5_" class="st0" d="M48.1,3.8c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S73,3.8,48.1,3.8z M48.2,88.3
                        c-21.8,0-39.4-17.6-39.5-39.4v-0.1c0-21.7,17.6-39.4,39.4-39.4S87.5,27,87.6,48.8C87.6,70.6,70,88.2,48.2,88.3z M45.3,46l22.5,0
                        c1.5,0,2.8,1.2,2.8,2.8s-1.3,2.8-2.8,2.8H45.3 M45.3,51.6H28.4c-1.6,0-2.8-1.3-2.8-2.8s1.3-2.8,2.8-2.8h16.9"/>
                    </g>
                  </g>
              </svg>
            </button>
          </div>
        `
      )
    }
      </div>
      <br><br>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <input placeholder="Task" value="${this.task}" @change="${this.updateTask}">
        <button @click="${this.addTodo}" class="todo-element" id="search-button">
              <svg id="search-icon" class="search-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 96.8 96.8" style="enable-background:new 0 0 96.8 96.8;" xml:space="preserve">
                    <style type="text/css">
                      .st0{fill:#010202;}
                    </style>
                    <g id="XMLID_1_">
                      <g id="XMLID_4_">
                        <path id="XMLID_5_" class="st0" d="M48.4,3.4c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S73.3,3.4,48.4,3.4z M48.5,87.9
                          C26.7,87.9,9.1,70.3,9,48.5v-0.1C9,26.7,26.6,9,48.4,9s39.4,17.6,39.5,39.4C87.9,70.2,70.3,87.8,48.5,87.9z M70.9,48.4
                          c0,1.6-1.3,2.8-2.8,2.8H51.2v16.9c0,1.6-1.3,2.8-2.8,2.8c-1.6,0-2.8-1.3-2.8-2.8V51.2H28.7c-1.6,0-2.8-1.3-2.8-2.8
                          s1.3-2.8,2.8-2.8h16.9V28.7c0-1.6,1.3-2.8,2.8-2.8c1.6,0,2.8,1.3,2.8,2.8v16.9h16.9C69.6,45.6,70.9,46.8,70.9,48.4z"/>
                      </g>
                    </g>
              </svg>
              </button>
      </div>
    `;
  }
}

customElements.define('todo-view', TodoView);