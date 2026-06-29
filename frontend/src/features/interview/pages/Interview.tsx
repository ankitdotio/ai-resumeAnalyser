const Interview = () => {
  const { report } = useInterview();

  return (
    <main className="interview">
      <aside className="left">
        <button>Technical Questions</button>
        <button>Behavioral Questions</button>
        <button>Roadmap</button>
      </aside>

      <section className="center">
        <h2>Interview Report</h2>

        <div className="match">
          <h3>Match Score</h3>
          <span>{report.matchScore}%</span>
        </div>

        <div className="content">
          <p>Select a section from the left sidebar.</p>
        </div>
      </section>

      <aside className="right">
        <h3>Skill Gaps</h3>

        <div className="chips">
          {report.skillGaps.map((gap) => (
            <span key={gap.skill} className="chip">
              {gap.skill}
            </span>
          ))}
        </div>
      </aside>
    </main>

  );
};

export default Interview;