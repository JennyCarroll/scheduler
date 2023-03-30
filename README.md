# Interview Scheduler

A single page application built using React and tested by Jest, Storybook and Cypress.

Book, edit and delete appointments for each day of the week and see how many spots are left!

## Tech Stack

React (Webpack, Babel)
Axios
Storybook, Jest, Cypress

## Final Product

!["Screenshot of interview scheduler"](https://github.com/JennyCarroll/scheduler/blob/main/docs/interview-scheduler.png?raw=true)

!["Gif of booking appointment"](https://github.com/JennyCarroll/scheduler/blob/main/docs/appointment-form.gif?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

This application is designed to run concurrently with an existing PostgreSQL database through [scheduler-api](https://github.com/JennyCarroll/scheduler-api). The client application communicates with the API server over HTTP, using the JSON format.
