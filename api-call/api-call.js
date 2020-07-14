const axios = require('axios');

exports.chuckNorrisJokes = async () => {
    try {
    const session = await axios({
        method: 'GET',
        url: 'https://api.chucknorris.io/jokes/random'
    })
        return session;
    } catch (error) {
        console.log(error);
    }
};