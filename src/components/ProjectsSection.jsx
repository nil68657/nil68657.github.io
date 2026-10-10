import { OSS_CONTRIBUTIONS, PROFILE, PROJECTS } from '../data/portfolio'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  )
}

export function ProjectsSection() {
  const allPrs = OSS_CONTRIBUTIONS.flatMap((group) => group.prs)
  const mergedCount = allPrs.filter((pr) => pr.state === 'merged').length
  const openCount = allPrs.filter((pr) => pr.state === 'open').length
  const closedCount = allPrs.filter((pr) => pr.state === 'closed').length

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="section-shell">
        <div className="section-heading section-heading-split fade-up">
          <div>
            <p className="section-kicker">Pinned on GitHub / Open source</p>
            <h2 id="projects-heading">Projects built for real use.</h2>
          </div>
          <a className="text-link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            Explore GitHub
            <ArrowUpRight />
          </a>
        </div>

        <div className="project-list">
          {PROJECTS.map((project) => (
            <article className="project-row fade-up" key={project.title}>
              <span className="project-index">{project.index}</span>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              {project.href ? (
                <a
                  className="project-action"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ArrowUpRight />
                </a>
              ) : (
                <span className="project-action project-action-muted" aria-hidden>
                  —
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="oss-block fade-up" aria-labelledby="oss-heading">
          <div className="oss-heading">
            <p className="section-kicker">Upstream open source</p>
            <h3 id="oss-heading">Fixes sent to DuckDB, DuckLake, pg_duckdb, and Ibis.</h3>
            <p className="oss-summary">
              {mergedCount} merged, {openCount} open
              {closedCount > 0 ? `, ${closedCount} closed` : ''} across {OSS_CONTRIBUTIONS.length}{' '}
              repositories.
            </p>
          </div>
          <div className="oss-repos">
            {OSS_CONTRIBUTIONS.map((group) => (
              <article className="oss-repo" key={group.repo}>
                <h4>
                  <a href={`https://github.com/${group.repo}`} target="_blank" rel="noopener noreferrer">
                    {group.repo}
                  </a>
                </h4>
                <p>{group.description}</p>
                <ul>
                  {group.prs.map((pr) => (
                    <li key={pr.number}>
                      <a
                        href={`https://github.com/${group.repo}/pull/${pr.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={`oss-state oss-state-${pr.state}`}>{pr.state}</span>
                        <span className="oss-number">#{pr.number}</span>
                        <span className="oss-title">{pr.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
