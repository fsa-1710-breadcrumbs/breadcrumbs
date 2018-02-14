# Welcome to _Breadcrumbs_

[Deployed Frontend on EXPO](https://expo.io/@hokevins/breadcrumbs)

[Deployed Backend on Heroku](https://breadcrumbs.herokuapp.com/)

[Project Github (Frontend & Backend Repositories)](https://github.com/fsa-1710-breadcrumbs)

Breadcrumbs is an augmented reality React-Native iOS app inspired by Hansel and Gretel.  Users can create or follow a trail of AR breadcrumbs, rendered as 3D floating orbs through your phone's camera.  Being independent of a map-based API, our app utilizes your relative location to provide small scale accuracy where Google Maps would fail.  Or if you're feeing adventurous, follow another user's trail to explore the road best travelled.  Breadcrumbs is your beacon back home.

## iPhone 6S Screenshots

![iPhone 6S Screenshot DEMO 1](assets/breadcrumbsScreenshot01.png)


![iPhone 6S Screenshot DEMO 2](assets/breadcrumbsScreenshot02.png)


![iPhone 6S Screenshot DEMO 3](assets/breadcrumbsScreenshot03.png)


![iPhone 6S Screenshot DEMO 4](assets/breadcrumbsScreenshot04.png)


![iPhone 6S Screenshot DEMO 5](assets/breadcrumbsScreenshot05.png)

## Background

* Breadcrumbs daringly uses experimental technologies like EXPO-Three.js, in conjunction with some libraries (EXPO-ARKit) which are only a few months old within the React-Native environment.

* Rather than relying on geolocation, we made the choice to leverage EXPO-Three.js in order to gather relative location data for small scale exact accuracy (i.e. looking for your car in a parking garage, first-time student at Fullstack looking for the Oasis.)

* As our Capstone, we wanted to explore new libraries like ARKit, Three.js, Expo-Three.js, React-Native & Expo.io combined with all of the technologies we know and love on the stack like Express.js and Sequelize.js.

## Running App Locally

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Currently, React Native does not support npm version 5.x+.
We recommend using a Node/NPM version manager like 'n'.
Simply run `npm install -g n` to install 'n' globally.
Running the following commands will tell you what versions you currently have:
```
node -v
npm -v
```
You should see node version v7.7.4 and npm 4.1.2 if you run `sudo n 7.7`.
If you ever want to switch back to the latest version (or you just want to update to the latest version) just run `sudo n latest`.

In the development process, we also recommend using Expo's iOS & Android simulator for quick feedback and testing.

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

This script can be used on the backend's and the frontend's separate package.json files to run the app.  You must change the IP.js file on the frontend to reflect your current IP address if running locally.

### `npm test`

Runs the Mocha/Chai test runner on the tests.

## About

Fullstack Academy of Code (Cohort 1710) - Capstone Project

Team I:  Kevin Ho, Shannen Ye, Jesse Moskowitz, Vanessa Jimenez

Our Instructors:  Corey Greenwald & Omri Bernstein

Our Team Fellow:  Jannine Chan
