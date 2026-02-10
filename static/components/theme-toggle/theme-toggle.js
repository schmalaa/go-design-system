class GoThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    setup() {
        const btn = this.shadowRoot.querySelector('button');
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            this.updateIcon(target);
        });

        // Initialize icon state
        const saved = localStorage.getItem('theme') || 'dark';
        this.updateIcon(saved);

        // Sync global state immediately (though layout script handles FOUC)
        if (!document.documentElement.hasAttribute('data-theme')) {
            document.documentElement.setAttribute('data-theme', saved);
        }
    }

    updateIcon(theme) {
        const btn = this.shadowRoot.querySelector('button');
        if (theme === 'dark') {
            btn.innerHTML = '☀️'; // Sun icon for light mode switch
            btn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            btn.innerHTML = '🌙'; // Moon icon for dark mode switch
            btn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            button {
                background: none;
                border: 1px solid var(--text-secondary);
                border-radius: 50%;
                width: 32px;
                height: 32px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: var(--text-primary);
                transition: transform 0.2s, background-color 0.2s;
            }
            button:hover {
                transform: scale(1.1);
                background-color: rgba(128, 128, 128, 0.1);
            }
        </style>
        <button aria-label="Toggle theme"></button>
        `;
    }
}

customElements.define('go-theme-toggle', GoThemeToggle);
