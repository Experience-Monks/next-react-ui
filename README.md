# Jam3 Next React UI

![GitHub](https://img.shields.io/github/license/jam3/nyg-nextjs)

> Reusable and customizable React component library based on the [NextJS Boilerplate](https://github.com/Jam3/nextjs-boilerplate)
> Spiritual successor to https://github.com/Jam3/react-ui

---

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Upgrading](#upgrading)
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
npm i git+https://github.com/Jam3/next-react-ui.git --foreground-scripts
```

When npm install runs in your project, it will analyze react-ui for any updates to the base component, if an update is detected, it will generate git merge markers with the new changes while preserving any ejected changes made in the project.

To pull in new changes run:

```
npm ci --foreground-scripts
```

---

## Usage

```
npm run dev
```

---

## Upgrading

This repository is using the NextJS Boilerplate as a template. To integrate latest changes from the boilerplate into the component library:

#### 1. Add the remote template

```
git remote add template https://github.com/Jam3/nextjs-boilerplate
```

#### 2. Fetch Updates

```
git fetch --all
```

#### 3. Merge

```
git merge template/main --no-commit --no-ff --allow-unrelated-histories
```

#### 4. Resolve Conflicts

Majority of conflicts will be resolved by using the incoming (template/main) changes. The following file conflicts should be resolved manually:

- `package.json`
- `README.md`

Force remaining conflicts to use incoming:

```
git checkout --theirs .
```

Commit and create PR into main:

```
git checkout -b boilerplate-upgrade-oct-26-2022
git commit -m "feature: Update boilerplate"
```

---

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
