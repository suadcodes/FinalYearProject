import {useState,useEffect} from 'react';
//import RenderCount from '../RenderCount.js';
import API from '../../api/API.js';
import EventsPanel from '../entities/events/EventsPanel.js';
import ToolTipDecorator from '../PageLayout/ToolTipDecorator.js';
import EventForm from '../entities/events/EventForm.js';
import JoinEventForm from '../entities/events/JoinEventForm.js';
import {ActionTray,ActionAdd} from '../PageLayout/Actions.js'

export default function Events(){
//initialisation 
 const eventID = 8;
 const endpoint = `/events/${eventID}`;

// State
const [events, setEvents] = useState(null);
const [loadingMessage,setLoadingMessage] = useState('Loading records...');

const [newevent,setNewEvent]= useState(false);
const [joinEventForm,setJoinEventForm]= useState(false);


//Context
//Methods

const apiCall = async (endpoint)=> {
    const response = await API.get(endpoint);
    response.isSuccess
        ? setEvents(response.result)
        : setLoadingMessage(response.message)
};

useEffect(() => { apiCall(endpoint) },[endpoint]);

const handleAdd =() =>setNewEvent(true);
const handleJoin =() =>setJoinEventForm(true);

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
<br></br>
        <ActionTray>
            <ToolTipDecorator message="Create an event">
                <ActionAdd showText onClick={handleAdd} buttonText="Create an event" />
            </ToolTipDecorator>
            <ToolTipDecorator message="Join an event">
                <ActionAdd showText onClick={handleJoin} buttonText="Edit an event" />
            </ToolTipDecorator>
        </ActionTray>
        {
            newevent && <EventForm/>
        }
         {
            joinEventForm && <p>{JoinEventForm}</p>
        }
        </section>
      
    );
}

