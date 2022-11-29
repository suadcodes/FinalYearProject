import {useState,useEffect} from 'react';
import RenderCount from './RenderCount.js';
import API from '../api/API.js';
import EventsPanel from './entities/events/EventsPanel.js';

export default function Events(){
//initialisation 
 const eventID = 6;
 const endpoint = `/events/${eventID}`;

// State
const [events, setEvents] = useState(null);
const [loadingMessage,setLoadingMessage] = useState('Loading records...');

//Context
//Methods
const apiCall = async (endpoint)=> {
    const response = await API.get(endpoint);
    response.isSuccess
        ? setEvents(response.result)
        : setLoadingMessage(response.message)
};

useEffect(() => { apiCall(endpoint) },[endpoint]);

//View
    return (
        <section>
     
        <h1> Events</h1>
        {
            !events
                ? <p>{loadingMessage}</p>
                : events.length === 0
                    ? <p> No events found</p>
                    :<EventsPanel events={events}/>
                    
        }
        </section>
      
    );
}

