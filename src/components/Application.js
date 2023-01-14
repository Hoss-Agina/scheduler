import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };




export default function Application(props) {

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => {
    setState(prev => ({...prev, day}))
  }

  

// useEffect(() => {
//   const testURL = `http://localhost:8001/api/days`;
//   axios.get(testURL).then(response => {
//     console.log(response.data);
//     setState(prev => ({...prev, days: response.data}))
//   });
// }, []);

useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {
    console.log('days', all[0].data); // first
    console.log('appointments', all[1].data); // second
    console.log('interviewers', all[2].data); //third
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  });
}, []);

  const appointmentsArray = dailyAppointments.map(appointment => {
    const interviewInfo = getInterview(state, appointment["interview"]);
    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interviewInfo}
      />
    )
  }) 
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
