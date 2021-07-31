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
import { URLSearchParams } from "url";


/** Needs to be a user input */
const startDateInit = '2022-07-20';
const startDateEnd =  '2022-07-25';
const inputTime: string = '14:00';
/**  */

const eventSeriesId = '117176613405';
const eventPath =  `/v3/series/${eventSeriesId}/events?start_date.range_start=${startDateInit}&start_date.range_end=${startDateEnd}`;
const eventAPI = ebEnvironment.base + eventPath
const tokenPath = '/Users/sabarishnadarajan/Dev/AOL/token_file.txt';

const eventDays = ['Sunday','Monday'];

function timeMatches(startDate: string, inputTime: string){
    console.log(startDate);
    const date = moment(startDate).utc();
    //console.log('date = ', date);
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
    
    const api = 'https://www.eventbriteapi.com/v3/series/117176613405/events?';
    const url = api + new URLSearchParams({'start_date.range_start':'2021-07-20','start_date.range_end':'2021-07-21'});
    console.log(url);
    let config = {
        headers:{
            'Authorization':'Bearer YU3ZOA2QWNF4R3SZFGAP',
            'Content-type':'application/json'
        }
    }
    
    axios.get('https://www.eventbriteapi.com/v3/series/117176613405/events?start_date.range_start=2021-07-20&start_date.range_end=2021-07-21',config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    
    // const response = await fetch(url,{
    //     method:'GET',
    //     headers:{'Content-type': 'application/json', 'Authorization': `Bearer ${await token()}`}

    // });
    //const responseText = await response.json();
    //console.log(responseText);
    //const matchingEvents = getMatchingEvent(responseText as EventSeries);
    //console.log('matching events = ',matchingEvents);
    //return responseText;
}
