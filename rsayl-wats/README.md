# Welcome to Rsayl Wats! V0.001

![alt text](https://i.imgur.com/FBqeWFX.png)

Hi! this code enable you to send multiple messages to multiple whatsapp number

## Setup

```


1) npm install
2) write your frontend code or use qrcode-terminal
3) npm start

```

## API

```
// to print QR code on terminal or send it to client
GET http://localhost:5000/

// to send message only
POST http://localhost:5000/message

// to send message with media
POST http://localhost:5000/media
```

## whatsapp web js library

library I used

```
//first step

const { Client } =  require("whatsapp-web.js");

const  client  =  new  Client();



client.on("qr", qr  => {

console.log("QR RECEIVED", qr);

});



client.on("ready", () => {

console.log("Client is ready!");

});



client.initialize();



// second

//npm i qrcode-terminal

const  qrcode  =  require("qrcode-terminal");



const { Client } =  require("whatsapp-web.js");

const  client  =  new  Client();



client.on("qr", qr  => {

qrcode.generate(qr, { small: true });

});



client.on("ready", () => {

console.log("Client is ready!");

});



client.initialize();



//third

/*

Listening for messages

Now that we can connect to WhatsApp, it's time to listen for incoming messages. Doing so with whatsapp-web.js

is pretty straightforward. The client emits a message event whenever a message is received. This means we can capture it like so:

*/

client.on("message", message  => {

console.log(message.body);

});



// Replying to messages

client.on("message", message  => {

if (message.body  ===  "!ping") {

message.reply("pong");

}

});



// Sending local files



const { MessageMedia } =  require("whatsapp-web.js");



const  media  =  MessageMedia.fromFilePath("./path/to/image.png");

chat.sendMessage(media);



//Sending files from a URL



const { MessageMedia } =  require("whatsapp-web.js");



const  media  =  await  MessageMedia.fromUrl(

"https://via.placeholder.com/350x150.png"

);

chat.sendMessage(media);
```
