import db from '../prismaClient'
import express from 'express'
import { getMoodGenres } from '../Services/ai'
const router = express.Router()
router.post('/recommend', async(req,res) => {
    const { mood } = req.body
    if(!mood){
        return res.status(400).json({message:"Mood is required"})
    }
    const genres = await getMoodGenres(mood)
    return res.json(genres);
})
export default router
