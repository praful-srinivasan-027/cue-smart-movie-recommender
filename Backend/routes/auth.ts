import express from 'express'
import db from '../prismaClient'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()
router.post('/register', async(req,res) => {
    const [email,password] = [ req.body.email, req.body.password]
    if(!email||!password){
        res.status(400).json({message:"Email and password are required"})
    }
    const hashed = await bcrypt.hash(password,10)
    const user = await db.user.create({
        data:{
            email,
            password: hashed
        }
    })
    res.status(201).json({message:"User created successfully"})
})
router.post('/login', async(req,res) => {
    const [email,password] = [ req.body.email, req.body.password]
    if(!email||!password){
        return res.status(400).json({message:"Email and password are required"})
    }
    const user= await db.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const isValid= await bcrypt.compare(password, user.password)
    if(!isValid){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET!, { expiresIn: '7d' })
    return res.status(200).json({message:"Login successful", token, email: user.email})

})
export default router