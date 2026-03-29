import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PROBLEMS = [
  {
    title: "Smart Health Tracker for Urban Cyclists",
    description: "Design a wearable or app-based solution that monitors real-time health metrics like heart rate, hydration, and fatigue for urban cyclists. The system should provide personalized alerts, route safety tips, and post-ride recovery insights to help cyclists stay healthy and safe in busy city environments."
  },
  {
    title: "AI-Powered Financial Advisor for Gen Z",
    description: "Build an intelligent financial assistant tailored for Gen Z users that analyzes spending habits, suggests savings goals, and offers investment guidance. The solution should use conversational AI to simplify complex financial concepts, promote healthy money habits, and help young adults make smarter financial decisions."
  },
  {
    title: "Sustainable Packaging Solutions for E-Commerce",
    description: "Create a platform or tool that helps e-commerce businesses identify, evaluate, and switch to eco-friendly packaging alternatives. The system should track carbon footprint reduction, compare supplier options, and suggest packaging optimizations based on product type, size, and shipping distance to encourage greener logistics."
  }
];

export default function Dashboard() {
  const location = useLocation();
  const initialMode = location.state?.mode === 'dashboard' ? 'dashboard' : 'setup';

  const [viewMode, setViewMode] = useState(initialMode);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [teamName, setTeamName] = useState('');

  const [members, setMembers] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex.j@gmail.com', institution: 'MIT', role: 'Member' }
  ]);
  const [memberForm, setMemberForm] = useState({ id: null, name: '', email: '', institution: '', role: '' });
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [teamLeadError, setTeamLeadError] = useState('');

  const hasTeamLead = members.some(m => m.role === 'Team Lead');

  const handleMemberChange = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
    if (e.target.name === 'role') setTeamLeadError('');
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    // Block second Team Lead
    if (memberForm.role === 'Team Lead') {
      const existingLead = members.find(m => m.role === 'Team Lead');
      if (existingLead && existingLead.id !== memberForm.id) {
        setTeamLeadError('⚠️ There can only be one Team Lead. Please change the existing lead first.');
        return;
      }
    }
    setTeamLeadError('');
    if (isEditingMember) {
      setMembers(members.map(m => (m.id === memberForm.id ? memberForm : m)));
      setIsEditingMember(false);
    } else {
      setMembers([...members, { ...memberForm, id: Date.now() }]);
    }
    setMemberForm({ id: null, name: '', email: '', institution: '', role: '' });
  };

  const editMember = (member) => {
    setMemberForm(member);
    setIsEditingMember(true);
  };

  const deleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  // ── SETUP VIEW ──────────────────────────────────────────────
  if (viewMode === 'setup') {
    const selected = PROBLEMS[selectedIdx];
    return (
      <div className="page page-dashboard">
        <header>
          <h2>Team Setup</h2>
          <p>Configure your hackathon details before entering the dashboard.</p>
        </header>

        {/* Step 0 – Team Name */}
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '0.8rem', color: '#aeb9ff' }}>1. Enter Team Name</h3>
          <div style={{ background: 'rgba(17,25,53,0.82)', padding: '1.2rem 1.5rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Team Nexus"
              maxLength={40}
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(126,75,255,0.45)', background: 'rgba(10,15,45,0.8)', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </section>

        {/* Step 2 – Problem Statement */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#aeb9ff' }}>2. Choose &amp; Lock Problem Statement</h3>
          <div style={{ background: 'rgba(17,25,53,0.82)', padding: '1.5rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)' }}>
            {!isLocked ? (
              <>
                <p style={{ marginBottom: '0.8rem', color: '#ccc', fontSize: '0.9rem' }}>Select your problem statement:</p>
                <select
                  value={selectedIdx}
                  onChange={(e) => setSelectedIdx(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(20,30,64,0.9)', color: '#fff', outline: 'none' }}
                >
                  {PROBLEMS.map((p, i) => (
                    <option key={i} value={i}>{p.title}</option>
                  ))}
                </select>

                {/* Description box */}
                <div style={{ background: 'rgba(126,75,255,0.1)', border: '1px solid rgba(126,75,255,0.3)', borderRadius: '10px', padding: '1rem', marginBottom: '1.2rem' }}>
                  <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.65', color: '#dde5ff' }}>
                    <span style={{ fontWeight: 700, color: '#a78bfa', marginRight: '0.4rem' }}>About:</span>
                    {selected.description}
                  </p>
                </div>

                <button onClick={() => setIsLocked(true)} className="btn primary">
                  Lock In Statement
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'inline-block', marginBottom: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.75rem', backgroundColor: '#10b981', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>Locked In ✓</span>
                  <p style={{ fontWeight: 600, color: '#3b82f6', fontSize: '1.05rem', margin: '0 0 0.6rem' }}>{selected.title}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.6', color: '#c8cffd' }}>{selected.description}</p>
                </div>
                <button onClick={() => setIsLocked(false)} className="btn secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                  Unlock &amp; Change
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Step 2 – Team Members */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#aeb9ff' }}>2. Manage Team Members</h3>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem', background: 'rgba(17,25,53,0.82)', padding: '1.2rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '560px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                  {['Name', 'Gmail', 'Institution', 'Role', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.9rem 0.75rem', color: '#aeb9ff', fontSize: '0.85rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map(member => (
                  <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.9rem 0.75rem' }}>{member.name}</td>
                    <td style={{ padding: '0.9rem 0.75rem', color: '#dde5ff' }}>{member.email}</td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>{member.institution}</td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>{member.role}</td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <button onClick={() => editMember(member)} className="btn secondary" style={{ marginRight: '0.4rem', padding: '0.3rem 0.6rem', fontSize: '0.78rem', minWidth: 'auto' }}>Edit</button>
                      <button onClick={() => deleteMember(member.id)} className="btn secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', minWidth: 'auto', background: 'rgba(239,68,68,0.15)', color: '#ff6b6b', borderColor: 'rgba(239,68,68,0.3)' }}>Delete</button>
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No members yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <form onSubmit={handleMemberSubmit} style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '18px', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ gridColumn: '1/-1', margin: '0 0 0.3rem', color: '#e1e7ff' }}>{isEditingMember ? '✏️ Edit Member' : '➕ Add Member'}</h4>

            {[['text','name','Full Name'],['email','email','Gmail Address'],['text','institution','Institution']].map(([type, name, label]) => (
              <label key={name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: '#c8cffd' }}>
                {label}
                <input type={type} name={name} value={memberForm[name]} onChange={handleMemberChange} required
                  {...(name === 'email' ? { pattern: '.*@gmail\\.com$', title: 'Must be @gmail.com' } : {})}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(20,30,64,0.6)', color: '#fff', outline: 'none' }} />
              </label>
            ))}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: '#c8cffd' }}>
              Role
              <select name="role" value={memberForm.role} onChange={handleMemberChange} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(20,30,64,0.9)', color: '#fff', outline: 'none' }}>
                <option value="" disabled>Select Role…</option>
                <option value="Member">Member</option>
                <option value="Team Lead" disabled={hasTeamLead && memberForm.role !== 'Team Lead'}>
                  Team Lead{hasTeamLead && memberForm.role !== 'Team Lead' ? ' (Already assigned)' : ''}
                </option>
              </select>
            </label>

            {teamLeadError && (
              <div style={{ gridColumn: '1/-1', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', padding: '0.6rem 1rem', color: '#ff6b6b', fontSize: '0.85rem' }}>
                {teamLeadError}
              </div>
            )}

            <div style={{ gridColumn: '1/-1', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn primary" style={{ minWidth: '140px' }}>{isEditingMember ? 'Update' : 'Add Member'}</button>
              {isEditingMember && (
                <button type="button" onClick={() => { setIsEditingMember(false); setMemberForm({ id: null, name: '', email: '', institution: '', role: '' }); }} className="btn secondary" style={{ minWidth: '110px' }}>Cancel</button>
              )}
            </div>
          </form>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          {isLocked && members.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '0.75rem 1.2rem', color: '#ff6b6b', fontSize: '0.9rem', boxShadow: '0 0 14px rgba(239,68,68,0.2)' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              Please add at least one team member before entering the dashboard.
            </div>
          )}
          <button
            onClick={() => setViewMode('dashboard')}
            className="btn primary"
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', opacity: (isLocked && members.length > 0) ? 1 : 0.5, cursor: (isLocked && members.length > 0) ? 'pointer' : 'not-allowed' }}
            disabled={!isLocked || members.length === 0}
          >
            {!isLocked ? 'Lock a Question to Continue' : members.length === 0 ? 'Add a Member to Continue' : 'Enter Dashboard 🚀'}
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD (READ-ONLY) ───────────────────────────────
  const lockedProblem = PROBLEMS[selectedIdx];
  return (
    <div className="page page-dashboard">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          {teamName && (
            <p style={{ margin: '0 0 0.2rem', fontSize: '0.8rem', color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Team</p>
          )}
          <h2 style={{ margin: 0 }}>
            {teamName ? (
              <span style={{ color: '#fff', textShadow: '0 0 18px rgba(126,75,255,0.8), 0 0 35px rgba(126,75,255,0.4)' }}>{teamName}</span>
            ) : 'Team Dashboard'}
          </h2>
          <p style={{ margin: '0.3rem 0 0', color: '#c8cffd' }}>Welcome back! Your team page is live.</p>
        </div>
        <button onClick={() => setViewMode('setup')} className="btn secondary" style={{ fontSize: '0.88rem' }}>
          ⚙️ Edit Team Settings
        </button>
      </header>

      {/* Problem Statement – full width */}
      <section style={{ marginBottom: '2rem' }}>
        <article className="dashboard-card" style={{ maxWidth: '100%' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Problem Statement
            <span style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem', backgroundColor: '#10b981', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>LOCKED</span>
          </h3>
          <p style={{ fontWeight: 600, color: '#3b82f6', lineHeight: '1.4', marginTop: '0.5rem', fontSize: '1.1rem' }}>{lockedProblem.title}</p>
          <p style={{ marginTop: '0.7rem', fontSize: '0.92rem', lineHeight: '1.7', color: '#c8cffd' }}>{lockedProblem.description}</p>
        </article>
      </section>

      {/* Team Roster – read only */}
      <section style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1.2rem', color: '#aeb9ff' }}>Team Roster</h3>
        <div style={{ overflowX: 'auto', background: 'rgba(17,25,53,0.82)', padding: '1.2rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '560px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                {['Name', 'Gmail', 'Institution', 'Role'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 0.75rem', color: '#aeb9ff', fontSize: '0.85rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '0.9rem 0.75rem' }}>{m.name}</td>
                  <td style={{ padding: '0.9rem 0.75rem', color: '#dde5ff' }}>{m.email}</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>{m.institution}</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>{m.role}</td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No team members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="cta-row" style={{ marginTop: '3rem' }}>
        <Link className="btn secondary" to="/understand">Logout / Back to Event Info</Link>
      </div>
    </div>
  );
}
