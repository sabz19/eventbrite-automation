
import { ebEnvironment } from "../Environment/environment";
import fetch from 'node-fetch';

/** Needs to be a user input */
const startDateInit = '2021-07-20';
const startDateEnd =  '2021-07-25';
/**  */

const eventPath =  `/v3/series/117176613405/events?start_date.range_start=${startDateInit}&start_date.range_end=${startDateEnd}`;
const eventAPI = ebEnvironment.base + eventPath


export async function getEventDetails(){
    const response = await fetch(eventAPI,{
        method:'GET',
        headers:{'Content-type': 'application/json', 'Authorization': 'Bearer YU3ZOA2QWNF4R3SZFGAP'}

    })
    return response.json();
}
