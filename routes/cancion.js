const { Router} = require('express')
const axios = require('axios')
const router = Router()
const CancionSchema = require ('../db/schemas/cancion')
const tuToken = ''; 

router.get('', async (req ,res) =>{
    
    const { favorites } = req.query
    if(favorites && isNaN(favorites) && typeof favorites ==='boolean'){
        const cancionesFavoritas = await CancionSchema.find({favorite : favorites})
        res.status(200).send({
            cancionesFavoritas
        })
    }else{
        const canciones = await CancionSchema.find()
        res.status(200).send({
            canciones
        })
    }
})

router.post('/add' , async (req,res)=>{
    const { name } = req.body
    const { artist } = req.body

    const existeCancion = await CancionSchema.findOne({name : name , artist : artist})
    if (existeCancion){
        res.status(418).send({
            message : 'La cancion ya existe'
        })
    }else{
        await CancionSchema.create({name, artist})
        res.status(201).send({
            message : 'Se ha añadido la cancion'
        })
    }
})

router.put('/put/:id' , async (req,res,next) => {
    const { id } = req.params
    const existeCancion = await CancionSchema.findOne({"_id": id})
    if (existeCancion) {
        next()
    }
    else{
        res.status(404).send({
            message : 'La cancion no existe'
        })
    }
},async (req,res) =>{
    const { id } = req.params
    const update = req.body
    console.log(update);
    await CancionSchema.findByIdAndUpdate({"_id": id}, update)
    res.status(200).send({
        message: 'La cancion se ha modificado'
    })

})


router.delete('/delete/:id', async (req,res,next) =>{
    const { id } = req.params
    const existeCancion = await CancionSchema.findOne({"_id": id})
    if (existeCancion) {
        next()
    }
    else{
        res.status(404).send({
            message : 'La cancion no existe'
        })
    }
},async (req,res) =>{
    const { id } = req.params
    await CancionSchema.findByIdAndDelete({"_id": id})
    res.status(200).send({
        message: 'La cancion se ha eliminado'
    })

})

async function fecthTopTracks(){
    try{
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks',{
            headers : {
                'Authorization' : 'Bearer ' + tuToken,
                'Content-Type' : 'application/json'
            },
        });
        const data = response.data.items.map(({name , artists}) => 
            `${name} --> ${artists.map(artists => artists.name).join(', ')}`
        )      
        return data;
    }
    catch(error){
        console.log(error);
        return { error : error.message}
    }
}
router.get('/top-tracks' , async (res ,req) => {
    const data = await fecthTopTracks();
    res.json(data)
});



module.exports = router