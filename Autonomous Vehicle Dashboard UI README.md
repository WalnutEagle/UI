# Autonomous Vehicle Dashboard UI

## 🚀 Overview

Welcome to the Autonomous Vehicle Dashboard UI! This project is a web-based application designed to visualize various data points and camera feeds from an autonomous vehicle system. It provides a clean, modern interface built with React, Tailwind CSS, and TypeScript, offering real-time (or simulated) insights into the vehicle's operation.

To ensure robust operation, this project now uses a simple build step with `esbuild` to convert TypeScript/TSX files into a standard JavaScript bundle. We also use `npm` scripts for easier command management.

The dashboard can operate in two modes (selectable by editing `index.tsx` before building):
1.  **Local Image Cycling Mode (`App.tsx`):** Displays a cycling gallery of local images for the primary camera feed and simulates other vehicle data. Great for UI demonstration and development.
2.  **WebSocket Live Data Mode (`App2.tsx`):** Connects to an external WebSocket server (e.g., a Python script running on your vehicle's system or a simulator) to receive and display live data, including camera feeds, sensor readings, and system status.

## ✨ Features

*   **Modular Design:** Built with reusable React components.
*   **Responsive UI:** Adapts to different screen sizes using Tailwind CSS.
*   **Dynamic Data Display:** System status, sensor output, energy consumption, vehicle controls.
*   **Camera Feeds:** Primary camera view, optional depth feed.
*   **Multiple Operating Modes:** Local simulation or live WebSocket data.
*   **Clear Visuals:** Heroicons and a dark theme.
*   **Simplified Build/Run:** Uses `npm` scripts defined in `package.json`.

## 🛠️ Tech Stack

*   **React 19:** A JavaScript library for building user interfaces.
*   **TypeScript:** Adds static typing to JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **Heroicons:** SVG icons.
*   **WebSockets (for `App2.tsx`):** For real-time communication.
*   **`esbuild`:** For fast TypeScript/TSX to JavaScript bundling.
*   **ESM via `esm.sh`:** Loads React, React-DOM, and Heroicons in the browser (external to the main bundle).
*   **`npm` & `package.json`:** For managing dependencies and scripts.

## 📁 Project Structure

.
├── components/                 # Reusable React UI components
├── images/                     # (Create this) For local image files used by App.tsx
├── dist/                       # (Created by build step) Contains bundled JavaScript
│   └── bundle.js
├── node_modules/               # (Created by `npm install`) Local dependencies
├── App.tsx                     # Main application component (local image cycling & simulated data)
├── App2.tsx                    # Alternative main app component (WebSocket live data)
├── index.html                  # The main HTML file, entry point of the app
├── index.tsx                   # React entry point, imports App or App2
├── metadata.json               # Application metadata
├── package.json                # Defines project dependencies and scripts
├── package-lock.json           # (Created by `npm install`) Records exact dependency versions
├── types.ts                    # TypeScript type definitions
└── README.md                   # This file

## ⚙️ Getting Started

### Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Edge).
*   **Node.js and npm:** Required for installing dependencies, the build step (`esbuild`), and the local server (`npx serve`). Download from [nodejs.org](https://nodejs.org/).

### Initial Setup (First time only)

1.  **Open your terminal or command prompt.**
2.  **Navigate to the root directory of your project** (where `index.html` and `package.json` are located).
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    This command reads `package.json` and downloads `esbuild` (and any other development dependencies) into the `node_modules` folder.

### Running the Application

There are now two main steps: **Build** and then **Run**, managed by `npm` scripts.

**Step 1: Build the Application**
(You only need to do this once after `npm install`, or whenever you make changes to `.tsx` or `.ts` files, including changing which app is loaded in `index.tsx`.)

1.  Open your terminal or command prompt.
2.  Navigate to the root directory of your project.
3.  Run the build command:
    ```bash
    npm run build
    ```
    This executes the `esbuild` command defined in `package.json` and creates/updates `dist/bundle.js`.

**Step 2: Run the Local Web Server**

1.  In the same terminal (still in your project's root directory), run:
    ```bash
    npm start
    ```
    This executes the `npx serve` command defined in `package.json`.
2.  The terminal will display a local address, usually `http://localhost:3000` (the port might vary).
3.  Open this address in your web browser.

(You can also try `npm run dev` which uses `live-server` for automatic browser reloading when `index.html` or files in `dist/` change. Note that you still need to manually run `npm run build` if you change `.tsx` files.)

### Choosing Which App Version to Run (`App.tsx` or `App2.tsx`)

You decide which version to run *before* the build step:

1.  Open `index.tsx` in your code editor.
2.  To run `App.tsx` (local image cycling):
    Ensure the import line is: `import App from './App';`
    And the render line is: `<App />`
3.  To run `App2.tsx` (WebSocket live data):
    Change the import line to: `import App from './App2';` (The provided `index.tsx` uses `import App from './App2';` so `<App />` is correct in that context for loading App2.)
    And ensure the render line is using the imported component.
4.  Save `index.tsx`.
5.  **Then, run `npm run build`** to regenerate `dist/bundle.js` with the chosen app.

## モード Mode 1: Running `App.tsx` (Local Image Cycling & Simulation)

1.  **Set `index.tsx` to load `App` from `./App.tsx`.**
2.  **Run `npm run build`**.
3.  **Create the `images` folder:** In the root project directory, create `images/`.
4.  **Add your images:** Place images (e.g., `1.jpg` as per `App.tsx`) into the `images/` folder. Modify `galleryImages` in `App.tsx` if your filenames are different.
5.  **Run `npm start`**.

## 📡 Mode 2: Running `App2.tsx` (WebSocket Live Data)

1.  **Set `index.tsx` to load `App` from `./App2.tsx` (as it is by default in your provided `index.tsx`).**
2.  **Run `npm run build`**.
3.  **Prepare and Start your WebSocket Server:**
    *   Ensure your Python (or other) WebSocket server is running.
    *   It should send JSON data as described in previous instructions.
    *   Default URL in `App2.tsx` is `ws://localhost:8765`.
4.  **Run `npm start`** for the dashboard UI.
5.  Open the dashboard in your browser. Check the "WS Status" in the header.

## 🤔 Troubleshooting

*   **Blank Screen / App Not Loading:**
    *   Did you run `npm install` (first time)?
    *   Did you run `npm run build` after any code changes or `index.tsx` app selection?
    *   Check the browser's Developer Console (Right-click -> Inspect -> Console) for errors.
*   **Images not showing in `App.tsx`:**
    *   Is the `images` folder in the root directory (next to `index.html` and `dist`)?
    *   Do filenames in `App.tsx` match actual image files?
*   **`App2.tsx` not connecting / "WS Status" shows error:**
    *   Is your Python WebSocket server running?
    *   Is it on the correct URL/port?
    *   Check server and browser consoles for errors.

---

Happy driving (or simulating)! This setup with `npm` scripts should make development easier.
