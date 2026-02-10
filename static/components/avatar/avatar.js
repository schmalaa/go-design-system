class GoAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/avatar/avatar.css');
        this.shadowRoot.appendChild(link);

        const src = this.getAttribute('src');
        const alt = this.getAttribute('alt') || '';
        const size = this.getAttribute('size') || 'md';

        const container = document.createElement('div');
        container.className = `avatar ${size}`;

        if (src) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = alt;
            img.onerror = () => {
                // Fallback to initials if image fails content
                container.textContent = this.getInitials(alt);
            };
            container.appendChild(img);
        } else {
            container.textContent = this.getInitials(alt);
        }

        this.shadowRoot.appendChild(container);
    }

    getInitials(name) {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
}
customElements.define('go-avatar', GoAvatar);
