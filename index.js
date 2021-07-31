const https = require("https");
const axios = require('axios');

let config = {
    headers:{
        Authorization:'Bearer YU3ZOA2QWNF4R3SZFGAP'
    }
}

axios.get('https://www.eventbriteapi.com/v3/series/117176613405/events?start_date.range_star=2021-07-20&start_date.range_end=2021-07-21',config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

const data = JSON.stringify({
    name: "John"
})
//const api = 'https://www.eventbriteapi.com/v3/series/117176613405/events?';
//const url = api + new URLSearchParams({'start_date.range_start':'2021-07-20','start_date.range_end':'2021-07-21'});
const options = {
    hostname: "www.eventbriteapi.com",
    port: 443,
    path: "/v3/series/117176613405/events",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      "Authorization":'Bearer YU3ZOA2QWNF4R3SZFGAP'
    }
}

// const req = https.request(options, (res) => {
//     console.log(`status: ${res.statusCode}`);
// });

// req.write(data);
// req.end();