import axios from 'axios';
import fs from "fs";
import { URL } from "url";

const tokenPath = "/Users/sabarishnadarajan/Dev/AOL/token_file.txt";

async function token(){
    return await new Promise((resolve,reject)=>{
        fs.readFile(tokenPath,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
    })})
}

export async function request(url: URL): Promise<Object> {

let config = {
    headers:{
        Authorization:`Bearer ${await token()}`
    }
}
axios.get(url.toString(),config)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error(error);
  });

  return {};
}