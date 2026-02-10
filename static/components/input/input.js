class GoInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create link to external CSS
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/input/input.css');
        this.shadowRoot.appendChild(link);

        const placeholder = this.getAttribute('placeholder') || '';
        const type = this.getAttribute('type') || 'text';

        this.shadowRoot.innerHTML += `
      <input type="${type}" placeholder="${placeholder}" />
    `;
    }
}
customElements.define('go-input', GoInput);
