# Nuxt Multi App Project

This project consists of three Nuxt applications: `base`, `red-app`, and `blue-app`. Each application serves a different purpose and demonstrates how to extend a base application.

## Project Structure

```
nuxt-multi-app
├── base
│   ├── pages
│   │   └── index.vue          # Main page of the base app
│   ├── nuxt.config.ts         # Configuration for the base app
│   └── package.json            # NPM configuration for the base app
├── red-app
│   ├── pages
│   │   └── index.vue          # Main page of the red app (overrides base)
│   ├── nuxt.config.ts         # Configuration for the red app
│   └── package.json            # NPM configuration for the red app
├── blue-app
│   ├── pages
│   │   └── index.vue          # Main page of the blue app (overrides base)
│   ├── nuxt.config.ts         # Configuration for the blue app
│   └── package.json            # NPM configuration for the blue app
└── README.md                   # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Install Dependencies**: Navigate to each app's directory (`base`, `red-app`, `blue-app`) and run:
   ```
   npm install
   ```

2. **Run the Applications**: You can run each application separately. Navigate to the desired app's directory and execute:
   ```
   npm run dev
   ```

3. **Access the Applications**: Open your browser and go to the following URLs:
   - Base App: `http://localhost:3000`
   - Red App: `http://localhost:3001`
   - Blue App: `http://localhost:3002`

## Description of Each App

- **Base App**: This is the foundational application with a simple index page that has no styles applied.

- **Red App**: This application extends the base app and overrides the index page to display a red layout.

- **Blue App**: Similar to the red app, this application extends the base app and overrides the index page to display a blue layout.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.