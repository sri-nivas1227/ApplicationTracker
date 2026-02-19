# Application Tracker

A web application for managing and tracking job applications.

## Features

- View all applications in a tile-based interface
- Create new job applications with custom forms
- View detailed information about each application in a modal
- Persistent storage of application data
- Responsive design with a navigation bar

## Tech Stack

- **Frontend:** React, Next.js, TypeScript
- **Styling:** CSS
- **UI Components:** Custom React components

## Project Structure

```
app/
├── actions.ts              # Server actions
├── globals.css             # Global styles
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── components/             # Reusable UI components
│   ├── ApplicationTile.tsx
│   ├── CreateApplicationTile.tsx
│   ├── DetailModal.tsx
│   └── InputTypes.tsx
├── global/
│   └── NavBar.jsx          # Navigation component
└── tempResources/
    └── ApplicationTrackerForm.json  # Form schema
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage

- Click the "+" tile to create a new application
- Click any application tile to view details
- Use the navigation bar to access different sections
