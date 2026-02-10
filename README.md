# Go Design System

A lightweight, Go-based web application that serves a custom design system built with vanilla Web Components.

## Features

- **Go Backend**: Simple HTTP server using `net/http` and `html/template`.
- **Web Components**: Custom reusable HTML elements with encapsulated styles (Shadow DOM).
- **Modern Design**: Clean, responsive UI with a fresh color palette and typography.
- **Badge**: Status indicators (success, warning, error, neutral).
- **Alert**: Contextual feedback messages.
- **Avatar**: User profile images with fallback initials.
- **Modal**: Accessible dialog windows.
- **Icon**: Wrapper for [Phosphor Icons](https://phosphoricons.com/).
- **Theme Toggle**: Sidebar component for switching between Light and Dark modes.
- **No Dependencies**: Built with standard web technologies.

## Component API

### `<go-button>`

A clickable button element.

| Attribute | Type   | Default   | Description |
|-----------|--------|-----------|-------------|
| `variant` | string | `primary` | Visual style: `primary`, `secondary`. |
| `disabled`| boolean| `false`   | Disables the button interactivity. |

```html
<go-button variant="primary">Click Me</go-button>
```

### `<go-card>`

A container for content.

| Slot | Description |
|------|-------------|
| (default) | Main content of the card. |

```html
<go-card>
  <h3>Title</h3>
  <p>Content</p>
</go-card>
```

### `<go-input>`

A styled text input.

| Attribute | Type   | Default | Description |
|-----------|--------|---------|-------------|
| `type`    | string | `text`  | Input type (e.g., `text`, `password`, `email`). |
| `placeholder` | string | - | Placeholder text. |

```html
<go-input placeholder="Enter name"></go-input>
```

### `<go-badge>`

A small status indicator.

| Attribute | Type   | Default   | Description |
|-----------|--------|-----------|-------------|
| `variant` | string | `primary` | Visual style: `primary`, `secondary`. |

```html
<go-badge variant="secondary">New</go-badge>
```

### `<go-alert>`

A banner for feedback messages.

| Attribute | Type   | Default | Description |
|-----------|--------|---------|-------------|
| `variant` | string | `info`  | Visual style: `info`, `success`, `warning`, `error`. |
| `dismissible` | boolean | `false` | Adds a close button to remove the alert. |

```html
<go-alert variant="success" dismissible>Saved!</go-alert>
```

### `<go-avatar>`

A user profile image.

| Attribute | Type   | Default | Description |
|-----------|--------|---------|-------------|
| `src`     | string | -       | URL of the image. |
| `alt`     | string | -       | Alt text. Used for initials fallback if image fails. |
| `size`    | string | `md`    | Size: `sm` (24px), `md` (40px), `lg` (64px). |

```html
<go-avatar src="user.png" alt="User Name"></go-avatar>
```

### `<go-modal>`

A modal dialog.

| Attribute | Type | Description |
|-----------|------|-------------|
| `open`    | boolean | Whether the modal is visible. |

| Slot | Description |
|------|-------------|
| `header` | Content for the modal header (e.g., title). |
| (default) | Main body content. |
| `footer` | Content for the modal footer (e.g., action buttons). |

**Methods:**
- `open()`: Opens the modal.
- `close()`: Closes the modal.

```html
<go-modal id="my-modal">
  <h2 slot="header">Title</h2>
  <p>Body content...</p>
</go-modal>
```

## Project Structure

```
├── main.go                 # Server entry point
├── go.mod                  # Go module definition
├── static/
│   ├── components/         # Web Component definitions
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   ├── badge/
│   │   ├── alert/
│   │   ├── avatar/
│   │   └── modal/
│   └── css/style.css       # Global styles
└── templates/
    ├── components.html     # Component showcase
    ├── index.html          # Landing page
    └── layout.html         # Base layout template
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/schmalaa/go-design-system.git
   cd go-design-system
   ```

2. **Run the server:**
   ```bash
   go run main.go
   ```

3. **Open browser:**
   Navigate to `http://localhost:8080` to see the landing page, or `http://localhost:8080/components` for the component library.
