import { useState, useEffect } from 'react';
import StudyTimer from './StudyTimer';
import './App.css';

const DEFAULT_TASKS = [
  { id: 1, title: 'Review React State & Props', subject: 'Web Dev', completed: false },
  { id: 2, title: 'Solve 10 Trigonometry problems', subject: 'Math', completed: true },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('studyos_tasks');
    return savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS;
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('General');
  
  // NEW STATES
  const [filter, setFilter] = useState('all'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('studyos_tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      subject: newTaskSubject,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTask(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskId) {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(remainingTasks);
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  
  const filteredTasks = tasks.filter((task) => {
    const matchesTab = 
      filter === 'active' ? !task.completed :
      filter === 'completed' ? task.completed : true;

    const matchesSubject = 
      subjectFilter === 'All' ? true : task.subject === subjectFilter;

    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSubject && matchesSearch;
  });

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

      
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="subject-select"
        >
          <option value="All">All Subjects</option>
          <option value="General">General</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Literature">Literature</option>
        </select>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({tasks.filter((t) => !t.completed).length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-state">No matching tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
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
          ))
        )}
      </ul>
    </div>
  );
}

export default App;