const rp = require('request-promise');

exports.getProducts = (req, res) => {
  const options = {
    uri: `https://api.tillhub.com/api/v0/products/${process.env.USERID}`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `Bearer ${process.env.TOKEN}`,
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
    });
}

exports.getOneProduct = (req, res) => {
  const options = {
    uri: `https://api.tillhub.com/api/v0/products/${process.env.USERID}/${req.params.id}`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `Bearer ${process.env.TOKEN}`,
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
    });
}

exports.getOneProductChildren = (req, res) => {
  const options = {
    uri: `https://api.tillhub.com/api/v1/products/${process.env.USERID}/${req.params.id}/children`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `Bearer ${process.env.TOKEN}`,
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
    });
}



