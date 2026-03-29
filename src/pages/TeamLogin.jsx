import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeamLogin() {
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamId.trim() && password.trim()) {
      navigate('/dashboard', { state: { mode: 'setup' } });
    }
  };

  return (
    <div className="page page-team-login">
      <div className="login-center-wrap">
        <div className="login-card">
          <h2 className="login-title">Team Login</h2>
          <p className="login-subtitle">Enter your team credentials to access your HackFit dashboard.</p>

          <form onSubmit={handleSubmit} className="team-login-form">
            <label>
              Team ID (Gmail)
              <input
                type="email"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="e.g. yourteam@gmail.com"
                pattern=".*@gmail\.com$"
                title="Please enter a valid @gmail.com address"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="First 4 digits of phone"
                pattern="\d{4}"
                maxLength="4"
                title="Must be exactly 4 digits"
                required
              />
            </label>

            <button type="submit" className="btn primary" style={{ marginTop: '0.5rem' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
