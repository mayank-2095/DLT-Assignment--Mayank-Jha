const https = require("https");

module.exports = function httpGetRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, function (response) {

      //if redirect follow redirect
      if (response.statusCode === 301 || response.statusCode === 302) {
        resolve(httpGetRequest(response.headers.location));
        return
      }

      //In case of success redirection
      let body = "";
      response.on("data", function (data) {
        body += data;
      })
      response.on("end", function () {
        resolve(body);
      })

    })
  });
}