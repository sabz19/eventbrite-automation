export interface AttendeeList{
    ele: Array<Attendee>;
    profile: Attendee;
}
export interface Attendee{
    firstName: string;
    lastName: string;
    email: string;
    mobile: string
}