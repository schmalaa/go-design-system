class GoModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
    }

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            this.isOpen = newValue !== null;
            this.updateDisplay();
        }
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/static/components/modal/modal.css');
        this.shadowRoot.appendChild(link);

        this.shadowRoot.innerHTML += `
      <div class="modal">
        <div class="modal-header">
           <slot name="header"></slot>
           <button class="close-btn"><go-icon name="x" size="md" weight="bold"></go-icon></button>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>
        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>
      </div>
    `;

        this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.close());

        // Close on clicking backdrop
        this.addEventListener('click', (e) => {
            if (e.target === this) this.close();
        });

        this.updateDisplay();
    }

    updateDisplay() {
        if (this.isOpen) {
            this.style.display = 'flex';
        } else {
            this.style.display = 'none';
        }
    }

    open() {
        this.setAttribute('open', '');
    }

    close() {
        this.removeAttribute('open');
    }
}
customElements.define('go-modal', GoModal);
