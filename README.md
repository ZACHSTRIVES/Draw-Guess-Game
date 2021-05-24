# DrawGuess

<img src="https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/2.png"  height="300" alt="logo"/>

## Introduction

This is a full-stack web application for multiplayer drawing and guessing games. This is a fun party game where players can play with friends or random people. Users can play in private rooms or public rooms. In the room, players will draw pictures based on the given words, while other players will guess the meaning of the words by typing in the chat content. If the guessing person gets the correct answer, they can get some points. The creator can limit the number of participants in the game and how many rounds of the game can be selected. The leaderboard will show the player's score, and the game will show the three players with the highest score after all rounds are over.

## Related Work

[Skribbl](https://skribbl.io/) is an existing online multiplayer drawing and guessing game. It creates a nice random avatar for the players and supports different languages. However, we found out that it is not mobile friendly, so we would like to have a responsive design that adjusts to fit the mobile view. In addition, there is no word matching detection in the chat to hide the words after guessing the right answer which might ruin the game experience for some people.

## Quick Start Guide

This project supports local operation, just install simple dependencies.
``` bash

# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm start

```
The Draw Guess game will run in your default browser, the local address is: http://localhost:3000

Users register an account and start the game after logging in. The same account cannot log in twice. Users can log in to two accounts in one browser, but the browser will only recognize the last logged in account.If users want to test the playability of this game, you need to register two accounts and log in to the game with two different browsers.

## Website function

The main purpose of the Draw Guess project is to provide a party game where players can draw and communicate with friends or other players. The function of the project is divided into 5 main parts: lobby, room, canvas, chat room, and ranking.

### lobby
#### User registration and login
To log in to the game for the first time, users first need to register simple personal information, including username, email and password. Users can log in with their username or mailbox number.

#### User lobby
The user lobby after a successful login is mainly divided into three parts, the query room channel, the All Rooms list, and the player's personal information list.
In the middle of the user lobby, room query, room creation, and room list functions are displayed. Players can create announcement rooms and private rooms through the room creation function. Other players can enter the room through the room list in the game lobby. Private rooms can be connected through sharing. Enter the room. Players can join the game through multiple channels according to their needs.

The left part of the page is the user name and query channels for different types of rooms.

The right side of the page is the player's personal information. The Statistics section shows the player's personal record statistics, respectively showing the number of times the player won the first, second, and third place. The Records section shows the rooms that the player has entered, showing the player's rank, time, and score.

![4](https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/4.png)

### Room
#### Canvas
As one of the core functions of this project, the canvas provides players with a painting space. Players can choose the title they want to draw and draw on the canvas. Players can choose the canvas brush color, brush size, undo function, and clear the canvas.
![6](https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/6.png)

#### ChatRoom
Draw Guess is a drawing queuing game that integrates drawing and making friends. The chat room is the main place for making friends. All players can chat in the chat room and guess the answer drawn. Painter cannot answer the question. If painter sends out the correct answer in the chat room, the answer will be hidden. Other players will get points if they guess right.

#### Ranking
The ranking part will display all player points, and the ranking will be displayed according to the points from high to low. After the players have completed all rounds, the top three players with the total points of this game will be displayed.
![5](https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/5.png)
Overall ranking
![7](https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/7.png)

## Technologies

We will use React for the frontend, and MongoDB, Node.js and Express for the backend. MongoDB would be used to store the drawing paths, rooms, and users. Package use-persisted-state will be used to store the username persistently so that the user doesn’t have to re-enter the name. We will use a third-party package for the canvas called [react-sketch-canvas](https://www.npmjs.com/package/react-sketch-canvas). It provides functions to connect to different drawing tools like eraser mode, changing the color and size of the stroke. It also has a function called savePath() which creates an array of xy coordinates that would allow us to save the drawing to our database with the API and loadPath() can load the drawing back to other users. [Socket.IO](https://socket.io/docs/v3) will be used for handling the real-time, bidirectional and event-based communication for the chat and drawing. It can be used to track the number of people in each room too. We would use a React hook called [use-sound](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/) to allow sound playing for different conditions. The app would be hosted on [Firebase](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/).

## Project management

### Project development strategy
In order to manage the team project in time, our team decided to adopt the kanban agile development method. We use GitHub's project management function to design a kanban that belongs to our project. When a member completes an existing task and is ready to accept the next task, it will communicate this information to other team members through kanban. The purpose is to let the right materials flow to the right place at the right time. At the same time, the project allows us to find the bottleneck in time and adjust the bottleneck in time, such as sending more team members to complete it at the same time.

As shown in the figure below, kanban agile development enables us to visualize tasks, and builds a flexible iterative design and construction process for the entire project, enabling us to adjust tasks according to changing needs according to specific situations, while making incremental changes iteratively.

![1](https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/1.png)

The development phase will be divided into three 2-week sprint cycles. Each sprint begins with a kick-off meeting, and we will communicate to reflect on the progress and make decisions for the next sprint. Considering that everyone is good at different fields, so everyone can choose the task they want to handle from the sprint to-do list. In the course of the project, when the individual cannot solve the problem, the team members will try to solve the problem together. Each member can make suggestions and negotiate, and the team can choose the most suitable solution until the project ends smoothly.

### Task decomposition
According to the needs of the project, we split the entire project into different branches. Each branch manages different functions. The main parts include login, register, canvas, chatroom, choose word, and so on. Each team member claimed their respective tasks, and finally merged the branches to form a complete project.

![3](https://github.com/ZACHSTRIVES/Draw-Guess-Game/blob/master/README/3.png)

### Code management
GitHub helped our team collaborate well. We create a project on GitHub and invite team members to co-edit. We divide the code into different branches, and team members choose what they are good at to work at the same time. After completing the tasks claimed by each, a team member checks the code together, and after confirming that the code can run smoothly, submit the completed code to their respective branch. After completing the branch function, merge all branches and deal with conflicts.

### test
In the test part, we used the jest test. This project is based on the backend part of the test, which simulates the global game. We tested the user service and game service parts separately. There are 9 tests in total.

``` bash
# test
cd backend
npm test

```

### Team communication
Our team consists of four members. At the beginning of the project, we established a social group on social software to communicate the progress of the project in a timely manner. In addition, a weekly face-to-face meeting is scheduled to be held every Wednesday at 4 pm.

In the middle of the project, we found that network communication and limited face-to-face communication did not help us follow up the project in time. It is difficult to accomplish project goals in a limited time. So we changed our plan to meet at school every day and write code together. The face-to-face communication greatly improved our work efficiency and enabled the project to be successfully completed within a limited time. We have a dedicated person responsible for recording the daily work progress, which is recorded in Google Docs. Detailed meeting minutes can be obtained from ["Meeting minutes"](https://docs.google.com/document/d/1vE3WjJcJxce5TtOyfvuP1DwZO3qvm0mo_t8JQNdIz7c/edit).
