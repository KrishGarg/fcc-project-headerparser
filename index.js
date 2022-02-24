const express = require("express");
const requestIp = require("request-ip");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));
app.use(requestIp.mw());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", function (req, res) {
  return res.send({
    ipaddress: req.clientIp,
    software: req.headers["user-agent"],
    language: req.headers["accept-language"],
  });
});

if (!process.env.DETA_RUNTIME) {
  const listener = app.listen(process.env.PORT || 3000, function () {
    console.log(
      "Your app is listening on http://localhost:" + listener.address().port
    );
  });
}

module.exports = app;
