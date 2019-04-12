const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
  
exports.signup = (req, res) => {
  console.log("body:",req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }
  
  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);

    //  if a user with email does exist, return an error
    if (existingUser) return res.status(422).send({ error: 'Email in use' });

    // If a user with email does not ExtensionScriptApis, create and save user record
    const user = new User({ email, password });

    // Respond to request indicating the user was created
    user.save((err) => {
      if (err) return next(err); 

      res.json({ token: tokenForUser(user) });
    })
  });
}

exports.signin = (req, res, next) => {
  // already had their email and password auth'd
  // just need to give them a token;
  res.json({ token: tokenForUser(req.user)});
}