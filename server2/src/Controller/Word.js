import Word from '../Model/Word.js'



export const addWord  = async(req,res)=>{

    try{
        const {word} = req.body
        const newWord = await Word.create({word})
        res.status(200).json(newWord)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

}

export const getRandomWord = async(req,res) =>{
    try{
        const word = await Word.aggregate([
            { $sample: { size: 1 } }
        ])
        res.status(200).json(word)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}

