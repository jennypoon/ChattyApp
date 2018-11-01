// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  //Incoming message from Browser
  ws.on('message', function incoming(event) {
    console.log("ws.on message:", event)
    let incomingEvent = JSON.parse(event);

    switch(incomingEvent.type) {
      case 'incomingMessage':
        console.log(`User ${incomingEvent.username} said ${incomingEvent.content}`)

        let messageWithId = {
          id: uuidv4(),
          type:'incomingMessage',
          username: incomingEvent.username,
          content: incomingEvent.content
        }

        wss.clients.forEach(client => {
          client.send(JSON.stringify(messageWithId))
        })
        break;

      case 'incomingNotification':
        console.log(`${incomingEvent.content}`)

        let notificationMsg = {
          id: uuidv4(),
          type: 'incomingNotification',
          content: incomingEvent.content
        }

        wss.clients.forEach(client => {
          client.send(JSON.stringify(notificationMsg))
        })
        break;

    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});