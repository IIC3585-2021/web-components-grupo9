const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
        .container {
            display: flex;
            flex-direction: column;
        }
        .add-button {
            margin-left: 10px
        }
        .input-button {
            width: 200px
        }
        .todo {
            display: flex;
            flex-direction: column;
        }
        .in {
            display: flex;
        }
    </style>
    <div>
        <h3>To Do List</h3>
        <h4></h4>
        <div class="container">
            <div class = "in">
                <input placeholder="Agrega un to do" class="input-button">
                <button class="add-button"></button>
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
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.addToDo.bind( this ))
    }
    addToDo() {
        var div = document.createElement( 'div' );
        div.textContent = this.shadowRoot.querySelector( 'input' ).value;
        this.shadowRoot.querySelector('input').value = '';
        this.shadowRoot.querySelector('.todo').appendChild(div);
    }
    connectedCallback(){
        
    }
    disconnectedCallback(){

    }
    attributeChangedCallback(attributeName, oldValue, newValue) {

    }
}

window.customElements.define('todo-shadow', ToDoList)