const express = require("express");
var path = require("path");

const qrcode = require("qrcode-terminal");
const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");

//const client = new Client({ authStrategy: new LocalAuth() });
const client = new Client();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  res.header("Access-Control-Allow-Methodes", "*"); //GET,PUT,POST,PATCH,DELETE
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
var dir = path.join(__dirname, "assets");
app.use(express.static(dir));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  // accept request from client to send QR
  console.log("accept req");

  client.on("qr", qr => {
    //if you are using node with postman uncomment the line below
    //qrcode.generate(qr, { small: true });
    res.send({ msg: "this Qr code", qr });
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message", message => {
  if (message.body === "!ping") {
    message.reply("pong");
  }
});

// send text message  only
app.post("/message", (req, res) => {
  const { distnation, message } = req.body;
  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = distnation.substring(1) + "@c.us";

  // Sending message.
  // ❤️ 💙 🔥
  client
    .sendMessage(chatId, message)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
  res.send({ msg: "Message Recieved", data: req.body });
});

// send text message with media  only
app.post("/media", async (req, res) => {
  const { distnation, message, imageUrl } = req.body;
  console.log(req.body);
  if (!distnation || !message)
    res.send({ msg: "Error , provide all data", data: req.body });
  const chatId = distnation.substring(1) + "@c.us";
  const media = await MessageMedia.fromUrl(imageUrl);
  client
    .sendMessage(chatId, media, { caption: message })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
  res.send({ msg: "Message Recieved", data: req.body });
});

client.initialize();

app.listen(PORT, () => {
  console.log("server running ...");
});
