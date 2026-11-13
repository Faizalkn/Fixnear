
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Register.css";

const initialData = {
  name: "",
  address: "",
  state: "",
  district: "",
  village: "",
  city: "",
  pincode: "",
  profilepic: null,
  idproof: null,
  phone: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Clean up the profile preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (!file) return;

      const allowedTypes = {
        profilepic: ["image/jpeg", "image/png", "image/webp"],
        idproof: ["image/jpeg", "image/png", "application/pdf"],
      };

      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes[name]?.includes(file.type)) {
        setError(
          name === "profilepic"
            ? "Profile picture must be JPG, PNG or WEBP."
            : "Identity proof must be PDF, JPG or PNG."
        );
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        setError("File size must not exceed 5 MB.");
        e.target.value = "";
        return;
      }

      setError("");

      if (name === "profilepic") {
        setPreview(URL.createObjectURL(file));
      }

      setData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const removeFile = (name) => {
    setData((prev) => ({
      ...prev,
      [name]: null,
    }));

    if (name === "profilepic") {
      setPreview(null);
    }

    const input = document.querySelector(`input[name="${name}"]`);
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!data.profilepic || !data.idproof) {
      setError("Please upload both profile picture and identity proof.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      const res = await axios.post(
        "http://localhost:5000/api/reg",
        formData
      );

      setSuccess(res.data.message || "Registration successful!");

      setData(initialData);
      setPreview(null);
      e.target.reset();

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);

      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">

      {/* NAVBAR */}
      <nav className="reg-navbar">
        <div className="brand">
          <span className="brand-icon">F</span>
          <span>
            Fix<span className="brand-highlight">near</span>
          </span>
        </div>

        <span className="nav-text">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </nav>

      <main className="reg-main">

        <p className="employee-registration-link">
          Government employee? <Link to="/govempreg">Register here</Link>
        </p>

        {/* PAGE HEADING */}
        <div className="reg-heading">
          <span className="eyebrow">JOIN FIXNEAR</span>
          <h1>Create Your Account</h1>
          <p>
            Register to report local issues and help improve your community.
          </p>
        </div>

        <form className="reg-card" onSubmit={handleSubmit}>

          {/* CARD HEADING */}
          <div className="card-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Enter your details to get started.</p>
            </div>
            <span className="required-note">* Required fields</span>
          </div>

          {error && <div className="alert error-alert">{error}</div>}
          {success && <div className="alert success-alert">{success}</div>}

          {/* BASIC DETAILS */}
          <section className="reg-section">
            <h3>
              <span className="section-number">01</span>
              Basic Details
            </h3>

            <div className="reg-grid">

              <div className="reg-field">
                <label>Full Name <span>*</span></label>
                <input
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="reg-field">
                <label>Phone Number <span>*</span></label>
                <input
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  pattern="[6-9][0-9]{9}"
                  maxLength="10"
                  required
                />
              </div>

              <div className="reg-field full-width">
                <label>Email Address <span>*</span></label>
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="reg-field full-width">
                <label>Password <span>*</span></label>

                <div className="password-wrapper">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    minLength="8"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <small>Use at least 8 characters.</small>
              </div>

            </div>
          </section>

          {/* ADDRESS DETAILS */}
          <section className="reg-section">
            <h3>
              <span className="section-number">02</span>
              Address Details
            </h3>

            <div className="reg-grid">

              <div className="reg-field full-width">
                <label>Complete Address <span>*</span></label>
                <textarea
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                  placeholder="House number, street, locality..."
                  rows="3"
                  required
                />
              </div>

              {[
                ["state", "State", "Enter state"],
                ["district", "District", "Enter district"],
                ["city", "City", "Enter city"],
                ["village", "Village", "Enter village"],
                ["pincode", "Pincode", "6-digit pincode"],
              ].map(([name, label, placeholder]) => (
                <div className="reg-field" key={name}>
                  <label>{label} <span>*</span></label>
                  <input
                    name={name}
                    value={data[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    pattern={
                      name === "pincode" ? "[1-9][0-9]{5}" : undefined
                    }
                    maxLength={name === "pincode" ? 6 : undefined}
                    required
                  />
                </div>
              ))}

            </div>
          </section>

          {/* IDENTITY VERIFICATION */}
          <section className="reg-section">
            <h3>
              <span className="section-number">03</span>
              Identity Verification
            </h3>

            <div className="upload-grid">

              {/* PROFILE PICTURE */}
              <div className="upload-card">
                <div className="upload-title">
                  <div>
                    <h4>Profile Picture</h4>
                    <p>Upload your photograph</p>
                  </div>

                  <div className="profile-preview">
                    {preview ? (
                      <img src={preview} alt="Profile preview" />
                    ) : (
                      <span>+</span>
                    )}
                  </div>
                </div>

                <label className="file-button">
                  <span>
                    {data.profilepic ? "Change Photo" : "Choose Photo"}
                  </span>

                  <input
                    type="file"
                    name="profilepic"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleChange}
                    required
                    className="file-input"
                  />
                </label>

                {data.profilepic && (
                  <div className="file-success">
                    <div className="file-status">
                      <span>✓ Uploaded Successfully</span>
                      <button
                        type="button"
                        onClick={() => removeFile("profilepic")}
                      >
                        Remove
                      </button>
                    </div>
                    <p>{data.profilepic.name}</p>
                    <small>
                      {(data.profilepic.size / 1024).toFixed(1)} KB
                    </small>
                  </div>
                )}

                {!data.profilepic && (
                  <small>JPG, PNG or WEBP · Maximum 5 MB</small>
                )}
              </div>

              {/* IDENTITY PROOF */}
              <div className="upload-card">
                <div className="upload-title">
                  <div>
                    <h4>Identity Proof</h4>
                    <p>Upload a valid ID document</p>
                  </div>

                  <div className="document-icon">ID</div>
                </div>

                <label className="file-button">
                  <span>
                    {data.idproof ? "Change Document" : "Choose Document"}
                  </span>

                  <input
                    type="file"
                    name="idproof"
                    accept="image/png,image/jpeg,.pdf"
                    onChange={handleChange}
                    required
                    className="file-input"
                  />
                </label>

                {data.idproof && (
                  <div className="file-success" role="status" aria-live="polite">
                    <div className="file-status">
                      <span>✓ Identity proof selected</span>
                      <button
                        type="button"
                        onClick={() => removeFile("idproof")}
                      >
                        Remove
                      </button>
                    </div>

                    <p>{data.idproof.name}</p>

                    <small>
                      {(data.idproof.size / 1024).toFixed(1)} KB
                    </small>
                  </div>
                )}

                {!data.idproof && (
                  <small>No document selected · PDF, JPG or PNG · Maximum 5 MB</small>
                )}
              </div>

            </div>
          </section>

          {/* PRIVACY NOTE */}
          <div className="privacy-note">
            <span className="privacy-icon">i</span>
            <p>
              Your personal information and identity documents will be used
              for account verification. Keep your login credentials secure.
            </p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          <p className="terms-text">
            By registering, you agree to provide accurate information.
          </p>

        </form>

        <footer className="reg-footer">
          © 2026 Fixnear. Building better communities together.
        </footer>

      </main>
    </div>
  );
};

export default Register;
