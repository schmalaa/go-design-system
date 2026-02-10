class GoAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/alert/alert.css');
        this.shadowRoot.appendChild(link);

        const variant = this.getAttribute('variant') || 'info';
        const dismissible = this.hasAttribute('dismissible');

        const container = document.createElement('div');
        container.className = `alert ${variant}`;
        container.innerHTML = `
            <div style="flex-grow: 1;"><slot></slot></div>
            ${dismissible ? '<button class="close-btn">&times;</button>' : ''}
        `;

        this.shadowRoot.appendChild(container);

        if (dismissible) {
            const closeBtn = container.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                this.remove();
            });
        }
    }
}
customElements.define('go-alert', GoAlert);
