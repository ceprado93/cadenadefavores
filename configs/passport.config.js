const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require('connect-flash')
const User = require('./../models/user.model')
module.exports = app => {
    app.use(session({
        secret: "passport-0121",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
          },
    }))
    passport.serializeUser((user, cb) => { cb(null, user._id); })
    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });
    app.use(flash())
    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(null, false, { message: "Nombre de usuario incorrecto" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return next(null, false, { message: "Contraseña incorrecta" });
            }
            return next(null, user);
        })
    }))
    app.use(passport.initialize())
    app.use(passport.session())
}