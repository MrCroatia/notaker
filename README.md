# Notaker

A simple, elegant note-taking application built with Vue.js. This application allows users to create, edit, and delete notes with a clean and intuitive interface. Notes are stored in the browser session only, so they will be reset when the page is refreshed or closed.

## Features

- Create and edit notes with a title and content
- Delete notes
- Switch between light and dark theme
- Responsive design that works on desktop and mobile
- Session-based storage (notes are reset on page refresh)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/notaker.git
cd notaker
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Build for production
```
npm run build
```

## Deployment

This application is designed to be deployed to Ionos Plus Hosting. After building the project, upload the contents of the `dist` directory to your hosting provider.

## Technology Stack

- Vue.js 3
- Vite
- Pinia for state management
- CSS3 with custom properties for theming

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Font: Poppins from Google Fonts
