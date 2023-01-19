import React from 'react'
import "./styles.scss";
import Header from './Header.jsx';
import Show from './Show.jsx';
import Empty from './Empty.jsx';
import Form from './Form.jsx';
import Status from './Status.jsx';
import Confirm from './Confirm.jsx';
import Error_Save from './Error_Save.jsx';
import Error_Delete from './Error_Delete.jsx';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch((error) => {
      transition(ERROR_SAVE, true);
      console.log(error);
    })
    
  }

  function cancel() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && props.interview && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === CREATE && !props.interview && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && <Error_Save message="Could not create appointment" onClose={back}/>}
      {mode === ERROR_DELETE && <Error_Delete message="Could not cancel appointment" onClose={back}/>}
    </article>
  )
}