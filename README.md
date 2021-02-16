<!-- PROJECT SHIELDS -->
<!--
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<br />
<p align="center">
  <a href="documents/images/github-logo.png">
    <img src="documents/images/github-logo.png" alt="Logo" width="300" >
  </a>

  <h3 align="center">Notizen</h3>

  <p align="center">
    Store and sync your notes across all your devices
    <br />
    <a href="https://github.com/willahh/notizen"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://willahh.github.io/notizen/">View Demo</a>
    ·
    <a href="https://github.com/willahh/notizen/issues">Report Bug</a>
    ·
    <a href="https://github.com/willahh/notizen/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)
<!-- [![Product Name Screen Shot][product-screenshot-dark]](https://example.com) -->

Notizen is an app to create and store your notes across your devices.

Notizen means notes in Luxembourgish. That's a cool two parts name !

### Project structure
This project is a monorepo based on the [cra-monorepo-demo](https://github.com/jibin2706/cra-monorepo-demo) project file setup.

Monorepo allows the separation of several packages into one. Thanks to this technique several sub-packages can be independent and some can shares certain files, like common/components shared between the desktop app and the web app.

This can be achived with the use of 
 - `yarn workspace`
 - package.json workspaces setting
 - lerna

The project structure is as follows : 
```html
.
└── notizen/
    ├── node_modules/
    |── backend
    │   └── ...
    │   └── package.json
    |── frontend
    │   ├── common/ (shared component library)
    │   │   └── components
    │   │   └── package.json
    │   ├── desktop (Electron + create-react-app)
    │   │   └── ...
    │   │   └── package.json
    │   ├── mobile (create-react-native-app)
    │   │   └── ...
    │   │   └── package.json
    │   ├── web (create-react-app)
    │   │   └── ...
    │   │   └── package.json
    ├── package.json
    |── infra
    │   └── ...
    |── documents
    │   └── ...
    └── yarn.lock
```

### Built With

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [ReactNative](https://reactnative.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Postgresql](https://www.postgresql.org/)
* [Storybook](https://storybook.js.org/)


## Getting Started
To get a local copy up and running follow these simple example steps.


### Prerequisites

* Yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/willahh/notizen.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Start the backend
    ```sh
    cd backend
    yarn start
    ```
3. Start the frontend
    ```sh
    cd frontend/web
    yarn start
    ```

Optional :
1. Run storybook
    ```sh
    cd frontend/web
    yarn run storybook
    ```

## Usage


## Roadmap

See the [open issues](https://github.com/willahh/notizen/issues) for a list of proposed features (and known issues).


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## License

Distributed under the MIT License. See `LICENSE` for more information.



## Contact

William Ravel - [@twitter](https://twitter.com/willahhravel)

Project Link: [https://github.com/willahh/notizen](https://github.com/willahh/notizen)



## Acknowledgements
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Tailwind documentation](https://tailwindcss.com/docs/theme)
* [Heroicons](https://heroicons.com/)
* [Loaders.css](https://connoratherton.com/loaders)
* [Animate.css](https://daneden.github.io/animate.css)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)



[contributors-url]: https://github.com/willahh/notizen/graphs/contributors
[forks-url]: https://github.com/willahh/notizen/network/members
[stars-url]: https://github.com/willahh/notizen/stargazers
[issues-url]: https://github.com/willahh/notizen/issues
[milestones-url]: https://github.com/willahh/notizen/milestones
[license-url]: https://github.com/willahh/notizen/blob/master/LICENSE.txt
[product-screenshot]: documents/images/notizen-screen-light-01.png
[product-screenshot-dark]: documents/images/notizen-screen-dark-01.png