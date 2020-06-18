<h1 align="center">
  <img src="./static/Nautilus-text-logo2.png" width=400px>
</h1>

<p align="center">
  A Docker Compose Charting Tool <br><br>
  An interactive D3 visualizing tool that dynamically renders essential Docker Compose properties onto an Electron GUI, built to reduce cognitive load and simplify the development environment for engineers.<br/>
  
</p>

<p align="center">
  <!-- License -->
  <img src="https://img.shields.io/github/license/open-source-labs/nautilus?color=brown&label=license">

  <!-- Release -->
  <img src="https://img.shields.io/badge/release-2.0.0-orange">

  <!-- Release Date -->
  <img src="https://img.shields.io/badge/release%20date-6%2F18%2F20-yellow">

  <!-- Test -->
  <img src="https://img.shields.io/travis/com/open-source-labs/nautilus/master?color=green&label=test">

  <!-- Typescript (Dominant Languge Used) -->
  <img src="https://img.shields.io/github/languages/top/open-source-labs/nautilus?color=brightgreen">

  <!-- Repo Size -->
  <img src="https://img.shields.io/github/repo-size/open-source-labs/nautilus?color=blue">

  <!-- Contributions -->
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat&color=navy">

  <!-- Test Coverage -->
  <!-- <a href="https://codecov.io/github/choojs/choo">
    <img src="https://img.shields.io/codecov/c/github/choojs/choo/master.svg?style=flat-square&color=indigo"
      alt="Test Coverage" />
  </a> -->

  <!-- Stability
  <img src="https://img.shields.io/badge/stability-beta-blueviolet"> -->

  <!-- Code Style -->
  <img src="https://img.shields.io/badge/code%20style-airbnb-violet">
</p>

<p align="center">
  <sub> No nautili were harmed during the making of this application
  <br>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Visualizing Your Docker Compose File](#visualizing-your-docker-compose-file)
- [Contributing](#contributing)
  - [Cloning The Repo](#cloning-the-Repo)
  - [Development](#development)
  - [Packaging](#packaging)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## Features

### Open your Docker Compose file

<p align="center">
  <img src="static/screenshots/open-file.png" width=70%>
</p>

### Display your service's info, ports and volumes

<p align="center">
  <img src="static/screenshots/info-ports-volumes.png" width=70%>
</p>

### View your services by a container dependent view

<p align="center">
  <img src="static/screenshots/container-dependent-view.png" width=70%>
</p>

### View your services grouped by networks

<p align="center">
  <img src="static/screenshots/network-view.png" width=70%>
</p>

### View multiple Docker Compose files

<p align="center">
  <img src="static/screenshots/view-multiple-files.gif" width=70%>
</p>

### Deploy your Docker Compose file

<p align="center">
  <img src="static/screenshots/deploy-container.gif" width=70%>
</p>

### Initialize a single-node Swarm and deploy multiple stacks to it

<p align="center">
  <img src="static/screenshots/deploy-to-swarm.gif" width=70%>
</p>

<!-- GETTING STARTED -->

## Getting Started

Nautilus comes in a prepackaged application that is ready to run on your preferred operating system.

### **Prerequisites**

Nautilus requires the <code>docker</code> and <code>docker-compose</code> command-line interface tools installed. For Mac and Windows users, this comes included with Docker Desktop. For Linux Users, this comes included with Docker Engine.<br/><br/>
For your convenience, we've included links to Docker's documentation to set this up on your preferred operating system below.

<b>Docker Setup Instructions</b>

- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Linux](https://docs.docker.com/docker-for-mac/install/)

### **Installation**

Once you're sure you have the Docker CLI tools installed, download the Nautilus application from one of the links below.

<b>Nautilus Download Links</b>

- [Mac]Coming Soon
- [Windows]Coming Soon
- [Linux]Coming Soon

We are currently in the process of getting appropriate certifications/signatures so you may need to bypass some security warnings to run our application, but rest assured Nautilus does not make any network calls (and the project is 100% open source).

### **Visualizing Your Docker Compose File**

Run the application, open your Docker Compose file, and visualize your Docker Compose setup with the various views and options.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### **Cloning the Repo**

1. Fork the Project and clone the repo to your local machine
2. Install Dependencies

   Using Yarn (highly recommended):

   ```
   yarn
   ```

   Using npm:

   ```
   npm install
   ```

3. Make changes
4. Write tests for changes
5. Open a Pull Request

### **Development**

When developing, you'll probably want to run the dev version of our application. Nautilus development is fully integrated with webpack HMR, typescript and sass loaders and Electron. To start the development environment. Note: Have Eslint and Prettier installed, with your code editor set to format on save. In VSCode, you can add a rule to the settings.json "editor.

```
yarn dev
```

This will open a new instance of the Nautilus desktop application and will reload automatically as you make changes. Code away!!

### **Packaging**

Nautilus utilizes electron-builder to package the application. If you want to see the changes you've made to Nautilus in a production version of the application, use these scripts:

_Package for MacOS:_

```
yarn package-mac
```

_Package for Windows:_

```
yarn package-win
```

_Package for Linux:_

```
yarn package-linux
```

OR

_Package for all three operating systems:_

```
yarn package-all
```

<!-- TESTING USED -->

## Testing

The Nautilus repo is integrated with Travis CI, so tests will run automatically on all pull requests. But, we highly recommend that you test as you develop--Nautilus is a test driven development team. We have two ways to run tests:

#### #1 Run Tests for Whole Application

```
yarn test
```

Best use for `yarn test` is right before making a PR to make sure that none of your changes have broken the application.

#### #2 Run One Test File

```
yarn test-f <test-filename>
```

This command is ideal when working on a particular component to streamline development. No need to run tests for the whole application when only touching one file.

## Contributors to this Project

V2.0: David, Yevgeniy, Kim, Linda
V1.0: Aris, Danny, Josh, Michael, Tyler,

<!-- TECHNOLOGIES USED -->

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Electron](https://www.electronjs.org/)
- [D3](https://d3js.org/)
- [React with Hooks](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://github.com/enzymejs/enzyme)
- [Travis CI](https://travis-ci.org/)
- [SCSS](https://sass-lang.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

  <!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

The Nautilus Devs - [LinkedIn](https://www.linkedin.com/company/nautilusapp)
