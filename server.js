const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
// import sequelize connection ^^^^^ from dashboard routes Just tech news

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server ??????????????
// from just tech server.js
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });