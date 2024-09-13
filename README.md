# Backend Service Personal Portofolio

<hr/>

## Description

This project is built using **Express v4.19.2**. This include feature certification, project, career, and user management. For middleware implementing a refresh token system to maintain the security of user data. In addition, all data will be encrypted, be it request data, response, or data stored in the database.

## Features

- **Express v4.19.2**: A web application framework for building fast, scalable Node.js applications.
- **Prisma v5.19.1**: An ORM (Object-Relational Mapping) tool for database management and query building in TypeScript and Node.js.
- **Express-validator**: A middleware library for validating and sanitizing incoming requests in Express applications.
- **Bcrypt**: A library used for hashing passwords to ensure security in authentication.
- **Husky**: Facilitates the use of Git hooks.
- **Prettier**: Automatically formats code.

## Requirment

- Node Package Manager(npm) command already exist in your command line
- Node v0.10 or latest

## Installation

Follow these steps to set up the project:

Clone this repository:

```bash
  git clone <url-repository>
```

Navigate to the project directory:

```bash
  cd portofolio_be
```

Install the necessary dependencies:

```bash
  npm install
```

Run the project in development environment:

```bash
  npm run dev
```

Start the development server on `http://localhost:3001`

## Deployment

Run the application for production:

```bash
    npm run start
```

## Available Scripts

Here are some of the available scripts you can use:

- **`npm run dev`**: Runs the application in development mode using nodemon.

- **`npm run start`**: Run the application for production.
- **`npm run lint`**: Runs linting using ESLint.
- **`npm run format`**: Formats the code using Prettier.
- **`npm run postinstall`**: Generate prisma client.
- **`npm run prepare`**: Prepares Husky for Git hooks.

## Commit Message Standard

To maintain consistency and readability, we follow a standard commit message format in this repository. This helps other developers understand the changes made at a glance. Here we use husky for Git hook, which if you do not follow the defined commit format you will not be able to commit the code.

### Commit Message Format

Commit messages must follow this format:

`<prefix>(<module>): <commit message>`

### Explanation:

- **`<prefix>`**: The type of change, using one of the following:
  - **feat**: Adding a new feature.
  - **add**: Adding new files, components, or modules.
  - **change**: Modifying existing functionality or logic.
  - **delete**: Removing files, components, or modules.
  - **fix**: Fixing bugs or errors.
  - **refactor**: Refactor code.
- **`<module>`**: The name of the module or section being changed.
- **`<commit message>`**: A brief description of the change made.

### Examples:

- **`feat`**: Adding a new feature to the module.

  ```bash
  feat(authentication): implement two-factor authentication
  ```

- **`add`**: Adding new files or components.
  ```bash
  add(database): add user migration script
  ```
- **`change`**: Modifying existing logic in a module.
  ```bash
  change(profile): update profile picture upload logic
  ```
- **`delete`**: Removing unused components or services.

  ```bash
  delete(notification): remove unused notification service
  ```

- **`fix`**: Fixing a bug or issue.

  ```bash
  fix(payment): resolve currency conversion issue
  ```

- **`refactor`**: Refactor code to improve readability or performance without changing functionality.
  ```bash
  refactor(profile): optimize user profile data fetching logic
  ```

### Tips for Writing Commit Messages

- **Clear and Descriptive**: Ensure that the commit message clearly explains the changes made.
- **Relevant Module**: Use the relevant module name to make it easier to track changes within specific parts of the application.
- **Concise but Informative**: Keep the commit message short but informative, with a title length of up to 50 characters.
