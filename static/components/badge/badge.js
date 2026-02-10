class GoBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create link to external CSS
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/badge/badge.css');
        this.shadowRoot.appendChild(link);

        const variant = this.getAttribute('variant') || 'primary';

        this.shadowRoot.innerHTML += `
      <span class="badge ${variant}">
        <slot></slot>
      </span>
    `;
    }
}
customElements.define('go-badge', GoBadge);
