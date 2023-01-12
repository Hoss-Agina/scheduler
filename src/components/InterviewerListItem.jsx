import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";




export default function InterviwerListItem(props) {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const InterviewerImgClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  })


  return (
  <li 
  className = {InterviewerClass}
  onClick={props.setInterviewer}
  >
    <img
      className={InterviewerImgClass}
      src={props.avatar}
      alt="Sylvia Palmer"
    />
    {props.selected && props.name}
  </li>
  );
}