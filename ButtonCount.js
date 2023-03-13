// Define the custom button element
class ClickCounterButton extends HTMLElement {
    constructor() {
        super();
        this.count = 0;
        this.attachShadow({ mode: "open" });
        this.render();
        this.addEventListener("click", this.onClick.bind(this));
    }

    onClick() {
        this.count++;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 10px;
                    box-shadow: 5px 5px 5px #888888;
                }
            </style>
            <button>Times Clicked: (${this.count} clicks)</button>
        `;
    }
}

// Register the custom button element with the browser
customElements.define("button-count", ClickCounterButton);