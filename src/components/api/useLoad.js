import { useState, useEffect } from 'react';
import API from './API.js';

export default function useLoad(endpoint) {

  // State ---------------------------------------
  const [events, setEvents] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading records ...');

  // Methods -------------------------------------
  const loadEvents = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setEvents(response.result)
      : setLoadingMessage(response.message)
  };

  useEffect(() => { loadEvents(endpoint) }, [endpoint]);

  // Return --------------------------------------
  return [events, setEvents, loadingMessage, loadEvents];
}