const dotenv = require('dotenv').config();
const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();
//Get current IP
const os = require('os');
const ifaces = os.networkInterfaces();

// Add the current IP to the Index of the server
let serverIPAdress = 'module OS is not working'
Object.keys(ifaces).forEach(ifname => {
  let alias = 0;
  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      serverIPAdress = iface.address
    }
    ++alias;
  });
});

// Adding the controlers
const getTillhub = require('./controllers/get.controller.js');

// Router and Port
app.use("/api", router);
const port = process.env.PORT || 5000;

// Example endpoint
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


// Get our API token from tillhub
request.post(
    'https://api.tillhub.com/api/v0/users/login',
    { json: {
      "email": process.env.TILLHUB_EMAIL,
      "password": process.env.TILLHUB_PASS
      }
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        //console.log(body)
        process.env.TOKEN = body.token;
        process.env.USERID = body.user.legacy_id;
      }
    }
  );

// API Landingpage
router.get('/', (req, res) => {
  res.send('API Running');
});

// Retrieve all products "/api/v0/products/:user"
router.get('/products', getTillhub.getProducts);

// Retrieve a sigle product "/api/v0/products/:user/:id"
router.get('/products/:id', getTillhub.getOneProduct);

// Retrieve a sigle product "/api/v1/products/:user/:id/children"
router.get('/products/:id/children', getTillhub.getOneProductChildren);

// Listening port
app.listen(port, () => {
  console.log(`NodeJS tillhub listening on port http://${serverIPAdress}:${port}/api`);
});
