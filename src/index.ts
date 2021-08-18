import {getEventDetails} from './EventBrite/EventSeriesWorkflow/query';
import { app, BrowserWindow } from 'electron';

export async function start(){
    await getEventDetails();
};

start();


function createBrowserWindow(){
    const win = new BrowserWindow({
    width:600,
    height: 400
    })
}

app.on('ready',createBrowserWindow);