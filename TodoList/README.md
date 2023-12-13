# The best TodoList

An application use Firebase for hosting and datebase, built with React, JavaScript, and SCSS.

## Project Status

This project is currently done. Users can sing up and sing in with Google or email and passwod, can mix them, change theme and language, turn on and of vibration and sound, name, password, avatar, add, delete or edit tasks with date, priority and comments, sort tasks. For mobile added swipe sidebar, vibration and sound.

## Project Screen Shots

![home page](./src/assets/img/markdown/Screenshot_1.png)

![quick add task](./src/assets/img/markdown/quick-add-task.gif)

![settings](./src/assets/img/markdown/settings.gif)

![context menu](./src/assets/img/markdown/context-menu.gif)

![task details](./src/assets/img/markdown/task-details.gif)

![swipe sidebar](./src/assets/img/swipe-menu.gif)

## Installation and Setup Instructions

Open [https://todol-dev.firebaseapp.com/](https://todol-dev.firebaseapp.com/) to view it in the browser.

Clone down this repository. You will need firebase account and `node`, `npm` installed globally on your machine.

Installation:

![how download](./src/assets/img/markdown/how-download.gif)

Clone repository

`git clone https://github.com/Avalanche322/TodoList.git`

Open folder

`cd TodoList`

Install node modules:

`npm install`

To create `.env.local` (API Google Firebase)

You must open your IDE and create `.env.local` in root folder.

REACT_APP_API_KEY= API KEY <br />
REACT_APP_AUTH_DOMAIN= AUTH DOMAIN <br />
REACT_APP_PROJECT_ID= PROJECT ID <br />
REACT_APP_STORAGE_BUCKET= STORAGE BUCKET <br />
REACT_APP_MESSAGING_SENDER_ID= MESSAGING SENDER ID <br />
REACT_APP_APP_ID= APP ID <br />
REACT_APP_MEASUREMENT_ID= MEASUREMENT ID <br />

To Start Server:

`npm run start`

To Visit App:

`http://localhost:3000`
