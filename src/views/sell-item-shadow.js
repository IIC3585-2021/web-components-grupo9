import { LitElement, html } from 'lit-element'; 

const template = document.createElement('template');

template.innerHTML = `

    <style>
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
    </style>
    <div class="card">
        <a href="#"></a>
            <img src="https://perdine.com/wp-content/uploads/2017/10/navelpowell-1.jpg" alt="Avatar" style="width:100%">
            <div class="container">
              <p id="nombre-producto">Perfume Giorgio Armani Acqua Di Gio Absolu Hombre EDP 200 ml</p>
              <div class="precio-actual-group">
                  <h2 class="precio-actual-item" id="precio-actual">$52.990</h2>
                  <span style="display:inline-block; width: 23%;"></span>
                  <div id="descuento" class="precio-actual-item">
                        <h4 id="cant-descuento">-50%</h4>
                  </div>
              </div>
              
              <br>
              <div class="precio-anterior-group">
              <p class="normal">Normal: </p> <p id="precio-anterior" class="precio-anterior"> $70.000</p>
            </div>
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
                  <p id="rating-points" class="rating-item points">3.1</p>
              </div>
            </div>
          </div>
`;


class Card extends HTMLElement {
    constructor() {
      super();
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
  
      this.$container = this._shadowRoot.querySelector('.card');
      this.$productName = this._shadowRoot.querySelector('#nombre-producto');
      this.$discount = this._shadowRoot.querySelector('#descuento');
      this.$discountAmount = this._shadowRoot.querySelector('#cant-descuento');
      this.$rating = this._shadowRoot.querySelector('#rating-points');
      this.$price = this._shadowRoot.querySelector('#precio-actual');
      this.$oldPrice = this._shadowRoot.querySelector('#precio-anterior');
      this.$priceGroup = this._shadowRoot.querySelector('.precio-actual-group');
      this.$oldPriceGroup = this._shadowRoot.querySelector('.precio-anterior-group');
      this.$image = this._shadowRoot.querySelector('img');
      this.$link = this._shadowRoot.querySelector('a');
  
    }
  
    connectedCallback() {
      if (this.hasAttribute('no-discount')) {
        this.updateNoDiscount();
      }
      else {
          if (this.hasAttribute('auto')) {
              this.updateDiscount();
          }
      }
    }
  
    updateNoDiscount() {
      this.$discount.style.display = 'none';
      this.$priceGroup.style.textAlign = 'left';
      this.$oldPriceGroup.style.display = 'none';
    }

    updateDiscount() {
        let normalPrice = Number(this.oldprice);
        let actualPrice = Number(this.price);
        let calculatedDiscount = Math.trunc((1 - (actualPrice / normalPrice)) * 100);
        console.log(calculatedDiscount);
        this.$discountAmount.innerHTML = '-' + calculatedDiscount.toString() + '%';
    }
  
    get name() {
      return this.getAttribute('name');
    }
  
    set name(value) {
      this.setAttribute('name', value);
    }

    get discount() {
      return this.getAttribute('discount');
    }
    
    set discount(value) {
        this.setAttribute('discount', value);
    }

    get rating() {
      return this.getAttribute('rating');
    }
    
    set rating(value) {
      this.setAttribute('rating', value);
    }

    get price() {
      return this.getAttribute('price');
    }
      
    set price(value) {
      this.setAttribute('price', value);
    }

    get oldprice() {
      return this.getAttribute('oldprice');
    }
        
    set oldprice(value) {
      this.setAttribute('oldprice', value);
    }

    get src() {
      return this.getAttribute('src');
    }
          
    set src(value) {
      this.setAttribute('src', value);
    }

    get href() {
      return this.getAttribute('href');
    }
            
    set href(value) {
      this.setAttribute('href', value);
    }
  
    static get observedAttributes() {
      return ['name', 'discount', 'rating', 'price', 'oldprice', 'src', 'href'];
    }
  
    attributeChangedCallback() {
      this.render();
    }
  
    render() {
      this.$productName.innerHTML = this.name;
      this.$discountAmount.innerHTML = '-' + this.discount + '%';
      this.$rating.innerHTML = this.rating;
      this.$price.innerHTML = '$' + this.price;
      this.$oldPrice.innerHTML = '$' + this.oldprice;
      this.$image.src = this.src;
      this.$link.href = this.href;
    }
  }

window.customElements.define('sell-item', Card);