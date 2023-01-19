import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);

  const countFreeSpots = (state) => {
    const currentDay = state.days.find(day => day.name === state.day)
    const listOfApptIds = currentDay.appointments;
    const listOfAppts = listOfApptIds.map(id => state.appointments[id]);
    const listOfFreeAppts = listOfAppts.filter(appt => !appt.interview);
    const spots = listOfFreeAppts.length
    return spots;
  }

  function updateSpots(state) {
    let currentDayIndex = -1;  
    const currentDay = state.days.find((day, index) => {
      if (day.name === state.day) {
        currentDayIndex = index
        return day
      }
    })

    // const currentDayIndex = state.days.findIndex(day => day.name === state.day)

    const newCurrentDay = { ...currentDay }
    newCurrentDay.spots = countFreeSpots(state)

    const newDays = [...state.days];
    newDays[currentDayIndex] = newCurrentDay
    return newDays;
  }

  const setDay = (day) => {
    setState(prev => ({...prev, day}))
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newState = { ...state, appointments}

    const days = updateSpots(newState);
   return axios.put(`/api/appointments/${id}`, {interview})
   .then(() => {
      setState({...state, appointments, days});
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newState = { ...state, appointments}

    const days = updateSpots(newState);
    
    return axios.delete(`/api/appointments/${id}`)
   .then(() => {
      setState({...state, appointments, days});
    })
    
  }

  return {state, setDay, bookInterview, cancelInterview}
}