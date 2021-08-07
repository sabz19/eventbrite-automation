import express from 'express';
import {start} from '../index'

const app = express();
const port = process.env.PORT || 3000;

start();

app.get('/',(req,res)=>{
    res.send('Heroku');
})

console.log('Port = ', port);
app.listen(port,()=>{
    console.log(`Running on ${port}`);
})