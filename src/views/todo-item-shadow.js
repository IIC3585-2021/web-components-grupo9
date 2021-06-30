const { thistle } = require("color-name");

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
        .todo-item {
            display: flex;
            padding: 10px 0px 10px 0px;
        }
        .text-todo {
            margin-left: 10px;
        }
        .delete-button {
            margin-left: 10px;
        }
    </style>
    <div class="todo-item">
        <input type="checkbox">
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

    // checkUncheck() {
    //     this.checked = !this.checked;
    //     console.log(this.checked);
    // }

    connectedCallback(){
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.delete.bind( this ))
        // const checkbox = this.shadowRoot.querySelector('input');
        // checkbox.addEventListener('click', this.checkUncheck.bind( this ))
    }

    disconnectedCallback(){
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.delete.bind( this ))
    }
}

window.customElements.define('todo-item-shadow', ToDoItem)