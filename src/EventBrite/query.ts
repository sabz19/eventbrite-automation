
import { ebEnvironment } from "../Environment/environment";
import fetch from 'node-fetch';
const startDateInit = '2021-07-20';
const startDateEnd =  '2021-07-25';
const eventPath =  `/v3/series/117176613405/events?start_date.range_start=${startDateInit}&start_date.range_end=${startDateEnd}`;
const eventAPI = ebEnvironment.base + eventPath


export async function getEventDetails(){
    const response = await fetch(eventAPI);
    return response;
}
