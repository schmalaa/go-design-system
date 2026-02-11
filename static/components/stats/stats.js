class GoStats extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'System Stats';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                font-family: var(--font-family);
            }
            /* h3 styles inherit from card context usually, but we can keep specific overrides if needed */
            h3 {
                margin-top: 0;
                color: var(--primary-color);
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 24px;
            }
            .stat-row {
                margin-bottom: 16px;
            }
            .stat-label {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            .progress-bar {
                height: 8px;
                background-color: var(--bg-secondary, #e2e8f0);
                border-radius: 4px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background-color: var(--primary-color);
                width: 0%;
                transition: width 0.5s ease;
            }
            .progress-fill.high {
                background-color: var(--error-color);
            }
            .progress-fill.medium {
                background-color: var(--warning-color);
            }
        </style>
        <go-card>
            <h3>
                <go-icon name="chart-bar" size="lg"></go-icon>
                ${title}
            </h3>
            
            <div class="stat-row">
                <div class="stat-label">
                    <span>CPU Usage</span>
                    <span id="cpu-val">0%</span>
                </div>
                <div class="progress-bar">
                    <div id="cpu-bar" class="progress-fill"></div>
                </div>
            </div>

            <div class="stat-row">
                <div class="stat-label">
                    <span>Memory Usage</span>
                    <span id="ram-val">0%</span>
                </div>
                <div class="progress-bar">
                    <div id="ram-bar" class="progress-fill"></div>
                </div>
            </div>
        </go-card>
        `;

        this.connectSSE();
    }

    connectSSE() {
        const eventSource = new EventSource('/api/stats');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.updateStats(data);
        };

        eventSource.onerror = (err) => {
            console.error("EventSource failed:", err);
            eventSource.close();
            // Optional: Retry logic
        };
    }

    updateStats(data) {
        const cpuVal = this.shadowRoot.getElementById('cpu-val');
        const cpuBar = this.shadowRoot.getElementById('cpu-bar');
        const ramVal = this.shadowRoot.getElementById('ram-val');
        const ramBar = this.shadowRoot.getElementById('ram-bar');

        if (cpuVal && cpuBar) {
            cpuVal.textContent = `${data.cpu_usage}%`;
            cpuBar.style.width = `${data.cpu_usage}%`;
            this.updateColor(cpuBar, data.cpu_usage);
        }

        if (ramVal && ramBar) {
            ramVal.textContent = `${data.ram_usage}%`;
            ramBar.style.width = `${data.ram_usage}%`;
            this.updateColor(ramBar, data.ram_usage);
        }
    }

    updateColor(element, percentage) {
        element.classList.remove('medium', 'high');
        if (percentage > 80) {
            element.classList.add('high');
        } else if (percentage > 50) {
            element.classList.add('medium');
        }
    }
}

customElements.define('go-stats', GoStats);
