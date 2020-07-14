const fs = require('fs');
const dropboxV2Api = require('dropbox-v2-api');
const getJoke = require("./api-call");
const favicons = require("favicons");

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_TOKEN
});

exports.getJokes = async (req, res, next) => {
  const jokes = new Map();

  while (jokes.size < 10) {
    const fullJoke = await getJoke.chuckNorrisJokes();
    const { id, value } = fullJoke.data;
    if (!jokes.has(id)) {
      jokes.set(id, value);
    }
  }
  const headers = 'ID, JOKE';
  const jokeCSV = Array.from(
      jokes.entries()
    ).map(entry => {
      return `${JSON.stringify(entry[0])},${JSON.stringify(entry[1])}`;
    }).join('\r\n');

  const csv = `${headers}\r\n${jokeCSV}`;

  fs.writeFileSync('./chuck-norris-jokes.csv', csv, 'utf8');

  dropbox({
    resource: 'files/upload',
    parameters: {
        path: '/dropbox/chuck-norris-jokes.csv',
        mode: 'overwrite'
    },
    readStream: fs.createReadStream('./chuck-norris-jokes.csv')
  }, (err, result, response) => {
    console.log(err);
    console.log(result);
    console.log(response);
  });

  res.status(200).json({
    status: "success",
    data: JSON.stringify(Array.from(jokes.entries()))
  });
};
