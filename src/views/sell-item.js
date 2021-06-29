import { LitElement, html, css } from 'lit-element';

const style = css`
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 220px;
    position: relative;
  }

  .card a{
    position: absolute;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
  }
  
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  .container {
    padding: 2px 16px;
  }

  img {
      width: 20%;
  }

  h4, p, h2 {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  p {
      font-size: 80%;
  }

  h2 {
      font-size: 100%;
  }

  h4 {
      font-size: 80%;
  }

  .precio-anterior {
      text-decoration:line-through;
  }

  svg {
      width: 10%;
      fill: yellow;
      padding-top: 10%;
  }

  .precio-actual-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rating, .precio-anterior-group {
    text-align: left;
  }
  
  .rating-item, .st0, .precio-anterior, .normal, .precio-actual-item {
    display: inline-block;
    margin: 3px;
  }

  .precio-actual-item {
      border: 0%;
  }

  #descuento {
      border-radius: 15%;
      background-color: purple;
      max-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1%;
  }

  #cant-descuento {
      color: peachpuff;
  }
  `

class SellItem extends LitElement {
    static get properties() {
        return {
            name: { type: String },
            discount: { type: String },
            discountAmount: {type: String},
            rating: { type: String },
            price: { type: String },
            src: { type: String },
            href: { type: String },

        }
    }

    static get styles() {
        return [style];
    }

    constructor() {
        super();
        this.name = '';
        this.discount = '';
        this.discountAmount = '';
        this.rating = '';
        this.price = '';
        this.src = '';
        this.href = '';
    }




    render() {
        return html`


        <div class="card">
        <a href="#"></a>
            <img src="${this.src}" alt="Avatar" style="width:100%">
            <div class="container">
              <p id="nombre-producto">${this.name}</p>



        ${this.discount === 'true' ? html`
            <div class="precio-actual-group">
              <h2 class="precio-actual-item" id="precio-actual">${parseInt(this.price) * (1-(parseInt(this.discountAmount)/100))}</h2>
              <span style="display:inline-block; width: 23%;"></span>
              <div id="descuento" class="precio-actual-item">
                    <h4 id="cant-descuento">${this.discountAmount} %</h4>
              </div>
            </div>
            <br>
            <div class="precio-anterior-group">
            <p class="normal">Normal: </p> <p id="precio-anterior" class="precio-anterior"> ${this.price}</p>
            </div>
          
          `: html`

            <div>
            <div class="precio-actual-group">
            <h2 class="precio-actual-item" id="precio-actual">${this.price}</h2>
              <span style="display:inline-block; width: 23%;"></span>
            </div>
          
      </div>
      `}

              
           
              <div class="rating">
                <svg class="rating-item" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 11.5 11.5" style="enable-background:new 0 0 11.5 11.5;" xml:space="preserve">
           <style type="text/css">
               .st0{fill:#ff8800;}
           </style>
           <g id="XMLID_1_">
               <g id="XMLID_2_" transform="translate(0,-280.06665)">
                   <path id="XMLID_3_" class="st0" d="M5.8,280.5c-0.2,0-0.4,0.2-0.5,0.4l-1.2,3.1l-3.3,0.2c-0.3,0-0.6,0.3-0.5,0.6
                       c0,0.2,0.1,0.3,0.2,0.4l2.6,2.1l-0.9,3.2c-0.1,0.3,0.1,0.6,0.4,0.7c0.2,0,0.3,0,0.5-0.1l2.8-1.8l2.8,1.8c0.3,0.2,0.6,0.1,0.8-0.2
                       c0.1-0.1,0.1-0.3,0.1-0.5l-0.8-3.2l2.6-2.1c0.2-0.2,0.3-0.6,0.1-0.8c-0.1-0.1-0.3-0.2-0.4-0.2L7.5,284l-1.2-3.1
                       C6.3,280.6,6,280.5,5.8,280.5L5.8,280.5z"/>
               </g>
           </g>
           </svg>
                  <p id="rating-points" class="rating-item points">${this.rating}</p>
              </div>
            </div>
          </div>
        
        `;

    }
}

customElements.define('sell-item', SellItem);