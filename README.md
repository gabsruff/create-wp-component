# create-wp-component

A **CLI scaffolding tool** for quickly setting up a WordPress component project powered by [vite-plugin-wp-component](https://www.npmjs.com/package/vite-plugin-wp-component).  
This tool generates the project boilerplate with: - Pre-configured **Vite** and **PostCSS** settings.

- A ready-to-use **index.html** with the correct `rootID` injected.
- An empty `.env` for FTP credentials.
- Built-in npm scripts that map to `vite-plugin-wp-component` commands.

## Installation

You can create a new project using `npm` or `npx`:

```bash
npx create-wp-component
cd my-component
npm install
```

## Available Scripts

The CLI automatically registers the following scripts in `package.json`:

- `npm run config` → Runs `wp-component config` (edit `.env` or `component.config.json`).
- `npm run build` → Runs `vite build` **and** `wp-component build` (bundles your project and generates the plugin PHP file in one step).
- `npm run deploy` → Runs `wp-component deploy` (deploys via FTP to your WordPress site).

## Project Structure

A newly scaffolded project has the following structure:

```cpp
Project/
├──index.html				// Preconfigured with __COMPONENT_CONFIG__.rootID
└── src/
	├── assets/				// Directory for external/static files
	│   └── javascript.webp
	├── generator.js		// Core component logic
	├── info.json			// Data consumed by generator (can be local or fetched remotely)
	├── main.js				// Entry point, mounts the component into the rootID
	├── styles.module.css	// CSS Modules stylesheet
	└── template.js			// Example of importing assets & styles
```

## Key Files

- **`main.js`**  
  Accesses `__COMPONENT_CONFIG__.rootID` and renders your component inside the root element.
- **`styles.module.css`**  
  Uses **CSS Modules** to ensure class encapsulation and isolation.  
  Class names follow this structure:

  ```
  [componentName]__[local]___[hash:base64:5]
  ```

  They are automatically transformed from `class-css` to `classCss`, so you can import them in JavaScript as:

  ```js
  import styles from "./styles.module.css";
  element.className = styles.classCss;
  ```

- **`generator.js`**  
  Contains the core logic of the component, which is invoked from `main.js`.
- **`info.json`**  
  Provides configuration or data for `generator.js`.  
  This can be a static file or dynamically fetched from an external server.
- **`template.js`**  
  Demonstrates how to import assets from `/assets` and styles from `styles.module.css`.

---

## Typical Workflow

1.  Configure FTP credentials and metadata:

    ```bash
    npm run config
    ```

2.  Build the bundle **and** generate the WordPress plugin PHP:

    ```bash
    npm run build
    ```

3.  Deploy the plugin directly to WordPress:

    ```bash copy
    npm run deploy
    ```

## Notes

- The scaffold ensures that the **same rootID** is used across development and production (in sync with `vite-plugin-wp-component`).
- CSS Modules are essential for encapsulation — no class name collisions with WordPress themes or other plugins.
