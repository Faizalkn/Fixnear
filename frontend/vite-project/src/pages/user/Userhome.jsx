


import React from "react";
import { NavLink } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const issues = [
  {
    id: "FN001",
    title: "Broken Streetlight",
    category: "Electricity",
    location: "Kochi, Kerala",
    date: "24 Nov 2026",
    status: "Pending",
  },
  {
    id: "FN002",
    title: "Garbage Accumulation",
    category: "Waste Management",
    location: "Edappally, Kochi",
    date: "23 Nov 2026",
    status: "In Progress",
  },
  {
    id: "FN003",
    title: "Road Damage",
    category: "Road Maintenance",
    location: "Kalamassery, Kochi",
    date: "21 Nov 2026",
    status: "Resolved",
  },
  {
    id: "FN004",
    title: "Water Leakage",
    category: "Water Supply",
    location: "Palarivattom, Kochi",
    date: "20 Nov 2026",
    status: "Pending",
  },
];

const Userhome = () => {
  const totalIssues = issues.length;
  const pending = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;
  const inProgress = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;
  const resolved = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const stats = [
    {
      title: "Total Issues",
      count: totalIssues,
      color: "blue",
      icon: "▤",
    },
    {
      title: "Pending",
      count: pending,
      color: "orange",
      icon: "◷",
    },
    {
      title: "In Progress",
      count: inProgress,
      color: "purple",
      icon: "↻",
    },
    {
      title: "Resolved",
      count: resolved,
      color: "green",
      icon: "✓",
    },
  ];

  return (
    <div className="dashboard-container">
      <UserSidebar />

      {/* Main Content */}
      <main className="main-content">

        {/* Top Header */}
        <header className="top-header">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome back! Here's what's happening in your community.</p>
          </div>

          <div className="header-right">
            <button className="notification-btn">♧</button>
            <div className="user-info">
              <div className="avatar">F</div>
              <div>
                <h4>Faizal</h4>
                <p>Citizen</p>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="welcome-section">
          <div>
            <h1>Making Our Community Better!</h1>
            <p>
              Report local problems and help make your
              neighbourhood a better place to live.
            </p>
            <NavLink to="/report-issue" className="report-btn">
              + Report an Issue
            </NavLink>
          </div>
          <div className="welcome-decoration">⌖</div>
        </section>

        {/* Statistics */}
        <section className="stats-section">
          <div className="section-heading">
            <h3>Issue Overview</h3>
            <p>Summary of reported community issues</p>
          </div>

          <div className="stats-grid">
            {stats.map((item) => (
              <div className="stat-card" key={item.title}>
                <div className={`stat-icon ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p>{item.title}</p>
                  <h2>{item.count}</h2>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reported Issues */}
        <section className="issues-section">

          <div className="issues-heading">
            <div>
              <h3>Reported Issues</h3>
              <p>Recently reported issues in your community</p>
            </div>

            <NavLink to="/my-issues" className="view-all">
              View All →
            </NavLink>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Issue Details</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Reported Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>
                      <div className="issue-title">
                        <strong>{issue.title}</strong>
                        <span>{issue.id}</span>
                      </div>
                    </td>

                    <td>{issue.category}</td>

                    <td>{issue.location}</td>

                    <td>{issue.date}</td>

                    <td>
                      <span
                        className={`status-badge ${issue.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
};

export default Userhome;
