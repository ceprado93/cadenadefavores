const express = require('express')
const router = express.Router()
const Favour = require('../models/favour.model')
const User = require('../models/user.model')


router.get('/', (req, res) => {
    Favour
    .find()
    .then(favours=>res.render('./favours/list',{favours }))
    .catch(err=>console.log(err))
    
})
router.get('/nuevo', (req, res) => {
    const user_id = req.user._id
    console.log(req.user)
    User
    .findById(user_id)
    .then(user=>res.render('favours/new', user))
        
    .catch(err=>console.log(err))
    
})

router.post('/nuevo', (req, res) => {
    const {title, description,receive} = req.body

    Favour
    .create({title, description,receive})
    .then(user=>res.redirect('/favores'))
        
    .catch(err=>console.log(err))
    
})
router.get('/detalles/:_id', (req, res) => {
    const _id=req.params._id
    Favour
    .findById(_id)
    .then(favour=>res.render('favours/details',favour))
   .catch(err=>console.log(err))
    
})

router.get('/editar/:_id', (req,res)=>{
    const _id= req.params._id
    Favour
    .findById(_id)
    .then(favour=>res.render('favours/edit',favour))
    .catch(err=>console.log(err))
})

router.post('/editar/:_id',(req,res)=>{
    const _id= req.params._id
    const {title, description}=req.body
    Favour
    .findByIdAndUpdate(_id,{title,description})
    .then(()=>res.redirect('/favores/detalles'))
    .catch(err=>console.log(err))
})
router.post('/eliminar/:_id',(req,res)=>{
    const _id= req.params._id
    Favour
    .findByIdAndRemove(_id)
    .then(()=>res.redirect('/favores'))
    .catch(err=>console.log(err))
})


module.exports = router