
import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import "./Advertisements.css";

const advertisementRates = {
  7: 8999,
  15: 14999,
  30: 26999,
};

const Advertisements = () => {
  const [duration, setDuration] = useState("7");
  const [submissionNotice, setSubmissionNotice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    businessCategory: "",
    businessDescription: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    businessWebsite: "",
    businessAddress: "",
  });

  const [businessLogo, setBusinessLogo] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const advertisementPrice = advertisementRates[duration];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmissionNotice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("duration", duration);
    data.append("amount", advertisementPrice);

    if (businessLogo) {
      data.append("businessLogo", businessLogo);
    }

    if (bannerImage) {
      data.append("bannerImage", bannerImage);
    }

    // Connect this FormData to your backend API.
    console.log("Advertisement data:", [...data.entries()]);

    setIsSubmitted(true);
    setSubmissionNotice(
      "Advertisement submitted successfully for admin review. Payment will be available after approval."
    );
  };

  const handlePayment = () => {
    if (!isSubmitted) return;

    // Integrate Razorpay or another payment gateway here.
    alert("Payment gateway integration is required to accept payments.");
  };

  return (
    <div className="dashboard-container">
      <UserSidebar />

      <main className="main-content">
        <header className="top-header">
          <div>
            <h2>Advertise With Us</h2>
            <p>Promote your business to people in your local area.</p>
          </div>
        </header>

        <div className="advertisement-page">
          {/* Page Introduction */}
          <section className="advertisement-intro">
            <div>
              <span className="advertisement-kicker">
                FOR LOCAL BUSINESSES
              </span>

              <h1>Promote Your Business With FixNear</h1>

              <p>
                Reach nearby residents and help them discover your
                products and services through FixNear.
              </p>
            </div>

            <div className="advertisement-intro-icon">
              <i className="fa-solid fa-store"></i>
            </div>
          </section>

          <form
            className="advertisement-form"
            onSubmit={handleSubmit}
          >
            {/* Business Details */}
            <section className="advertisement-section">
              <div className="advertisement-section-heading">
                <span className="advertisement-step">01</span>

                <div>
                  <h2>Business Details</h2>
                  <p>Enter your business information.</p>
                </div>
              </div>

              <div className="advertisement-fields">
                <div className="advertisement-field">
                  <label htmlFor="businessName">
                    Business Name *
                  </label>

                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Enter business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="advertisement-field">
                  <label htmlFor="businessCategory">
                    Business Category *
                  </label>

                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Shopping & Retail">Shopping & Retail</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Education">Education</option>
                    <option value="Professional Services">
                      Professional Services
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="advertisement-field full-width">
                  <label htmlFor="businessDescription">
                    Business Description *
                  </label>

                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    rows="4"
                    maxLength="500"
                    placeholder="Describe your business and the services you provide..."
                    value={formData.businessDescription}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="advertisement-field">
                  <label htmlFor="contactPerson">
                    Contact Person *
                  </label>

                  <input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    placeholder="Enter contact person name"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="advertisement-field">
                  <label htmlFor="contactPhone">
                    Phone Number *
                  </label>

                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="advertisement-field">
                  <label htmlFor="contactEmail">
                    Email Address *
                  </label>

                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="advertisement-field">
                  <label htmlFor="businessWebsite">
                    Website Link
                  </label>

                  <input
                    id="businessWebsite"
                    name="businessWebsite"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={formData.businessWebsite}
                    onChange={handleChange}
                  />
                </div>

                <div className="advertisement-field full-width">
                  <label htmlFor="businessAddress">
                    Business Location *
                  </label>

                  <input
                    id="businessAddress"
                    name="businessAddress"
                    type="text"
                    placeholder="Enter area, city and address"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Advertisement Images */}
            <section className="advertisement-section">
              <div className="advertisement-section-heading">
                <span className="advertisement-step">02</span>

                <div>
                  <h2>Advertisement Images</h2>
                  <p>Upload your business logo and promotional banner.</p>
                </div>
              </div>

              <div className="advertisement-fields">
                <div className="advertisement-field">
                  <label htmlFor="businessLogo">
                    Business Logo
                  </label>

                  <input
                    id="businessLogo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) =>
                      setBusinessLogo(e.target.files[0] || null)
                    }
                  />

                  <small>PNG, JPG or WEBP</small>
                </div>

                <div className="advertisement-field">
                  <label htmlFor="bannerImage">
                    Advertisement Banner *
                  </label>

                  <input
                    id="bannerImage"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) =>
                      setBannerImage(e.target.files[0] || null)
                    }
                    required
                  />

                  <small>Use a clear promotional image.</small>
                </div>
              </div>
            </section>

            {/* Duration and Payment */}
            <section className="advertisement-section">
              <div className="advertisement-section-heading">
                <span className="advertisement-step">03</span>

                <div>
                  <h2>Advertisement Duration</h2>
                  <p>Choose how long your advertisement should run.</p>
                </div>
              </div>

              <div className="advertisement-fields">
                <div className="advertisement-field">
                  <label htmlFor="duration">
                    Select Duration *
                  </label>

                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="7">7 Days</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>

                <div className="advertisement-field">
                  <label>Advertisement Amount</label>

                  <div className="advertisement-price">
                    ₹{advertisementPrice.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <div className="advertisement-payment-info">
                <div>
                  <span>Selected Duration</span>
                  <strong>{duration} Days</strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>
                    ₹{advertisementPrice.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <p className="advertisement-pricing-note">
                Advertisement pricing is based on the selected duration.
                Payment is required only after admin approval.
              </p>
            </section>

            {/* Submit and Payment */}
            <div className="advertisement-actions">
              <button
                type="submit"
                className="submit-advertisement-button"
                disabled={isSubmitted}
              >
                <i className="fa-solid fa-paper-plane"></i>
                {isSubmitted ? "Submitted for Review" : "Submit Advertisement"}
              </button>

              <button
                type="button"
                className="advertisement-payment-button"
                onClick={handlePayment}
                disabled={!isSubmitted}
              >
                <i className="fa-solid fa-lock"></i>
                Proceed to Payment
              </button>
            </div>

            {submissionNotice && (
              <p className="advertisement-submit-notice" role="status">
                <i className="fa-solid fa-circle-check"></i>
                {submissionNotice}
              </p>
            )}
          </form>

          {/* Information */}
          <section className="advertisement-footer-info">
            <i className="fa-solid fa-shield-halved"></i>

            <div>
              <h3>Admin Verification</h3>
              <p>
                Every advertisement is reviewed by the FixNear admin
                before publication. Once approved, you can complete
                the payment to activate your advertisement.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Advertisements;
