# Vibemap-constants

## Summary
Design system and tokens. Other shared constants and configurations. 

## Get Started

To use these constants in your project, run this command:

```
npm install vibemap-constants
```

If you need new token email steve@vibemap.com

To run locally, check out the repository and run: 

run npm start

New releases in Github will automatically publish to the npm repository. 

## Design System

Building the designs system. 

Run the following command:

```
yarn run build-design-system
```

Design system components are setup for Storybook and compiled for external use according to this guide: 

https://prateeksurana.me/blog/react-component-library-using-storybook-6/#compiling-the-library-using-rollup

## Routes

To rebuild the routes JSON file install js-yaml globally: 

```
yarn global add js-yaml
```

Then run the npm/yarn command: 

```
yarn run build-routes
```