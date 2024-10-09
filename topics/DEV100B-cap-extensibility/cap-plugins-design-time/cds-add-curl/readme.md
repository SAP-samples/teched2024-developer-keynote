# cds-add-curl

This is a plugin for the Node.js flavor of SAP Cloud Application Programming Model (CAP) and was demoed as part of the [Developer keynote [deconstructed]](https://www.sap.com/events/teched/virtual/flow/sap/te24/catalog/page/catalog/session/1723584532995001g7Xm) at SAP TechEd 2024. It's purpose is to add a `curl` facet to the `cds add` command that comes with the [@sap/cds-dk](https://www.npmjs.com/package/@sap/cds-dk). In result, the command `cds add curl` will add sample curl scripts to the CAP project that allow to test the service endpoints of the application.

> 🚧 Disclaimer: This plugin is for demo purposes only and not intended for productive usage.

## Usage

To use this plugin, install it either globally on your machine or locally as part of your CAP project.

Global installation:
```bash
npm i cds-add-curl -g
```

Installation in project scope:
```bash
npm i cds-add-curl -D
```

After installation, you can run the following command:

```bash
cds add curl
```

Run the curl commands by executing the shell scripts in the `<cds.root>/test/curl/` directory.

```bash
sh test/curl/<service-name>.<entity-name>.sh
```

## Contributing

Please read the [CONTRIBUTING.md](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/CONTRIBUTING.md) to understand the contribution guidelines.

## Code of Conduct

Please read the [SAP Open Source Code of Conduct](https://github.com/SAP-samples/.github/blob/main/CODE_OF_CONDUCT.md).

## How to obtain support

Support for the content in this repository is available during the actual time of the online session for which this content has been designed. Otherwise, you may request support via the [Issues](https://github.com/SAP-samples/teched2024-developer-keynote/issues) tab.

## License

Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/LICENSES/Apache-2.0.txt) file.
