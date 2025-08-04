const auth = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};

module.exports = auth;
// This middleware checks if the user is authenticated by checking the session.
