import { useState } from 'react';
import './App.css';
import StudyTimer from './studytimer';

function App() {
  // 1. STATE: Holds our list of study tasks and what the user is typing
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review React State & Props', subject: 'Web Dev', completed: false },
    { id: 2, title: 'Solve 10 Trigonometry problems', subject: 'Math', completed: true },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('General');

  // 2. HANDLER: Adds a new task when the form is submitted
  function handleAddTask(e) {
    e.preventDefault(); // Stops the browser from refreshing the page
    if (!newTaskTitle.trim()) return; // Ignore empty submissions

    const newTask = {
      id: Date.now(), // Unique ID based on current timestamp
      title: newTaskTitle,
      subject: newTaskSubject,
      completed: false,
    };

    setTasks([...tasks, newTask]); // Creates a new array with the added task
    setNewTaskTitle(''); // Clears the text box
  }

  // 3. HANDLER: Flips a task's completed status between true and false
  function handleToggleTask(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  // 4. HANDLER: Deletes a task by filtering it out of the array
  function handleDeleteTask(taskId) {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(remainingTasks);
  }

  // 5. DERIVED DATA: Calculates progress automatically whenever `tasks` changes
  const completedCount = tasks.filter((task) => task.completed).length;

  // 6. UI (JSX): What actually gets rendered to the screen
  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>StudyOS</h1>
          <p className="subtitle">Personal Study Workspace & Task Tracker</p>
        </div>
        <div className="stats-badge">
          {completedCount} / {tasks.length} Completed
        </div>
      </header>
<StudyTimer />
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="What do you need to study today?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="task-input"
        />
        <select
          value={newTaskSubject}
          onChange={(e) => setNewTaskSubject(e.target.value)}
          className="subject-select"
        >
          <option value="General">General</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Literature">Literature</option>
        </select>
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
              />
              <span className="task-title">{task.title}</span>
              <span className="subject-tag">{task.subject}</span>
            </label>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;