# Draw&Guess

## Introduction

The project that we want to build is a full stack web application for a multiplayer drawing and guessing game. It is a fun party game that you can play with your friends or random people. Users could play in a private or public room. In the room, they will draw the picture according to the given word while other players try to guess what the word is by typing in the chat. They could get some points if they got the correct answer. The player with the highest score will be declared as the winner after 3 rounds.


## Run

``` bash

# Frontend
cd frontend/drawguess
npm install
npm start

# Backend
cd backend
npm install
npm run dev

```
## Technologies
We will use React for the frontend, and MongoDB, Node.js and Express for the backend. MongoDB would be used to store the drawing paths, rooms, and users. Package use-persisted-state will be used to store the username persistently so that the user doesn’t have to re-enter the name. We will use a third-party package for the canvas called react-sketch-canvas. It provides functions to connect to different drawing tools like eraser mode, changing the color and size of the stroke. It also has a function called savePath() which creates an array of xy coordinates that would allow us to save the drawing to our database with the API and loadPath() can load the drawing back to other users. Socket.IO will be used for handling the real-time, bidirectional and event-based communication for the chat and drawing. It can be used to track the number of people in each room too. We would use a React hook called use-sound to allow sound playing for different conditions. The app would be hosted on Firebase.

## Project Management Strategy
In order to facilitate the management of our team projects, our team decided to adopt Scrum methodology. We need a flexible iterative design and construction process. The characteristics of an agile project would allow us to adjust the tasks according to specific situations due to the constantly changing requirements while making incremental changes iteratively.
The development phase will be divided into three 2-week sprint cycles. Each sprint starts with a kick-off meeting and we would communicate to reflect on the progress and make decisions for the next sprint. Taking into account that each person is good at different fields, everyone can choose the task they want to work on from the sprint backlog. In the process of the project, when an individual is unable to overcome the problem, the team members will try to solve it together. Each member can make suggestions, negotiate and the team choose the most suitable solution until the project ends smoothly.
