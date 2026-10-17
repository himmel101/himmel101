class ClickMarker extends HTMLElement {
  constructor() {
    super();
    // 1. Attach a shadow DOM for style encapsulation
    this.attachShadow({ mode: 'open' });
    
    // 2. Define default styles and setup the dot container
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .marker-dot {
          position: absolute;
          transform: translate(-50%, -50%); /* Centers the dot exactly on the click */
          pointer-events: none; /* Prevents the dot from blocking subsequent clicks */
          display: none; /* Hidden until the first click */
          
          /* Read fallback/default styling variables */
          width: var(--marker-size, 12px);
          height: var(--marker-size, 12px);
          background-color: var(--marker-color, red);
          border-radius: var(--marker-radius, 50%);
          border: var(--marker-border, 2px solid white);
          box-shadow: var(--marker-shadow, 0 2px 5px rgba(0,0,0,0.3));
          transition: left 0.1s ease, top 0.1s ease; /* Smooth movement if desired */
        }
      </style>
      <slot></slot>
      <div class="marker-dot"></div>
    `;

    this.dot = this.shadowRoot.querySelector('.marker-dot');
  }

  connectedCallback() {
    // 3. Listen for clicks on the component
    this.addEventListener('click', this._handlePosition.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handlePosition);
  }

  _handlePosition(event) {
    // 4. Calculate coordinates relative to the component container
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 5. Position and reveal the dot
    this.dot.style.left = `${x}px`;
    this.dot.style.top = `${y}px`;
    this.dot.style.display = 'block';
  }
}

// 6. Register the custom element
customElements.define('click-marker', ClickMarker);

