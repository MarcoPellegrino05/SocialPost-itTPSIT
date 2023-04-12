var fs = require('fs');
var data = new Date();


function scriviFile(percorso, file) {
  fs.writeFile(percorso, file, function(err) {
    if (err) throw err;
    console.log("File scritto con successo");
  });
}


function leggiFile(percorsoFile) {
  var data;
  data = fs.readFileSync(percorsoFile, "utf8", (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  return JSON.parse(data);
}


function appendArrayJSON(percorsoFile, fileJSON, req) {
  var file = "[";
  length = Object.keys(fileJSON).length;

  for (var i = 0; i < length; i++) {
    file += '{ "Nome": "' + fileJSON[i].Nome + '", "Nickname": "' + fileJSON[i].Nickname + '", "Età": "' + fileJSON[i].Punti + '"},\n';
  }
  file += '{ "Nome": "' + req.body.Nome
    + '", "Nickname": "' + req.body.Nickname
    + '", "Età": "' + req.body.Punti + '"}\n';
  file += "]";
  scriviFile(percorsoFile, file);
}

module.exports = { scriviFile, leggiFile, appendArrayJSON }