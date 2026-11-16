const githubAccounts = ["felixoyeleke", "felixoyeleke10"] as const;

export function GitHubActivity() {
  return (
    <section className="hub-section github-activity" aria-labelledby="github-activity-title">
      <div className="hub-section-heading">
        <h2 className="hub-label" id="github-activity-title">
          GitHub activity
        </h2>
        <p>Combined contributions across both accounts.</p>
      </div>
      <div className="github-calendars">
        <div className="github-calendar" aria-label="Combined GitHub contribution calendar">
          <div className="github-calendar-stack">
            {githubAccounts.map((username) => (
              <img
                className="github-calendar-layer"
                src={`https://ghchart.rshah.org/${username}`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                key={username}
              />
            ))}
          </div>
          <span className="github-calendar-label">
            Combined activity {"·"} {githubAccounts.map((username, index) => (
              <span key={username}>
                {index > 0 && " + "}
                <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
                  @{username}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
