/** Task
 * Fetch time from UTC date
 * Convert time to ET
 * Compare input time and fetch the right event
 * Write to file
 */

import { ebEnvironment } from "../../Environment/environment";
import { EventSeries, Event } from '../Model/Event';
import  moment  from 'moment';
import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';
import { URL, URLSearchParams } from "url";


/** Needs to be a user input */
const startDateInit = '2021-08-03';
const startDateEnd =  '2021-08-10';
const inputTime: string = '14:00';
/**  */

const eventSeriesId = '117176613405';
const eventPath =  `/v3/series/${eventSeriesId}/events`;
const query = `start_date.range_start=${startDateInit}&start_date.range_end=${startDateEnd}`;
const eventAPI = ebEnvironment.base + eventPath +'?' + query;
const tokenPath = '/Users/sabarishnadarajan/Dev/AOL/token_file.txt';

const eventDays = ['Sunday','Monday'];

function timeMatches(startDate: string, inputTime: string){
    console.log(startDate);
    const date = moment(startDate).utc();
    let time = moment(startDate).format('HH:mm');
    date.subtract({hours: 4});
    time = date.format('HH:mm');

    if(time.toString() === inputTime){
        return true;
    }
    return false;
}

function getMatchingEvent(eventData: EventSeries){
    
    const events = eventData.events;
    const matchingEvents = [];
    
    for(let i = 0; i < events.length; i++){
        const startDate = events[i]['start'].utc;
        const day = moment(startDate).format('dddd');
        console.log(startDate,day);
        if(eventDays.includes(day)){
            if(timeMatches(startDate,inputTime)){
                matchingEvents.push(events[i])
            }
        }
    }

    return matchingEvents;
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
    
    let config = {
        headers:{
            Authorization:`Bearer ${await token()}`
        }
    }
    let url = new URL('https://www.eventbriteapi.com/v3/series/117176613405/events');
    url.search = 'start_date.range_start=2021-07-20&start_date.range_end=2021-07-21';
    axios.get(url.toString(),config)
      .then(response => {
        const matchingEvents = getMatchingEvent(response.data as EventSeries);
        console.log('matching events = ',matchingEvents);
        return matchingEvents;
      })
      .catch(error => {
        console.log(error);
      });
    
    // const response = await fetch(url,{
    //     method:'GET',
    //     headers:{'Content-type': 'application/json', 'Authorization': `Bearer ${await token()}`}
    // });
    // const responseText = await response.json();
    // console.log(responseText);
    //const matchingEvents = getMatchingEvent(responseText as EventSeries);
    //return [];
}
