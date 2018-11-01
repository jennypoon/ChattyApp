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


//Broadcast Function
wss.broadcast = function(data) {
  wss.clients.forEach(client =>
    client.send(data))
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let name = 'Anonymous';
  console.log('Client connected');
  // console.log(wss.clients.size)

  let totalUserConnected = {
    type: 'totalUserValue',
    content: wss.clients.size
  }

  wss.broadcast(JSON.stringify({
    type: 'incomingNotification',
    id: uuidv4(),
    content: name + ' has joined'
  }))

  wss.broadcast(JSON.stringify(totalUserConnected))


  //Incoming message from Browser
  ws.on('message', function incoming(event) {
    // console.log("ws.on message:", event);
    let incomingEvent = JSON.parse(event);

    switch(incomingEvent.type) {
      case 'incomingMessage':
        console.log(`User ${name} said ${incomingEvent.content}`)

        let messageWithId = {
          id: uuidv4(),
          type:'incomingMessage',
          username: name,
          content: incomingEvent.content
        }

        wss.broadcast(JSON.stringify(messageWithId));
        break;

      case 'incomingNotification':
        let notificationMsg = {
          id: uuidv4(),
          type: 'incomingNotification',
          content: incomingEvent.content
        }
        if(incomingEvent.newName){
          name = incomingEvent.newName;
          console.log('New Name', name);
        }
        wss.broadcast(JSON.stringify(notificationMsg));
        break;

      default:
        throw new Error("Unknown event type " + data.type);
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    let totalUserConnected = {
      type: 'totalUserValue',
      content: wss.clients.size,
    }

    wss.broadcast(JSON.stringify({
      type: 'incomingNotification',
      id: uuidv4(),
      content: name + ' has left'
    }))

    wss.broadcast(JSON.stringify(totalUserConnected))

  });
});