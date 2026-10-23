import { useState, useEffect } from 'react';

function StudyTimer() {
  const [mode, setMode] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  
  // Durations in seconds
  const TIMES = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const [secondsLeft, setSecondsLeft] = useState(TIMES.focus);
  const [isRunning, setIsRunning] = useState(false);

  // Play a soft beep sound using the Web Audio API when timer hits 0
  function playAlarm() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.6);
    } catch {
      // Fallback if audio context is restricted
    }
  }

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          playAlarm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  // Switch timer mode
  function handleModeChange(newMode) {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(TIMES[newMode]);
  }

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(TIMES[mode]);
  }

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="timer-card">
      <div>
        <div className="timer-mode-tabs">
          <button
            className={`mode-tab ${mode === 'focus' ? 'active' : ''}`}
            onClick={() => handleModeChange('focus')}
          >
            Focus
          </button>
          <button
            className={`mode-tab ${mode === 'shortBreak' ? 'active' : ''}`}
            onClick={() => handleModeChange('shortBreak')}
          >
            Short Break
          </button>
          <button
            className={`mode-tab ${mode === 'longBreak' ? 'active' : ''}`}
            onClick={() => handleModeChange('longBreak')}
          >
            Long Break
          </button>
        </div>
        <div className="timer-display">
          {minutes}:{seconds}
        </div>
      </div>
      <div className="timer-controls">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="timer-btn primary"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="timer-btn secondary">
          Reset
        </button>
      </div>
    </div>
  );
}

export default StudyTimer;