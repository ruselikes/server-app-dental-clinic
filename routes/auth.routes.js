const {Router} = require("express")
const router = Router()
const Pacient = require("../models/pacient")
const bcrypt = require("bcryptjs")
const {check,validationResult} = require('express-validator')


module.exports = router
//  /api/auth
router.post("" +
    "/register",
    [
        check("email","Некорректный E-mail").isEmail(),
        check('password', "Минимальная длина пароля 6 символов").isLength({min:6})
    ],
    async (req,res) =>
{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректные данные при регистрации"
            })
        }
        const {email,password} = req.body

        const candidate = await Pacient.findOne({email: email})

        if (candidate) {
            return res.status(400).json({message:"Пользователь с таким E-mail уже зарегистрирован в системе."})
        }
        const hashedPassword =await bcrypt.hash(password,12)
        const new_pacient = new Pacient ({email:email,password: hashedPassword})
        await new_pacient.save()
        res.status(201).json({message:"Пациент добавлен систему"})
    } catch{
        res.status(500).json({message:"На моем сервер что то не так. tg: trimberg"})
    }
})

router.post("/login",
    [
        check("email","Введите корректный E-mail").normalizeEmail().isEmail,
        check('password', "Введите пароль").exists()
    ],
    async (req,res) =>
{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректные данные при входе в систему"
            })
        }
        const {email,password} = req.body
        const pacient = await Pacient.findOne({email:email})

        if (!pacient){
            return res.status(400).json({message:"Пользователь не найден."})
        }
        const isMatch = await bcrypt.compare(password,pacient.password)

        if (!isMatch){
            return  res.status(400).json({message:"Неверный пароль."})
        }


    }catch {

    }
})