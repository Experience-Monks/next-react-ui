# Jam3 Next React UI

![GitHub](https://img.shields.io/github/license/jam3/nyg-nextjs)
[![Codeship Status for Jam3/nyg-nextjs](https://app.codeship.com/projects/0fcd63a0-29d6-0138-cc17-02df0a7848fa/status?branch=master)](https://app.codeship.com/projects/384142)

> Reusable and customizable React component library based on the NextJS Generator
> Spiritual successor to https://github.com/Jam3/react-ui

---

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Release](#release)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

The components in this library can be ejected for advanced customization while maintaining version control. This functionality is achieved by npm post install hook that runs `src/scripts/copy-component-utility.js` To use it, simply create a `.react-uirc.json` file in the root of your project with the following properties.

```
{
  "eject": true,
  "eject-path": "./src/components",
  "components": [
    {
      "name": "BaseButton",
      "newName": "PillButton"
    },
    "AppAdmin"
  ]
}
```

`eject`: Enables the ejection of components, if ommited the script will not be called.

`eject-path`: Specifies a custom path for the components to be ejected to, if ommited defaults to src/components.

`components`: A list of components to eject into your project. Components can be defined as strings (simple mode) or as objects (advanced mode). In advanced mode you can specify a new ejected name to be used in your project.

After creating the configuration file, proceed to install this library in your project.

```
npm i git+https://github.com/Jam3/next-react-ui.git
```

Every time npm install runs in your project, it will analyze react-ui for any updates to the base component, if an update is detected, it will generate git merge markers with the new changes while preserving any ejected changes made in the project.

---

## Usage

#### 1. local Front End server

```properties
# http://localhost:3000
$ npm run dev
```

#### 2. storybook

```properties
# http://localhost:9001
$ npm run storybook
```

#### 3. template scripts

We are using [seng-generator](https://github.com/mediamonks/seng-generator) to generate templates

```properties
# cli
$ npm run generate

# create page(s)
$ npm run generate page [page-name]

# create api routes
$ npm run generate api [api-name]

# create component
$ npm run generate component [component-name]
```

Default location can be edited here:

- [page](scripts/templates/page/.senggenerator)
- [component](scripts/templates/component/.senggenerator)
- [api](scripts/templates/api/.senggenerator)

## Release

To releasing new versions we are using [standard-version](https://github.com/conventional-changelog/standard-version).

In addition, each component folder has a `.ReactUIMetaVersion` file. This file is responsible for independently controlling versions of each component. When making an update to a component, it is vital that this file is also updated.

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting
pull requests.

---

## License

[MIT](LICENSE)
