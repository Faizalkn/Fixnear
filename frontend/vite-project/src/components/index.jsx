import React from "react";
import { Link } from "react-router-dom";
import workerCartoon from "../assets/worker-cartoon.svg";
import "../index.css";

const issueTypes = [
  { title: "Potholes", icon: <path d="M4 17c2-1 3-1 5 0s3 1 5 0 3-1 6 0M5 12l2-4h10l2 4" /> },
  { title: "Streetlights", icon: <><path d="M12 3v3m-4 3a4 4 0 1 1 8 0c0 2-1.5 3-2 4h-4c-.5-1-2-2-2-4Zm2 9h4m-3 3h2" /><path d="M4 8 2.5 7m17 1L21 7" /></> },
  { title: "Garbage", icon: <><path d="M4 7h16M9 7V4h6v3m-9 0 1 13h10l1-13" /><path d="M10 11v5m4-5v5" /></> },
  { title: "Water leaks", icon: <><path d="M12 3S6.5 9.5 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.5 12 3 12 3Z" /><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2" /></> },
  { title: "Drainage", icon: <><path d="M4 7h16M4 12h16M4 17h16" /><path d="m8 5 2 4m4-4 2 4m-8 1 2 4m4-4 2 4m-8 1 2 4m4-4 2 4" /></> },
  { title: "Damaged roads", icon: <><path d="m7 21 3-18m7 18-3-18M12 5v3m0 4v3m0 4v1" /><path d="m9 12 2 1-1 2 2 1" /></> },
  { title: "Fallen trees", icon: <><path d="M12 20v-7m0 2-4-3m4 1 4-4" /><path d="M8 12a3 3 0 1 1 1-5.8A4 4 0 1 1 16 8a3 3 0 1 1 0 6" /></> },
  { title: "Other issues", icon: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></> },
];

const platformFeatures = [
  {
    title: "Report issues",
    description: "Share a photo, details and location of a local civic issue.",
    icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z" /></>,
  },
  {
    title: "Track progress",
    description: "Follow your report as it moves through each status update.",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  },
  {
    title: "Verify resolution",
    description: "Review updates and help confirm when an issue is resolved.",
    icon: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  },
  {
    title: "Build community",
    description: "Help citizens and local authorities focus on what matters.",
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  },
];

function BrandMark() {
  return (
    <>
      <span className="home-brand-mark" aria-hidden="true">F</span>
      <span>Fix<span className="home-brand-highlight">near</span></span>
    </>
  );
}

function Home() {
  return (
    <div className="home" id="home">
      <header className="home-header">
        <nav className="home-navbar" aria-label="Main navigation">
          <Link to="/" className="home-logo" aria-label="FixNear home">
            <BrandMark />
          </Link>

          <div className="home-nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#issue-types">Issue types</a>
            <a href="#how-it-works">How it works</a>
          </div>

          <div className="home-nav-actions">
            <Link to="/login" className="home-login">Login</Link>
            <Link to="/register" className="home-signup">Sign up</Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="home-hero" id="about">
          <div className="home-hero-copy">
            <span className="home-eyebrow">
              <span className="home-eyebrow-dot" />
              A civic platform for Kerala
            </span>
            <h1>Together for a Cleaner, Safer Community</h1>
            <p>
              Report local civic issues, track progress, and help verify
              resolutions. FixNear brings citizens and local authorities
              together to make neighbourhoods better.
            </p>
            <div className="home-hero-actions">
              <Link to="/register" className="home-primary-button">
                Report an issue <span aria-hidden="true">→</span>
              </Link>
              <a href="#issue-types" className="home-secondary-button">
                Explore common issues
              </a>
            </div>
            <div className="home-hero-note">
              <span aria-hidden="true">✓</span>
              For citizens and communities across Kerala
            </div>
          </div>

          <div className="home-hero-image">
            <img
              src={workerCartoon}
              alt="Two cheerful construction workers beside a roadwork barrier"
            />
            <div className="home-image-overlay" />
            <div className="home-location-card">
              <span className="home-location-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                  <circle cx="12" cy="10" r="2.3" />
                </svg>
              </span>
              <span><strong>Every neighbourhood counts</strong><small>Kerala, India</small></span>
            </div>
            <div className="home-image-caption">
              <span>Notice it. Report it. Help fix it.</span>
            </div>
          </div>
        </section>

        <section className="home-feature-strip" aria-label="What you can do with FixNear">
          {platformFeatures.map((feature) => (
            <article className="home-feature" key={feature.title}>
              <span className="home-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">{feature.icon}</svg>
              </span>
              <span className="home-feature-text">
                <strong>{feature.title}</strong>
                <small>{feature.description}</small>
              </span>
            </article>
          ))}
        </section>

        <section className="home-issues" id="issue-types">
          <div className="home-section-heading">
            <span className="home-section-kicker">MAKE YOUR REPORT COUNT</span>
            <h2>Common issues we help solve</h2>
            <p>
              From roads to streetlights, bring everyday civic concerns to the
              attention of your community.
            </p>
          </div>
          <div className="home-issue-grid">
            {issueTypes.map((issue) => (
              <article className="home-issue-card" key={issue.title}>
                <span className="home-issue-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">{issue.icon}</svg>
                </span>
                <h3>{issue.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="home-how" id="how-it-works">
          <div className="home-section-heading">
            <span className="home-section-kicker">A CLEAR PATH FORWARD</span>
            <h2>One report can start a real change.</h2>
            <p>Raise an issue, follow its progress, and help verify the outcome.</p>
          </div>
          <div className="home-steps">
            <article className="home-step">
              <span className="home-step-number">01</span>
              <h3>Report the issue</h3>
              <p>Add a description, photo and location so the issue is easy to understand.</p>
            </article>
            <article className="home-step">
              <span className="home-step-number">02</span>
              <h3>Track updates</h3>
              <p>Keep up with the report status as it is reviewed and addressed.</p>
            </article>
            <article className="home-step">
              <span className="home-step-number">03</span>
              <h3>Verify the fix</h3>
              <p>Help confirm progress and resolution for a more accountable process.</p>
            </article>
          </div>
        </section>

        <section className="home-cta">
          <div>
            <span className="home-section-kicker">YOUR COMMUNITY, YOUR VOICE</span>
            <h2>See something that needs attention?</h2>
            <p>Create an account and help make your neighbourhood safer and cleaner.</p>
          </div>
          <Link to="/register" className="home-cta-button">
            Get started <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <Link to="/" className="home-logo">
          <BrandMark />
        </Link>
        <p>Report. Track. Verify. Build better communities.</p>
        <div className="home-footer-links">
          <a href="#about">About</a>
          <a href="#issue-types">Common issues</a>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
        </div>
        <span className="home-copyright">© 2026 FixNear · Made for Kerala, India</span>
      </footer>
    </div>
  );
}

export default Home;
