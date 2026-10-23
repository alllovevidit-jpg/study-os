import { useState, useEffect } from 'react';
import StudyTimer from './StudyTimer';
import StudyStats from './StudyStats';
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
  const [newTaskSubject, setNewTaskSubject] = useState('Web Dev');
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

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  }

  function handleToggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
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

  // Helper to get color class for subject tags
  function getSubjectClass(subject) {
    return `tag-${subject.toLowerCase().replace(/\s+/g, '-')}`;
  }

  return (
    <div className="app-wrapper">
      {/* Top Navbar */}
      <header className="top-nav">
        <div className="brand">
          <div className="brand-logo">⚡</div>
          <div>
            <h1>StudyOS</h1>
            <p className="subtitle">Personal Command Center & Focus Workspace</p>
          </div>
        </div>
        <div className="header-badges">
          <span className="live-dot"></span>
          <span className="stats-badge">
            {completedCount} of {tasks.length} Tasks Done
          </span>
        </div>
      </header>

      {/* Main Two-Column Bento Grid */}
      <main className="dashboard-grid">
        {/* Left Column: Focus Timer & Analytics */}
        <aside className="left-panel">
          <StudyTimer />
          <StudyStats tasks={tasks} />
        </aside>

        {/* Right Column: Interactive Task Workspace */}
        <section className="right-panel">
          <div className="panel-card">
            <div className="panel-header">
              <h2>Action Items</h2>
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
                  Active ({tasks.length - completedCount})
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Done ({completedCount})
                </button>
              </div>
            </div>

            {/* Add Task Bar */}
            <form className="task-form" onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="What are we conquering next?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="task-input"
              />
              <select
                value={newTaskSubject}
                onChange={(e) => setNewTaskSubject(e.target.value)}
                className="subject-select"
              >
                <option value="Web Dev">💻 Web Dev</option>
                <option value="Math">📐 Math</option>
                <option value="Science">🔬 Science</option>
                <option value="Literature">📚 Literature</option>
                <option value="General">📌 General</option>
              </select>
              <button type="submit" className="add-btn">
                + Add Task
              </button>
            </form>

            {/* Search & Subject Filter Toolbar */}
            <div className="toolbar">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Filter tasks by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="subject-select filter-select"
              >
                <option value="All">All Subjects</option>
                <option value="Web Dev">Web Dev</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Literature">Literature</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Task List */}
            <ul className="task-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✨</div>
                  <p>No tasks match your filter. Time to add a new goal or take a run!</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className={`task-item ${task.completed ? 'done' : ''}`}
                  >
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                      />
                      <span className="custom-checkbox"></span>
                      <span className="task-title">{task.title}</span>
                    </label>
                    <div className="task-actions">
                      <span className={`subject-tag ${getSubjectClass(task.subject)}`}>
                        {task.subject}
                      </span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="delete-btn"
                        title="Delete task"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;