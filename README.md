# DrawGuess
===
## Introduction
This is a full-stack web application for multiplayer drawing and guessing games. This is a fun party game where players can play with friends or random people. Users can play in private rooms or public rooms. In the room, players will draw pictures based on the given words, while other players will guess the meaning of the words by typing in the chat content. If the guessing person gets the correct answer, they can get some points. The creator can limit the number of participants in the game and how many rounds of the game can be selected. The leaderboard will show the player's score, and the game will show the three players with the highest score after all rounds are over.

## Related Work
Skribbl is an existing online multiplayer drawing and guessing game. It creates a nice random avatar for the players and supports different languages. However, we found out that it is not mobile friendly, so we would like to have a responsive design that adjusts to fit the mobile view. In addition, there is no word matching detection in the chat to hide the words after guessing the right answer which might ruin the game experience for some people.

## Quick Start Guide
This project supports local operation, just install simple dependencies.
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
The Draw and Guess mini game will run in your default browser, the local address is: http://localhost:3000

## Website function
The main purpose of the Draw and Guess project is to provide a party game where players can draw and communicate with friends or other players. The function of the project is divided into 5 main parts: lobby, room, canvas, chat room, and ranking.

### lobby
#### User registration and login
To log in to the game for the first time, users first need to register simple personal information, including username, email and password. Users can log in with their username or mailbox number.

#### User lobby
The user lobby after a successful login is mainly divided into three parts, the query room channel, the All Rooms list, and the player's personal information list.
In the middle of the user lobby, room query, room creation, and room list functions are displayed. Players can create announcement rooms and private rooms through the room creation function. Other players can enter the room through the room list in the game lobby. Private rooms can be connected through sharing. Enter the room. Players can join the game through multiple channels according to their needs.
The left part of the page is the user name and query channels for different types of rooms.
The right side of the page is the player's personal information. The Statistics section shows the player's personal record statistics, respectively showing the number of times the player won the first, second, and third place. The Records section shows the rooms that the player has entered, showing the player's rank, time, and score.

### Room
#### Canvas
As one of the core functions of this project, the canvas provides players with a painting space. Players can choose the title they want to draw and draw on the canvas. Players can choose the canvas brush color, brush size, undo function, and clear the canvas.

#### Chat room
Draw and Guess is a drawing queuing game that integrates drawing and making friends. The chat room is the main place for making friends. All players can chat in the chat room and guess the answer drawn. Painter cannot answer the question. If painter sends out the correct answer in the chat room, the answer will be hidden. Other players will get points if they guess right.

#### Ranking
The ranking part will display all player points, and the ranking will be displayed from high to low based on the points.

## Technologies
We will use React for the frontend, and MongoDB, Node.js and Express for the backend. MongoDB would be used to store the drawing paths, rooms, and users. Package use-persisted-state will be used to store the username persistently so that the user doesn’t have to re-enter the name. We will use a third-party package for the canvas called [react-sketch-canvas](https://www.npmjs.com/package/react-sketch-canvas). It provides functions to connect to different drawing tools like eraser mode, changing the color and size of the stroke. It also has a function called savePath() which creates an array of xy coordinates that would allow us to save the drawing to our database with the API and loadPath() can load the drawing back to other users. [Socket.IO](https://socket.io/docs/v3) will be used for handling the real-time, bidirectional and event-based communication for the chat and drawing. It can be used to track the number of people in each room too. We would use a React hook called [use-sound](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/) to allow sound playing for different conditions. The app would be hosted on [Firebase](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/).

## project management




