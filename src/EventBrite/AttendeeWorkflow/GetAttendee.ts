
import { ebEnvironment } from "../../Environment/environment";
import { URL } from "url";
import { request } from '../Request';
import { Attendee, AttendeeList } from '../Model/Attendee';

let path = 'v3/events/$id/attendees';

export async function getAttendeeInfo(ids: Array<String> ){
    for(let id in ids){
        path = path.replace(/\$id/,id);
        path = path.replace(/\$id/,id);
        const eventAPI = ebEnvironment.base + path;
        let url = new URL(eventAPI);
        const attendeeList = await request(url) as AttendeeList;
        for(let attendee in attendeeList.ele){
            
        }


    }
}