import { LitElement, html, css } from 'lit-element'; 


  const style = css`
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    width: 500px;
  }

  .todo-div {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 500px;
    padding: 10px;
  }

  hr {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    background-color:gray;
  }

  .todo-element {
    display: inline-block;
  }

  .butt {
    position: relative;
    top: 15px;
    right: 10px;
  }

  .butt-plus {
    position: relative;
    right: 10px;
  }

  .input-layout {
    display: flex;
    justify-content: space-between;
  }

  .input-layout input {
    width: 450px;
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
  `


class TodoView extends LitElement { 


  static get properties() { 
        return {
          todos: { type: Array },
          task: { type: String },
          firstitem: { type: String },
          seconditem: { type: String },
          thirditem: { type: String },
          placeholder: { type: String },
          title: { type: String},
          name: { type: String}
        };
      }

  static get styles() {
        return [style];
    }

  constructor() { 
        super();
        this.todos = this.getInicialToDos();
        this.task = '';
        this.placeholder = 'Add a new Task';
        this.title = 'My Tasks'
        this.name = '';
    }

    

  inWords (num) {
    let a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.replace(/\s+/g, '');
  }


    getInicialToDos() {
      let initialTodos = [];
      for (let index = 1; index < 101; index++) {
        let name = 'item' + this.inWords(index);
        if (this.getAttribute(name)){
          initialTodos.push({ 
            task: this.getAttribute(name),
            complete: false
        })
        }
      }
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
    }

  render() {
    return html`
      <div class="todo-div">
      <div class="title-div">
      <h2>${this.title}</h2>
      <h4>Para que te organices, ${this.name}</h4>
      </div>
      <hr>
      <div class="todos-list">
      ${this.todos.filter(todo => !todo.complete).map(
        todo => html` 
          <div class="todo-item">
            <p class="todo-element">${todo.task}</p>
            <div class="butt">
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
          </div>
        `
      )
    }
      </div>
      <hr>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <input placeholder="${this.placeholder}" value="${this.task}" @change="${this.updateTask}">
        <div class="butt-plus">
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
      </div>
      </div>
    `;
  }
}

customElements.define('todo-view', TodoView);