const express = require("express");
const app = express();
const port = 5000;

var ping = require("ping");

var hosts = ["victory.ny.anchored.host", "blade.dallas.anchored.host"];
var status = [];

hosts.forEach(function (host) {
  setInterval(function () {
    ping.sys.probe(host, function (isAlive) {
      if (isAlive) {
        console.log(host + " is alive");
        status.push(host + " is online");
      } else {
        status.push(host + " is dead");
      }
    });
  }, 180000);
});

app.get("/network", (req, res) => {
  res.send(status);
});

app.listen(port, () => {
  console.log(`api.anchored.host is now online. Port: ${port}`);
});
