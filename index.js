const Joi =require('joi');
const express = require('express');
const app  =  express();
app.use(express.json());

const movies = [

    { id:1, genre:'action'},
    { id:2, genre:'thriller'},
    { id:3, genre:'drama'},
    { id:4, genre:'horror'},

];

app.get('/api/movies',(req, res)=> {
    res.send(movies);
});

app.get('/api/movies/:id', (req,res)=> {
    // Get user with a given id
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('The movie with the given id not found');
    res.send(movie);
});

app.post('/api/movies',(req,res)=>{
    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = {
        id : movies.length +1,
        genre:req.body.genre
    }
    movies.push(movie);
    res.send(movie);

});

app.put('/api/movies/:id',(req,res)=> {
    
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('The movie with the given id not found');

    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    movie.genre =req.body.genre;
    res.send(movie);
});

app.delete('/api/movies/:id',(req,res)=> {
    
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('The movie with the given id not found');

    // Delete movie
    const index = movies.indexOf(movie);
    movies.slice(index,1); // Remove one object
    res.send(movie);

});


function validateMovies(movie){

    const schema = {
        genre:Joi.string().min(3).required()
    };
    return Joi.validate(movie,schema);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));