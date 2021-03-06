// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');



const uuidv4 = require('uuid/v4');


// Set the port to 3001
const port = process.env.PORT || 3001;


// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(port, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ port }`));

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'build')));
  server.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
}



// const httpServer = http.createServer(server)

// Create the WebSockets server
const wss = new SocketServer({ server
    // 'server': httpServer
})

//Broadcast Function
wss.broadcast = function(data) {
  wss.clients.forEach(client =>
    client.send(data))
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');


//USER SPECIFIC
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let usercolor = getRandomColor();
  let name = 'Zubat';

//TOTAL USERS
  let totalUserConnected = {
    type: 'totalUserValue',
    content: wss.clients.size
  }

  wss.broadcast(JSON.stringify({
    type: 'incomingNotification',
    id: uuidv4(),
    content: `A wild ${name} has appeared`
  }))

  wss.broadcast(JSON.stringify(totalUserConnected))


//INCOMING MESSAGES FROM BROWSER
  ws.on('message', function incoming(event) {
    let incomingEvent = JSON.parse(event);

    switch(incomingEvent.type) {

      case 'incomingMessage':
            let messageWithId = {
                  id: uuidv4(),
                  type:'incomingMessage',
                  username: name,
                  content: incomingEvent.content,
                  color: usercolor
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
      content: name + ' has fled'
    }))

    wss.broadcast(JSON.stringify(totalUserConnected))

  });
});