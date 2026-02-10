class GoButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create link to external CSS
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/button/button.css');
        this.shadowRoot.appendChild(link);

        const variant = this.getAttribute('variant') || 'primary';
        const disabled = this.hasAttribute('disabled');

        // Note: We use += to append to the shadow root after linking CSS
        this.shadowRoot.innerHTML += `
      <button class="${variant}" ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
    }
}
customElements.define('go-button', GoButton);
