import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = function(newMode, replace = false) {
    setMode(newMode)
    if (!replace) {
      history.push(newMode)
      setHistory(history);
    } 
  } 

  const back = function() {
    if (history.length > 1) {
      history.pop()
      setHistory(history)
      setMode(history[history.length-1])
    }
  }

  return { mode, transition, back };

}