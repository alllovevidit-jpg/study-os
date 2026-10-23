import { useState, useEffect } from 'react';

function StudyTimer() {
  const FOCUS_TIME = 25 * 60; // 25 minutes in seconds (1500s)
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Runs a 1-second interval timer ONLY when `isRunning` is true
  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // CLEANUP: Stops the background clock if you pause or leave the page
    return () => clearInterval(timerId);
  }, [isRunning]);

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(FOCUS_TIME);
  }

  // Convert total seconds (e.g. 1500) into MM:SS format (e.g. "25:00")
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="timer-card">
      <div>
        <span className="timer-label">Focus Session</span>
        <div className="timer-display">
          {minutes}:{seconds}
        </div>
      </div>
      <div className="timer-controls">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="timer-btn primary"
        >
          {isRunning ? 'Pause' : 'Start Focus'}
        </button>
        <button onClick={handleReset} className="timer-btn secondary">
          Reset
        </button>
      </div>
    </div>
  );
}

export default StudyTimer;