const jwt = require('jsonwebtoken');

module.exports.isAuthorized = function (req, res, next) {
  const authBearerToken = req.headers.authorization;
  const token = authBearerToken.split(' ')[1];
  try {
    const tokenVerification = jwt.verify(
      token,
      '05ebb14a84aabcf4747f7481859dceea01b591f225cf7580a353fc3122fd7539'
    );
    const tokenDecoded = jwt.decode(
      token,
      '05ebb14a84aabcf4747f7481859dceea01b591f225cf7580a353fc3122fd7539'
    );
    req.userId = tokenDecoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
