const jwt = require("jsonwebtoken");

const verifyTokenStaff = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, staff) => {
      if (err) return res.status(403).json("Token is not valid");
      req.staff = staff;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAnhAuthorizationStaff = (req, res, next) => {
  verifyTokenStaff(req, res, () => {
    if (req.staff.id === req.params.id || req.staff.position === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdminStaff = (req, res, next) => {
  verifyTokenStaff(req, res, () => {
    if (req.staff.position === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndBoss = (req, res, next) => {
  verifyTokenStaff(req, res, () => {
    if (req.staff.position === "boss") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenBossAndStaff = (req, res, next) => {
  verifyTokenStaff(req, res, () => {
    if (req.staff.position === "boss" || req.staff.position === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyTokenStaff,
  verifyTokenAnhAuthorizationStaff,
  verifyTokenAndAdminStaff,
  verifyTokenAndBoss,
  verifyTokenBossAndStaff,
};
