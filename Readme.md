# Cubode Front-End AI Agent

Cubode Front-End AI Agent is a web application interface connected to the Cubode AI Agent Django backend. It uses Webpack for module bundling and builds a seamless interaction with the backend services.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Demo

A live Cubode AI Agent application is available at [https://cubode.com/](https://cubode.com/).

## Features

- User authentication integration with Cubode AI Agent backend
- File upload functionality
- Dynamic content rendering based on API responses
- Responsive design for mobile and desktop
- Real-time notifications and updates

## Prerequisites

- Node.js: Ensure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).
- npm: Node package manager, which comes with Node.js.
- Docker: Ensure Docker is installed on your machine. You can download it from [here](https://www.docker.com/get-started).

## Installation

1. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/your_username/cubode-frontend.git

2. Navigate to the project directory:

   ```bash
   cd cubode-frontend
   
3. Install the dependencies:
   ```bash
   npm install

4. Build the project using Webpack:

   ```bash
   npm run build

5. Run the Docker container for the backend (assuming the backend is set up similarly):
   ```bash
   docker-compose up --build

## Usage
1. Start the development server:

   ```bash
   ./starttailwind.sh
   npm start

2. Open your web browser and navigate to http://localhost:9000 to access the Cubode Front-End AI Agent application.

## Development Conventions

- variables, attributes: Use camelCase for variable names

- Functions, Methods: functionNames() camelCase() for functions

- events: camelCase, on followed by the event type. onClick, onChange

- CONSTANTS: UPPERCASE, DEFAULT_TIMEOUT

- Classes & Components: PascalCase

- html-ids & css-classes: kebab-case

## API
The Cubode AI Agent  application interacts with the following endpoints provided by the external API:
- **User Login**
  - Endpoint: `....`
  - Description: Authenticates a user and returns a token.. 
- **User Registration**
  - Endpoint: `.....`
  - Description: Registers a new user and returns user details.
- **File Upload**
  - Endpoint: `.....`
  - Description: Allows users to upload files to the server.
For detailed API documentation, refer to [API Documentation](###).

## Contributing
Contributions to Cubode AI Agent are welcome! To contribute:
1. Fork this repository.
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add your commit message here"`.
4. Push to your branch: `git push origin feature/your-feature-name`.
5. Create a pull request detailing your changes.
## License
This project is licensed under the MIT License.
Feel free to reach out to us if you have any questions or feedback. Happy coding!
Project maintained by [Cubode LTD ](####).

