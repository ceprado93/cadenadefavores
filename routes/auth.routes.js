const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const passport = require("passport")
const ensureLogin = require('connect-ensure-login')



router.get('/inicio/perfil', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render('auth/private', { user: req.user })
})
router.get('/registro', (req, res) => res.render('./auth/signup'))
router.post("/registro", (req, res, next) => {

    const { username, password} = req.body
    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Rellena los campos" })
        return
    }
    User
        .findOne({ username })
        .then(user => {
            if (user) {
                console.log('El usuario es', user)
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            User
                .create({ username, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", { errorMsg: "Error de servidor" }))
        })
        .catch(error => next(new Error(error)))
})
router.get("/iniciar-sesion", (req, res) => res.render("auth/login"))
router.post("/iniciar-sesion", passport.authenticate("local", {
    successRedirect: "/usuario/perfil",
    failureRedirect: "/inicio/iniciar-sesion",
    failureFlash: true,
    passReqToCallback: true
}))


router.get("/cerrar-sesion", (req, res) => {
    req.logout();
    res.redirect("/");
});
module.exports = router