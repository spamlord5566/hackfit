import React from 'react';
import { Link } from 'react-router-dom';

export default function Understand() {
  return (
    <div className="page page-understand">
      <header className="hero">
        <h1>HACKFIT 4.0</h1>
        <p className="subtitle">36 HOUR NATIONAL LEVEL HACKATHON</p>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <h3>PRIZE POOL</h3>
          <p>₹ 60,000</p>
        </article>

        <article className="stat-card">
          <h3>MARK THE DATES</h3>
          <p>6 . 7 . 8</p>
          <span>MARCH</span>
        </article>

        <article className="stat-card">
          <h3>TEAM POSSE</h3>
          <p>2 - 4 MEMBERS</p>
        </article>
      </div>

      <div className="narrative">
        <h2>Build, Pitch, and Win!</h2>
        <p>
          A creative platform for college enthusiasts. Develop ideas, collaborate in teams, and present your best solution.
          This interface is designed to follow a modern gradient style with an engaging, responsive route flow.
        </p>
      </div>

      <div className="cta-row">
        <Link className="btn primary" to="/team-login">
          TEAM LOGIN
        </Link>
        <Link className="btn secondary" to="/dashboard" state={{ mode: 'dashboard' }}>
          EXPLORE DASHBOARD
        </Link>
      </div>
    </div>
  );
}
