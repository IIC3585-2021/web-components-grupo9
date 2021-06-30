const { thistle } = require("color-name");

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
        .todo-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0px 10px 0px;
            width: 500px;
        }
        .delete-button {
            margin-left: 10px;
        }
    </style>
    <div class="todo-item">
        <div class="text-todo"></div>
        <button class="delete-button">X</button>
    </div>
`

class ToDoItem extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const checked = false;
    }

    static get observedAttributes () {
        return ["content"]
    }

    connectedCallback(){
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.delete.bind( this ))

    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue)
        if(attributeName === 'content'){
            this.shadowRoot.querySelector('.text-todo').textContent = newValue
        }
    }

    delete() {
        console.log('delete')
        const div = this.shadowRoot.querySelector('.todo-item');
        div.style.display = "none";
    }

    disconnectedCallback(){
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.delete.bind( this ))
    }
}

window.customElements.define('todo-item-shadow', ToDoItem)