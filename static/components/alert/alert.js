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

        // Determine icon based on variant
        let iconName = 'info';
        if (variant === 'success') iconName = 'check-circle';
        if (variant === 'warning') iconName = 'warning';
        if (variant === 'error') iconName = 'warning-circle';

        const container = document.createElement('div');
        container.className = `alert ${variant}`;
        container.innerHTML = `
            <go-icon name="${iconName}" size="lg" weight="fill" style="margin-right: 12px;"></go-icon>
            <div style="flex-grow: 1;"><slot></slot></div>
            ${dismissible ? '<button class="close-btn"><go-icon name="x" size="md" weight="bold"></go-icon></button>' : ''}
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
