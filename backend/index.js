import express from 'express';
import initialize from './app/app.js';
const app = express();

const port = 8000;
initialize(app);


//app.get('/', (request, response) => response.send('Hello World'));

app.listen(port, () => console.log("Server is listening at port " + port));

