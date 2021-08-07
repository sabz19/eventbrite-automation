/** Task
 * Fetch time from UTC date
 * Convert time to ET
 * Compare input time and fetch the right event
 * Write to file
 */

import { ebEnvironment } from "../../Environment/environment";
import { EventSeries } from "../Model/Event";
import moment from "moment";
import { URL } from "url";
import {request} from '../Request';
import { getAttendeeInfo } from "../AttendeeWorkflow/GetAttendee";
import { assert } from "console";

/** Needs to be a user input */
const startDateInit = "2021-08-08";
const startDateEnd = "2021-08-10";
const inputTime: string = "18:00";
/**  */

const eventSeriesId = "117176613405";
const eventPath = `/v3/series/${eventSeriesId}/events`;
const query = `start_date.range_start=${startDateInit}&start_date.range_end=${startDateEnd}`;
const eventAPI = ebEnvironment.base + eventPath;


const eventDays = ["Sunday", "Monday"];

function timeMatches(startDate: string, inputTime: string) {
  const date = moment(startDate).utc();
  let time = moment(startDate).format("HH:mm");
  date.subtract({ hours: 4 });
  time = date.format("HH:mm");
  if (time.toString() === inputTime) {
    return true;
  }
  return false;
}

function getMatchingEvent(eventData: EventSeries): Array<String> {
  const events = eventData.events;
  const matchingEvents = [];
  if(!eventData || !events){
    return [];
  }

  for (let i = 0; i < events.length; i++) {
    const startDate = events[i]["start"].utc;
    assert(startDate != undefined);
    const day = moment(startDate).format("dddd");
    if (eventDays.includes(day)) {
      if (timeMatches(startDate, inputTime)) {
        matchingEvents.push(events[i].id);
      }
    }
  }

  return matchingEvents;
}

export async function getEventDetails() {
  let url = new URL(eventAPI);
  url.search = query;
  const matchingEvents = getMatchingEvent(await request(url) as EventSeries);
  getAttendeeInfo(matchingEvents);
  console.log("matching event = ", matchingEvents);

  // const response = await fetch(url,{
  //     method:'GET',
  //     headers:{'Content-type': 'application/json', 'Authorization': `Bearer ${await token()}`}
  // });
  // const responseText = await response.json();
  // console.log(responseText);
  //const matchingEvents = getMatchingEvent(responseText as EventSeries);
  //return [];
}
