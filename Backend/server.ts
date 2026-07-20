import express from 'express'
import cors from 'cors'
import db from './prismaClient'
import authRouter from './routes/auth'
import recommendationRouter from './routes/recommendation'
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/recommendations', recommendationRouter)
app.get('/', (req,res)=> {
    res.json({message:"Cue api is running"}) 
})
app.get('/test-db', async (req,res) => {
    const users = await db.user.findMany()
    res.json({users})
})
app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`)
})