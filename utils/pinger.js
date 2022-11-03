async function networkPing() {
  const ping = require("ping");
  const Network = require("../models/networkSchema");
  const network = await Network.find();
  const dnsList = network.map((node) => node.dns);

  dnsList.forEach((dns) => {
    ping.sys.probe(dns, function (isAlive, ms) {
      if (isAlive) {
        Network.findOneAndUpdate({ dns: dns }, { status: "Online" }, (err, doc) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        Network.findOneAndUpdate({ dns: dns }, { status: "Offline" }, (err, doc) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });

  console.log(dnsList || "No DNS found");
}

module.exports = networkPing;
