export interface EventSeries{
 // Add the event details
    events: Array<Event>
}

type timeDetails = {
    timezone: string;
    local: string;
    utc: string
}

export interface Event{
    start: timeDetails;
    end: timeDetails
    id: string;
}