
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./MyIssues.css";

// Sample issues - replace with API data later
const issues = [
    {
      _id: "1",
      title: "Large Pothole near Central Park",
      issueId: "FN2024-0012",
      category: "Pothole",
      date: "12 Aug 2024",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300",
    },
    {
      _id: "2",
      title: "Broken Streetlight",
      issueId: "FN2024-0011",
      category: "Streetlight",
      date: "10 Aug 2024",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300",
    },
    {
      _id: "3",
      title: "Garbage Accumulation",
      issueId: "FN2024-0010",
      category: "Garbage",
      date: "05 Aug 2024",
      status: "Resolved",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300",
    },
    {
      _id: "4",
      title: "Water Leakage on MG Road",
      issueId: "FN2024-0009",
      category: "Water Leakage",
      date: "01 Aug 2024",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=300",
    },
    {
      _id: "5",
      title: "Damaged Road near Junction",
      issueId: "FN2024-0008",
      category: "Damaged Roads",
      date: "28 Jul 2024",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300",
    },
    {
      _id: "6",
      title: "Blocked Drainage",
      issueId: "FN2024-0007",
      category: "Drainage",
      date: "25 Jul 2024",
      status: "Resolved",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300",
    },
];

const MyIssues = () => {

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  // Count issues based on status
  const counts = {
    All: issues.length,
    Pending: issues.filter(
      (issue) => issue.status === "Pending"
    ).length,
    "In Progress": issues.filter(
      (issue) => issue.status === "In Progress"
    ).length,
    Resolved: issues.filter(
      (issue) => issue.status === "Resolved"
    ).length,
  };

  // Filter issues by tab and search
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {

      const matchesTab =
        activeTab === "All" || issue.status === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch =
        issue.title.toLowerCase().includes(searchText) ||
        issue.issueId.toLowerCase().includes(searchText) ||
        issue.category.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  // Status class
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "In Progress":
        return "status-progress";

      case "Resolved":
        return "status-resolved";

      default:
        return "";
    }
  };

  // View issue
  const handleViewIssue = (issue) => {
    // Replace with your issue details route
    console.log("Selected issue:", issue);

    // Example:
    // navigate(`/issue/${issue._id}`);
  };

  const tabs = [
    "All",
    "Pending",
    "In Progress",
    "Resolved",
  ];

  return (
    <div className="dashboard-container">
      <UserSidebar />
      <main className="main-content">
        <header className="top-header">
          <div>
            <h2>My Issues</h2>
            <p>Track and manage the issues reported by you.</p>
          </div>

          <div className="header-right">
            <Link to="/report-issue" className="new-issue-btn">
              + Report New Issue
            </Link>
            <div className="user-info">
              <div className="avatar">F</div>
              <div>
                <h4>Faizal</h4>
                <p>Citizen</p>
              </div>
            </div>
          </div>
        </header>

      {/* Summary Cards */}
      <div className="my-issues-page">
      <div className="issue-summary">

        <div className="summary-card">
          <div className="summary-icon all-icon">
            <i className="fa-solid fa-file-lines"></i>
          </div>
          <div>
            <h3>{counts.All}</h3>
            <p>Total Issues</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon pending-icon">
            <i className="fa-regular fa-clock"></i>
          </div>
          <div>
            <h3>{counts.Pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon progress-icon">
            <i className="fa-solid fa-spinner"></i>
          </div>
          <div>
            <h3>{counts["In Progress"]}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon resolved-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <h3>{counts.Resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

      </div>

      {/* Issues Container */}
      <div className="issues-container">

        <div className="issues-topbar">

          <div>
            <h3>My Reported Issues</h3>
            <p>View and track your reported problems</p>
          </div>

          {/* Search */}
          <div className="issue-search">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

        </div>

        {/* Tabs */}
        <div className="issue-tabs">

          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`issue-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span>{counts[tab]}</span>
            </button>
          ))}

        </div>

        {/* Issues List */}
        <div className="issues-list">

          {filteredIssues.length > 0 ? (

            filteredIssues.map((issue) => (

              <div className="issue-item" key={issue._id}>

                {/* Issue Image */}
                <div className="issue-image">
                  <img
                    src={issue.image}
                    alt={issue.title}
                  />
                </div>

                {/* Issue Details */}
                <div className="issue-info">
                  <h4>{issue.title}</h4>

                  <div className="issue-meta">
                    <span>{issue.issueId}</span>
                    <span className="meta-dot">•</span>
                    <span>{issue.category}</span>
                    <span className="meta-dot">•</span>
                    <span>{issue.date}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="issue-status">
                  <span className={getStatusClass(issue.status)}>
                    {issue.status}
                  </span>
                </div>

                {/* View Button */}
                <button
                  type="button"
                  className="view-issue-btn"
                  onClick={() => handleViewIssue(issue)}
                >
                  View
                </button>

              </div>

            ))

          ) : (

            <div className="no-issues">
              <i className="fa-regular fa-folder-open"></i>
              <h3>No issues found</h3>
              <p>
                {search
                  ? "Try searching with a different keyword."
                  : `You have no ${activeTab.toLowerCase()} issues.`}
              </p>
            </div>

          )}

        </div>

        {/* Footer */}
        <div className="issues-footer">
          Showing {filteredIssues.length} of {issues.length} issues
        </div>

      </div>
      </div>
        </main>
    </div>
  );
};

export default MyIssues;
