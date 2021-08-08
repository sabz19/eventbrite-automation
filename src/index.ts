import {getEventDetails} from './EventBrite/EventSeriesWorkflow/query';

export async function start(){
    await getEventDetails();
};

start();