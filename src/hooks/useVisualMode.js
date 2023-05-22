import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // if replace is true, set mode and replace last element of history with the mode
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      // if replace is false, set mode and add it to the history array
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        //set mode with the second last element
        setMode(prev[prev.length - 2]);
        // remove the last element and setHistory without it
        return [...prev.slice(0, -1)];
      });
    }
  }

  return { mode, transition, back };
}
