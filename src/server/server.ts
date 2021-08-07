import express from 'express';
import {start} from '../index'

const app = express();
const port = process.env.PORT;

start();

app.get('/',(req,res)=>{
    res.send('Heroku');
})


app.listen(port,()=>{
    console.log(`Running on ${port}`);
})