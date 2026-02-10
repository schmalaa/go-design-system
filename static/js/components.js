class GoButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const variant = this.getAttribute('variant') || 'primary';
        const disabled = this.hasAttribute('disabled');

        this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 1rem;
          transition: background-color 0.3s;
        }
        button.primary {
          background-color: var(--primary-color, #6200EE);
          color: var(--on-primary, #FFFFFF);
        }
        button.secondary {
          background-color: var(--secondary-color, #03DAC6);
          color: var(--on-secondary, #000000);
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      </style>
      <button class="${variant}" ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
    }
}
customElements.define('go-button', GoButton);

class GoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <style>
        .card {
          background-color: var(--surface-color, #FFFFFF);
          color: var(--on-surface, #000000);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 16px;
          margin: 10px 0;
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    `;
    }
}
customElements.define('go-card', GoCard);

class GoInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const placeholder = this.getAttribute('placeholder') || '';
        const type = this.getAttribute('type') || 'text';

        this.shadowRoot.innerHTML = `
      <style>
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
        }
        input:focus {
          outline: none;
          border-color: var(--primary-color, #6200EE);
        }
      </style>
      <input type="${type}" placeholder="${placeholder}" />
    `;
    }
}
customElements.define('go-input', GoInput);

class GoBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const variant = this.getAttribute('variant') || 'primary';

        this.shadowRoot.innerHTML = `
      <style>
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        .badge.primary {
          background-color: var(--primary-color, #6200EE);
          color: var(--on-primary, #FFFFFF);
        }
        .badge.secondary {
          background-color: var(--secondary-color, #03DAC6);
          color: var(--on-secondary, #000000);
        }
      </style>
      <span class="badge ${variant}">
        <slot></slot>
      </span>
    `;
    }
}
customElements.define('go-badge', GoBadge);
