const sendGrid = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_API_KEY } = process.env;

async function main() {
  sendGrid.setApiKey(SEND_GRID_API_KEY);
  const email = {
    from: "vasergen@gmail.com",
    to: "vasergen@gmail.com",
    subject: "Sendgrid test 2",
    html: "<h2>Hi there from lesson 11<h2>",
    text: "Hi there from lesson 11",
  };
  const response = await sendGrid.send(email);
  console.log("Email sent", response);
}
main().catch((err) => console.error("App error", err));
