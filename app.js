const express = require('express');
const app = express();
const db = require('./models');
const http = require('http');
const cookieParser = require('cookie-parser');

// Parse Cookie header
app.use(cookieParser());
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.get('origin') ? req.get('origin') : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
require('./api/v1/routes/auth')(app);
require('./api/v1/routes/course')(app);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
db.sequelize.sync({force: false}).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
  });
});
