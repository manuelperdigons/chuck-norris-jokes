const dotenv = require('dotenv');
const port = 3000;

dotenv.config({ path: './config.env' });

const app = require('./app');

const server = app.listen(port, () => {
    console.log(`App running on port: ${port}`);
})