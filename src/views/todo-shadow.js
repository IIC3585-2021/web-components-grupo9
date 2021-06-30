const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
        .container {
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            width: 500px;
            padding: 10px;
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
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('title');
        this.shadowRoot.querySelector('h4').innerText = 'Para que te organices, ' + this.getAttribute('name');
        this.shadowRoot.querySelector('input').placeholder = this.getAttribute('placeholder')
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
        for (let index = 1; index < 101; index++) {
          let name = 'item' + this.inWords(index);
          const val = this.getAttribute(name);
          if (val){
            this.addToDo(val)
          }
        }
    }  

    addToDo(val) {
        var div = document.createElement( 'todo-item-shadow' );
        div.setAttribute('content',  val)
        this.shadowRoot.querySelector('input').value = '';
        this.shadowRoot.querySelector('.todo').appendChild(div);
    }

    addToDoBind() {
        const val = this.shadowRoot.querySelector( 'input' ).value;
        this.addToDo(val);
    }
    connectedCallback(){
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.addToDoBind.bind( this ));
        this.getInicialToDos()
    }
    disconnectedCallback(){

    }
    attributeChangedCallback(attributeName, oldValue, newValue) {

    }
}

window.customElements.define('todo-shadow', ToDoList)