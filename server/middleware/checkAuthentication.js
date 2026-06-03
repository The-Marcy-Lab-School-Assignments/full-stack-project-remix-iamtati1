const checkAuthentication = (req, res, next) => {
  console.log("SESSION IN AUTH:", req.session);

  if (!req.session || !req.session.user_id) {
    return res.status(401).send({
      error: "You must be logged in."
    });
  }

  next();
};

module.exports = checkAuthentication;
