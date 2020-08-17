const fs = require("fs");
const dropboxV2Api = require("dropbox-v2-api");
const chuckAPI = require("./chuck-api");

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_TOKEN,
});

const PATH = "./chuck-norris-jokes.csv";

exports.getJokesE = async () => {
  const jokes = new Map();
  while (jokes.size < 100) {
    const fullJoke = await chuckAPI.getJoke();
    const { id, value } = fullJoke.data;
    if (!jokes.has(id)) {
      jokes.set(id, value);
    }
  }
  return jokes;
};

const getJokes = this.getJokesE;

const createCSV = (jokes, path) => {
  const headers = "ID, JOKE";
  const jokeCSV = Array.from(jokes.entries())
    .map((entry) => {
      return `${JSON.stringify(entry[0])},${JSON.stringify(entry[1])}`;
    })
    .join("\r\n");

  const csv = `${headers}\r\n${jokeCSV}`;
  fs.writeFileSync(path, csv, "utf8");
};

const uploadCSV = async (path) => {
  await dropbox(
    {
      resource: "files/upload",
      parameters: {
        path: "/dropbox/chuck-norris-jokes.csv",
        mode: "overwrite",
      },
      readStream: fs.createReadStream(path),
    },
    (err, result, response) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(result);
      console.log(response);
    }
  );
};

exports.response = async (req, res, next) => {
  try {
    const jokes = await getJokes();
    createCSV(jokes, PATH);
    await uploadCSV(PATH);
    res.status(200).json({
      status: "success",
      data: JSON.stringify(Array.from(jokes.entries())),
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message:
        "An error has occured, unable to get Chuck Norris jokes, please try again",
    });
  }
};
