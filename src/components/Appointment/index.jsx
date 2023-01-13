import React from 'react'
import "./styles.scss";
import Header from './Header.jsx';
import Show from './Show.jsx';
import Empty from './Empty.jsx';

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
    </article>
  )
}