class GoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create link to external CSS
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/card/card.css');
        this.shadowRoot.appendChild(link);

        this.shadowRoot.innerHTML += `
      <div class="card">
        <slot></slot>
      </div>
    `;
    }
}
customElements.define('go-card', GoCard);
