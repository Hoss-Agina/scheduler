import React, { useState } from 'react';
import Button from '../Button.js';
import InterviewerList from '../InterviewerList.jsx';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  const save = () => {
    
  }
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={event => setStudent(event.target.value)}
          /*
            This must be a controlled component
            your code goes here
          */
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => {props.onSave(student, interviewer)}}>Save</Button>
      </section>
    </section>
 </main>
  )
}