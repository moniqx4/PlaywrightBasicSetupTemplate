# Playwright Basic Setup Template

This is a Basic Setup Templete for a Playwright Node version using Typescript Project. Also included the MCP configuration for Playwright and a robust agent requirements doc for testing in the docs folder.

Playwright is a test automation tool for developing tests. [Playwright.dev](https://www.playwright.dev) for official docs

This template has the following:

- package.json setup with basic items, and necessary packages for this project
- tsconfig.json - preconfigured with base necessary items
- project structure - basic folder structure created. NOTE: this project is created from root of folder, versus creating a 'src' folder and moving all project files there, and non-project files outside of that. Its not necessary to have a src, but if you prefer it, feel free to change it.
- ai, mcp.json for playwright
- eslint configuration
- basic fixture setup
- Dockerfile - basic setup for Dockerfile to run Playwright in a Docker container using the Microsoft Playwright image

Above the most basic install, included those items that are typically used in enterprise level application projects, but could also be used for a basic getting started project as well.

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
These are the bare git commands, but highly recommend Github Desktop, its much easier to work with, and less likely to check in something not expecting: 

create a new repository: 

``` git remote add <name> <url> ```

add files to your repository:

``` git add filename1 ```

push the files to your repository
``` git push -u origin <name> ```

4. Add tsconfig and configuring

I have added an already configured tsconfig.json file in this repository. Its configured with the basic settings. You'll also notice I have entered some paths, these are folders that you will need to create and by configuring them here, when importing we can use the configured alias, instead of using the actual path for each file. Allows for our imported files to be less verbose and easier to find. These settings are for configuring Typescript for our project.

5. Installing other packages
Below are a list of files to install, with the commandlines to do so. If you do not have Typescript installed globally, I recommend you do. However, you can also install it just for this project as I have done, to ensure its available for whomever installs this templates.

- typescript
- dotenv - this manages our environmental variables
- eslint - a popular linting project, to check for code format, and syntax and needed for playwright plug options to be available
- eslint-plugin-playwright - special rules that can be configured specifically for playwright, i have included the commons in the esling.config.js, but can change these as needed

``` npm i typescript dotenv eslint eslint-plugin-playwright -D ```
or if yarn:
``` yarn add typescript dotenv eslint eslint-plugin-playwright -D ```

after this is run, in the package.json should see the added packages there in the devDependencies section.

6. Added scripts to package.json
In the package.json, it has some added scripts for running tests, checking files format ( lint ), etc. This contains common ones, can add others as needed.

7. .envSetup - I have created a .envSetup, that in order for it to work,  you will need to rename this to be just .env. The .env is configured to be ignored and not checked to github, because typically you would have api keys, things you don't want to be public, this being a template, nothing of value in it. But have to call it something else, because github will bug me if I don't.

8. mcp.json - I have included the playwright mcp server information, if interested in setting up got usage with AI. It gives the LLM access to the playwright tools to run tests, create and edit them, basically all the playwright commands. If leveraging agentic agents, in the docs folder it has an agent markdown file that can be used, add or change the information with your own preferences.