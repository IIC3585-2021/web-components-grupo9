const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
        .container {
            display: flex;
            flex-direction: column;
            width: 500px;
        }
        .add-button {
            margin-left: 10px
        }
        .input {
            width: 450px
        }
        .todo {
            display: flex;
            flex-direction: column;
        }
        .input-div {
            display: flex;
            justify-content: space-between;
        }
    </style>
    <div>
        <h3>To Do List</h3>
        <h4></h4>
        <div class="container">
            <div class = "input-div">
                <input placeholder="Agrega un to do" class="input">
                <button class="add-button"> Agregar </button>
            </div>
            <div class="todo">
            </div>
        </div>
    </div>
`

class ToDoList extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h4').innerText = 'Para que te organices, ' + this.getAttribute('name');
    }
    addToDo() {
        var div = document.createElement( 'todo-item-shadow' );
        div.setAttribute('content',  this.shadowRoot.querySelector( 'input' ).value)
        this.shadowRoot.querySelector('input').value = '';
        this.shadowRoot.querySelector('.todo').appendChild(div);
    }
    connectedCallback(){
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.addToDo.bind( this ))
    }
    disconnectedCallback(){

    }
    attributeChangedCallback(attributeName, oldValue, newValue) {

    }
}

window.customElements.define('todo-shadow', ToDoList)