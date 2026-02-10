class GoIcon extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'size', 'weight'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const name = this.getAttribute('name') || 'question';
        const weight = this.getAttribute('weight') || 'regular'; // regular, bold, fill, duotone, thin, light
        const size = this.getAttribute('size') || 'md'; // sm, md, lg, xl, xxl

        // Map size to pixel values
        let fontSize;
        switch (size) {
            case 'sm': fontSize = '16px'; break;
            case 'md': fontSize = '24px'; break;
            case 'lg': fontSize = '32px'; break;
            case 'xl': fontSize = '48px'; break;
            case 'xxl': fontSize = '64px'; break;
            default: fontSize = size; // Allow explicit values like "2rem"
        }

        // Determine class based on weight
        // Regular = "ph", Bold = "ph-bold", Fill = "ph-fill", etc.
        let weightClass = 'ph';
        if (weight !== 'regular') {
            weightClass = `ph-${weight}`;
        }

        // Apply styles to host
        this.style.fontSize = fontSize;
        this.style.display = 'inline-flex';
        this.style.verticalAlign = 'middle';
        this.style.justifyContent = 'center';
        this.style.alignItems = 'center';

        // Render icon
        this.innerHTML = `<i class="${weightClass} ph-${name}"></i>`;
    }
}

customElements.define('go-icon', GoIcon);
