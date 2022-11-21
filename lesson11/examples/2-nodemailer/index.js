const nodemailer = require("nodemailer");

async function main() {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "adbdee0b8852b8",
      pass: "8fb234f2d2330f",
    },
  });

  const email = {
    from: "vasergen@gmail.com",
    to: "vasersgen@gmail.com",
    subject: "Hello",
    html: "<h1>  Hello from lesson 11 <h1>",
    text: "Hello from lesson 11",
  };

  const response = await transport.sendMail(email);
  console.log("Email sent", response);
}
main().catch((err) => console.error("App err:", err));
