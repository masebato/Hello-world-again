require('dotenv').config();
const server = require('./server');
const port = 3000;

server.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});
