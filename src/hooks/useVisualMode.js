import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      //i sliced and then took the last element
      // const newHistory = history.slice(0, -1);
      // setMode(newHistory[newHistory.length - 1]);
      // setHistory(newHistory);
      setHistory((prev) => {
        //took the second last element and sliced off the last element
        setMode(prev[prev.length - 2]);
        return [...prev.slice(0, -1)];
      });
    }
  }

  return { mode, transition, back };
}
