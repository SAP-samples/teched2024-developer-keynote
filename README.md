# SAP TechEd 2024 Developer keynote [deconstructed]: Keeping the promise

## Description

Hear from the developer advocates for a quick injection of news, recaps, and deep-dive demos covering various announcements from the event as well as other fun stuff.

## Topics

### SAP Cloud SDK for AI (JavaScript) & SAP Gen AI Hub

The SAP Cloud SDK for AI (JavaScript SDK) allows developers to seamlessly integrate into SAP generative AI Hub. Using a multi-model approach to create vector embeddings based on contextual data of different media types like text and images allows a developer to provide a wide array of information to a chat model. Using CAP and the JavaScript SDK, AI capabilities can be exposed via CAP application services. This demo can highlight the aspects of generative AI and how a developer can provide vector embeddings to a chat model but also shows how the AI capabilities can be consumed and exposed using CAP.

[https://github.com/SAP/ai-sdk-js](https://github.com/SAP/ai-sdk-js)

### Build a Chatbot with Build Apps & AI Core

Integrate SAP AI Core with SAP Build Apps to build a custom Chatbot. Walk through the steps of creating a deployment from SAP AI Launchpad. Show BTP destination created from the cockpit and describe the significance of additional properties. From Build Apps, show the data entity created, the app variable, page variable and data variable. From the UI Canvas, show the controls involved in creating the chatbot user interface, how various controls are bound to the variables and explain the logic attached to the button along with how formula works. Finally, show a demo of a working chatbot from the web preview.

### CAP Extensibility

One of the many great aspects of the SAP Cloud Application Programming Model is its extensibility, both for work at design time, and for use at runtime too. There are two live demos on CAP extensibility, reflecting these two phases.

#### Pluggable "cds add" feature of SAP CAP (cds8)

The new version of SAP CAP (cds8) made the API to create plugins for the "cds add" command public. This creates the opportunity to build reuseable plugins for frequently used commands and operations. One idea could be to implement a curl equivalent of the "cds add http" command, meaning the creation of sample curl scripts to test the service endpoints. This could be a really short demo of 1-2min, but could also be stretched to 5-10min if needed.

[https://cap.cloud.sap/docs/releases/jun24#pluggable-cds-add](https://cap.cloud.sap/docs/releases/jun24#pluggable-cds-add)

#### Understanding how the CDS plugin concept works

This demo, called "CDS plugins deconstructed", is about CAP extensibility for use at runtime, using the [CDS plugin](https://cap.cloud.sap/docs/node.js/cds-plugins) concept.

While CAP provides a wonderful set of layers allowing the developer to focus on the "what", not the "how", it often does help to know what's going on underneath.

There are two key skills that every developer can and should cultivate: [RTFM](https://en.wikipedia.org/wiki/RTFM)-[fu](https://en.wiktionary.org/wiki/-fu), and curiosity. In this session we'll focus on curiosity, and feel our way into how the CDS plugin concept works, eventually creating a simple plugin called "loud" that will uppercase the string content of elements that we annotate.

There are actually three parts to this journey:

1. Deconstructing the plugin scaffolding and mechanism, so we have a good understanding of what we need to do
1. Learning how to use introspection in the REPL to explore the service and its contents, so we know how to dynamically explore service, entities, elements and annotations in our plugin logic
1. Writing the actual plugin, with the knowledge gained in the first two parts

Along the way, we'll learn about the DEBUG environment variable, the REPL, NPM workspaces, custom loggers, JavaScript features like the rest operator and destructuring, and introspecting CDS service definitions, down through the entities to the elements and their properties.

The live demo at SAP TechEd Virtual 2024 covers the first part of the journey. Code used for the live demo can be found in the corresponding directory in this repo, [DEV100B-cds-plugins-deconstructed](https://github.com/SAP-samples/teched2024-developer-keynote/tree/main/topics/DEV100B-cap-extensibility/cds-plugins-deconstructed).

Let us know if you want us to take you through the second and third parts!

There's also a blog post accompanying part 1: [CAP plugins deconstructed - part 1 - understanding how the mechanism works](https://qmacro.org/blog/posts/2024/10/05/cap-plugins-deconstructed-part-1-understanding-how-the-mechanism-works/).

### ABAP CDS to List Report

Explore how modern ABAP can be used to create a Fiori Element List report.

This demo will highlight modern ABAP Development in ABAP Cloud using ABAP CDS, enriched with Annotations and Associations to create a full stack UI application. This will touch base how ABAP artifacts will be created in ADT and deployed using BAS thus highlighting the end-to-end app development

### Joule Capabilities for ABAP Developers

Has to be seen to be believed.

### Custom SAP S/4HANA events to SAP Integration Suite, advanced event mesh

In this demo, we will explore how you can create Derived Business Events using the RESTful ABAP Programming (RAP) model to extend the out-of-the-box Customer Material events available in SAP S/4HANA Cloud so that we can include additional data in the events generated by the system. Also, we will see the event filtering mechanism available in SAP S/4HANA Cloud, which leverages the custom extension attributes we define in our custom event. Finally, we will combine the SAP S/4HANA Cloud enterprise event enablement functionality with SAP Integration Suite, advanced event mesh (AEM) to publish dynamic topics in AEM by utilizing the custom extension attributes defined in the RAP data definition.

### Full-stack app following the SAP BTP Developer's Guide

The easy-ui5 project generator (open source) is a great tool to kickstart UI5 projects. It now also includes a subgenerator for SAP CAP projects, so developers can create a full-stack app that is instantly deployable to SAP BTP within a few minutes. There is no more manual work required when it comes to proxys, the approuter, destinations or the mta.yaml (previously that was quite the hassle). The generated full-stack app follows the suggestions from the SAP BTP Developer's Guide, using SAP CAP, UI5/Fiori elements and SAP BTP.

## Contributing

Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) to understand the contribution guidelines.

## Code of Conduct

Please read the [SAP Open Source Code of Conduct](https://github.com/SAP-samples/.github/blob/main/CODE_OF_CONDUCT.md).

## How to obtain support

Support for the content in this repository is available during the actual time of the online session for which this content has been designed. Otherwise, you may request support via the [Issues](../../issues) tab.

## License

Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
