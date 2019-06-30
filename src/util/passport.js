const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (container) {
  const sequelize = container.get('sequelize');
  const User = sequelize.model('User');

  passport.use('register', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.create({ email, password });
      if (user) done(null, user);
      else done(null, false, { message: 'Registration error' });
    } catch (err) {
      done(err);
    }
  }));

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (user) {
        if (await user.isValidPassword(password)) done(null, user);
        else done(null, false, { message: 'Incorrect password' });
      } else {
        done(null, false, { message: 'Incorrect email' });
      }
    } catch (err) {
      done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      if (user) done(null, user);
      else done(null, false);
    } catch (err) {
      done(err);
    }
  });

  return passport;
};
