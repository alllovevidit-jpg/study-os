import './StudyStats.css';

function StudyStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const subjects = ['Web Dev', 'Math', 'Science', 'Literature', 'General'];

  const subjectStats = subjects.map((subj) => {
    const subjTasks = tasks.filter((t) => t.subject === subj);
    const subjCompleted = subjTasks.filter((t) => t.completed).length;
    const pct =
      subjTasks.length > 0
        ? Math.round((subjCompleted / subjTasks.length) * 100)
        : 0;
    return {
      subject: subj,
      total: subjTasks.length,
      completed: subjCompleted,
      pct,
    };
  });

  return (
    <div className="stats-dashboard">
      <div className="stats-main-card">
        <div className="stats-top-row">
          <div>
            <span className="stats-label">📊 Daily Completion</span>
            <div className="stats-big-number">{completionRate}%</div>
          </div>
          <div className="stats-fraction">
            <span>{completedTasks}</span> / {totalTasks} Done
          </div>
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
            <div className="stat-card-top">
              <span className="stat-subj-name">{stat.subject}</span>
              <span className="stat-subj-count">
                {stat.completed}/{stat.total}
              </span>
            </div>
            <div className="mini-progress-track">
              <div
                className="mini-progress-fill"
                style={{ width: `${stat.pct}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyStats;