# Playwright Basic Setup Template

This is a Basic Setup Templete for a Playwright Node version using Typescript Project.
Playwright is a test automation tool for developing tests. [Playwright.dev](https://www.playwright.dev) for official docs

This template does has the following:

- package.json setup with basic items, and necessary packages for this project
- tsconfig.json - preconfigured with base necessary items
- project structure - basic folder structure created. NOTE: this project is created from root of folder, versus creating a 'src' folder and moving all project files there, and non-project files outside of that. Its not necessary to have a src, but if you prefer it, feel free to change it.

## Step By Step Instructions

Things that are assumed are done before starting:

- created a folder on your computer where your project will run from
- VSCode installed, and the Playwright extension installed
- NODE 20+ installed on system already, recommend just have the latest version of NODE installed, if you are not a beginner in dealing with NODE, and know you need to run a specific version, recommend installing and using nvm to manage NODE versions.
- NPM installed globally on system. If you have a preferred package manager you prefer to use over npm , likely you'll have that all installed and configured already.
- a github account setup and authrized on your machine in order to be able to save and manage our code in github

Setup project for NODE:

1. Run command to initialize project with package manager:

``` npm init ```
or if using yarn:
``` yarn init ```

When do run this, the following is created:

- package.json - this is where packages to be installed will be installed into. This acts as a registry for the project and also supports running script commands for your project.

- package.lock ( or if using yarn, it will be yarn.lock)

- it will add a gitignore file that includes those files and folders that should not be checked into github that have been generated

- .editorconfig - this is created with some settings as setup in your vscode preferences - this file should be ignored. NOTE: whenever a folder is created with a . in front of the name of the file or directory, its a local only file and can be ignored.

- README.md - a base markdown file. At the top it will have a name based on the name of folder, but can change to what you want it to be. README docs are for information about project, how to use it, help me info etc. Add information that you want others to see what they access your project in Github.

2. Installing Playwright:

Run the following command:

``` npm init playwright@latest ```
or if using yarn:
``` yarn create playwright ```

When this is run, it will ask questions about Typescript of Javascript, where end to end tests should be placed, adding guthub actions, and manually installing browsers. For these, can leave on default, EXCEPT the one about github actions, enter in n for this one, unless you think you will be using that for your CI/CD pipeline.

Once this complete you'll have the following created in your project folder:

- node_modules - all packages installed for project are housed here, this folder is automatically added to gitigore, as it gets really large and not necessary to be your github project.

- tests - this is where any tests created for playwright should be created, and an example test file will there as well ( spec file ) - can be deleted, but leave for now as we can use to check everything is working as expected

- tests-examples - more playwright test examples of various kinds - can be deleted, review first as it shows various different types of test over the example spec.

- playwright.config.ts - the configuration for your playwright project that allows you to set various options per the docs. It will be configured with the bare minimums necessary to work

Also the package.json will be updated with the packages installed, and versions and script section as well.

INFO:

- if you did not already have the playwright extension installed for VSCODE, you can do that now. In VSCODE extensions, searching for Playwright, install the extension listed there that is authored by Microsoft. Once that is installed, if you open the Test Explorer icon on sidebar ( looks like a test beaker ) you'll see Playwright items as it loads. In the tests folder, when you select one of these files, you will see green play arrows for each test in file. If you do not see these things, something is wrong with your install, repeat steps and try again.

To check every thing is working, in the example.spec.ts, click the green run play button next to test name on left side. Test should launch browser and execute and pass if everything was done correctly so far.

3. Pushing our code to Github:

Now that we have confirmed our base setup is working, we will create and push repository to github:

