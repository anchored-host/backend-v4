const url = "https://api.battlemetrics.com/servers?filter[search]=" + "%22" + "216.39.240.50" + "%22" + "%22" + "168.100.163.245" + "%22";

var totalServer = document.getElementById("total-servers");
var totalPopDiv = document.getElementById("total-pop");

const getServers = async () => {
  var totalPopValue = 0;
  var totalServersValue = 0;

  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (const server of data.data) {
        totalPopValue += server.attributes.players;
        console.log(`Server ${server.attributes.name} has ${server.attributes.players} players.`);
        totalServersValue++;
      }
    });

  console.log(`Total players: ${totalPopValue}`);

  totalServer.innerHTML = totalServersValue;
  totalPopDiv.innerHTML = totalPopValue;
};
getServers();
