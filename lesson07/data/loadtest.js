const loadtest = require("loadtest");

const options = {
  url: "http://localhost:3000",
  concurrency: 10,
  method: "POST",
  body: "",
  maxSeconds: 15,

  requestGenerator: (params, options, client, callback) => {
    const message = JSON.stringify({
      email: "user@gmail.com",
      password: "123456",
    });
    options.path = "/api/auth/signup";

    options.headers["Content-Length"] = message.length;
    options.headers["Content-Type"] = "application/json";
    options.body = message;
    const request = client(options, callback);
    request.write(message);
    return request;
  },
};

loadtest.loadTest(options, (error, results) => {
  if (error) {
    return console.error("Got an error: %s", error);
  }
  console.log(results);
  console.log("Tests run successfully");
  process.exit(0);
});
