/* function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Invalid authorization" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Invalid access" });
    }
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
  // console.log("inside verifyJWT", authHeader);
} */
