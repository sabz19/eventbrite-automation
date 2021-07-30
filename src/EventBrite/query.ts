
import { ebEnvironment } from "../Environment/environment";
import fetch from 'node-fetch';
import fs from 'fs';

/** Needs to be a user input */
const startDateInit = '2021-07-20';
const startDateEnd =  '2021-07-25';
/**  */

const eventSeriesId = '117176613405';
const eventPath =  `/v3/series/${eventSeriesId}/events?start_date.range_start=${startDateInit}&start_date.range_end=${startDateEnd}`;
const eventAPI = ebEnvironment.base + eventPath
const tokenPath = '/Users/sabarishnadarajan/Dev/AOL/token_file.txt';


function processDates(eventData: JSON){

    return ['x','y']
}
async function token(){
    return await new Promise((resolve,reject)=>{
        fs.readFile(tokenPath,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
    })})
}

export async function getEventDetails(){
    const response = await fetch(eventAPI,{
        method:'GET',
        headers:{'Content-type': 'application/json', 'Authorization': `Bearer ${await token()}`}

    })
    //const processDates(response.json())
    return response.json();
}
