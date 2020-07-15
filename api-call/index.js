const fs = require('fs');
const dropboxV2Api = require('dropbox-v2-api');
const chuckAPI = require('./chuck-api');

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_TOKEN
});

const jokes = new Map();

const getJokes = async () => {
  jokes.clear();
  while (jokes.size < 10) {
    const fullJoke = await chuckAPI.getJoke();
    const { id, value } = fullJoke.data;
    if (!jokes.has(id)) {
      jokes.set(id, value);
    }
  }
};

const createCSV = () => {
    const headers = 'ID, JOKE';
    const jokeCSV = Array.from(
        jokes.entries()
      ).map(entry => {
        return `${JSON.stringify(entry[0])},${JSON.stringify(entry[1])}`;
      }).join('\r\n');
  
    const csv = `${headers}\r\n${jokeCSV}`;
  
    fs.writeFileSync('./chuck-norris-jokes.csv', csv, 'utf8');
  }
  
const uploadCSV = async () => {
  await dropbox({
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
}

exports.response = async (req, res, next) => {
  await getJokes();
  if (jokes.size != 0) {
      createCSV();
      await uploadCSV();
      res.status(200).json({
        status: "success",
        data: JSON.stringify(Array.from(jokes.entries()))
      }); 
  } else {
    res.status(400).json({
      status: 'failed',
      message: 'An error has occured, unable to get Chuck Norris jokes, please try again'
    })
  }
}

