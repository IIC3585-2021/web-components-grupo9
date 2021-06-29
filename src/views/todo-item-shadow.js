const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
        .todo-item {
            padding: 20px;
        }
    </style>
    <div class="todo-item">
    </div>
`

class ToDoItem extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes () {
        return ["content"]
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue)
        if(attributeName === 'content'){
            this.shadowRoot.querySelector('.todo-item').textContent = newValue
        }
    }
}

window.customElements.define('todo-item-shadow', ToDoItem)