# Go Design System

A lightweight, Go-based web application that serves a custom design system built with vanilla Web Components.

## Features

- **Go Backend**: Simple HTTP server using `net/http` and `html/template`.
- **Web Components**: Custom reusable HTML elements:
  - `<go-button>`: Buttons with primary/secondary variants.
  - `<go-card>`: Container for content with shadow and rounded corners.
  - `<go-input>`: Styled input fields.
  - `<go-badge>`: Status badges.
  - `<go-alert>`: Info/Success/Warning/Error alerts.
  - `<go-avatar>`: User avatars with image or initials.
  - `<go-modal>`: Accessible modal dialogs.
- **Static Assets**: Serves CSS and JS from the `static/` directory.

## Project Structure

```
├── main.go                 # Server entry point
├── go.mod                  # Go module definition
├── static/
│   ├── components/         # Web Component definitions
│   │   ├── button/         # Button component (JS + CSS)
│   │   ├── card/           # Card component (JS + CSS)
│   │   ├── input/          # Input component (JS + CSS)
│   │   └── badge/          # Badge component (JS + CSS)
│   └── css/style.css       # Global styles
└── templates/
    ├── index.html          # Main page
    └── layout.html         # Base layout template
```

## Getting Started

### Prerequisites

- [Go](https://golang.org/dl/) (1.18 or later recommended)

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/schmalaa/go-design-system.git
   cd go-design-system
   ```

2. Run the server:
   ```bash
   go run main.go
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Usage

Use the custom components in your HTML:

```html
<go-button variant="primary">Click Me</go-button>

<go-card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</go-card>

<go-input placeholder="Enter text..."></go-input>

<go-badge variant="secondary">New</go-badge>

<go-alert variant="success" dismissible>Action successful!</go-alert>

<go-avatar src="user.jpg" alt="User Name"></go-avatar>

<go-modal id="my-modal">
  <h2 slot="header">Title</h2>
  <p>Content</p>
</go-modal>
```
