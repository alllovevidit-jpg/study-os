import './StudyStats.css';

function StudyStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate breakdown per subject dynamically
  const subjects = ['General', 'Web Dev', 'Math', 'Science', 'Literature'];
  
  const subjectStats = subjects.map((subj) => {
    const subjTasks = tasks.filter((t) => t.subject === subj);
    const subjCompleted = subjTasks.filter((t) => t.completed).length;
    return {
      subject: subj,
      total: subjTasks.length,
      completed: subjCompleted,
    };
  });

  return (
    <div className="stats-dashboard">
      <div className="stats-main-card">
        <div>
          <span className="stats-label">Overall Progress</span>
          <div className="stats-big-number">{completionRate}%</div>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="subject-stats-grid">
        {subjectStats.map((stat) => (
          <div key={stat.subject} className="subject-stat-card">
            <span className="stat-subj-name">{stat.subject}</span>
            <span className="stat-subj-count">
              {stat.completed} / {stat.total} done
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyStats;