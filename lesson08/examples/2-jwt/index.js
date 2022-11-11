const jwt = require("jsonwebtoken");

const JWT_SECRET = "Q!W@E#";

async function main() {
  const data = {
    _id: 1,
  };

  // 1 - generate token
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: "15s",
  });
  console.log("token:", token);

  // 2 - check if token correct
  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    console.log("verifiedToken:", verifiedToken);
  } catch (error) {
    console.error(error);
  }

  // 3 - expired token
  try {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTY2ODEwMjMzNiwiZXhwIjoxNjY4MTAyMzUxfQ.ComTw5yf1dGdh07W_d3w9KW2CO1DEDbpHfgaZeYFClw";
    const verifiedToken = jwt.verify(expiredToken, JWT_SECRET);
    console.log("verifiedToken:", verifiedToken);
  } catch (error) {
    // TokenExpiredError jwt expired
    console.error("EXPIRED_TOKEN_ERROR: ", error.name, error.message);
  }

  // 4 - signature is invalid
  // 3 - expired token
  try {
    const invalidSignatureToken = `${token}A`;
    const verifiedToken = jwt.verify(invalidSignatureToken, JWT_SECRET);
    console.log("verifiedToken:", verifiedToken);
  } catch (error) {
    // JsonWebTokenError invalid signature
    console.error("INVALID_SIGNATURE_ERROR: ", error.name, error.message);
  }
}
main();
