
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import UserSidebar from "./UserSidebar";
import "./ReportIssue.css";

// Leaflet marker icon
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Update map center
const MapCenterUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
};

// Handle map clicks
const MapClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

const ReportIssue = () => {
  const defaultPosition = [9.9816, 76.2999];

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    severity: "Medium",
    address: "",
    latitude: "9.9816",
    longitude: "76.2999",
  });

  const [images, setImages] = useState([]);
  const [mapSearch, setMapSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const position = [
    Number(formData.latitude),
    Number(formData.longitude),
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload multiple images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      alert("Only images up to 5 MB are allowed.");
    }

    setImages((prev) =>
      [...prev, ...validFiles].slice(0, 5)
    );

    e.target.value = "";
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Update coordinates
  const updateCoordinates = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    }));
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (result) => {
        updateCoordinates(
          result.coords.latitude,
          result.coords.longitude
        );

        setLoading(false);
      },
      () => {
        alert("Unable to access your location.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  // Search location using OpenStreetMap
  const searchLocation = async () => {
    if (!mapSearch.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(mapSearch)}`
      );

      if (!response.ok) {
        throw new Error("Location search failed");
      }

      const results = await response.json();

      if (results.length === 0) {
        alert("Location not found.");
        return;
      }

      updateCoordinates(
        Number(results[0].lat),
        Number(results[0].lon)
      );
    } catch (error) {
      alert("Unable to search location. Please try again.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      severity: "Medium",
      address: "",
      latitude: "9.9816",
      longitude: "76.2999",
    });

    setImages([]);
    setMapSearch("");
  };

  // Submit issue
  const handleSubmit = (e) => {
    e.preventDefault();

    const lat = Number(formData.latitude);
    const lng = Number(formData.longitude);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      alert("Please enter valid coordinates.");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    // Connect this FormData to your Express API
    console.log("Issue Data:", formData);
    console.log("Uploaded Images:", images);

    alert("Form validated. Backend API connection is required.");
  };

  return (
    <div className="dashboard-container">
      <UserSidebar />
      <main className="main-content">
        <header className="top-header">
          <div>
            <h2>Report an Issue</h2>
            <p>Help make your community better by reporting a local problem.</p>
          </div>

          <div className="header-right">
            <div className="user-info">
              <div className="avatar">F</div>
              <div>
                <h4>Faizal</h4>
                <p>Citizen</p>
              </div>
            </div>
          </div>
        </header>

        <div className="report-page">
          <div className="report-page-heading">
            <div>
              <h3>Issue details</h3>
              <p>Provide the details below so the right team can take action.</p>
            </div>
            <span className="report-required-note">* Required fields</span>
          </div>

          <form className="report-card" onSubmit={handleSubmit}>
            <div className="report-card-heading">
              <h3>Tell us what happened</h3>
              <p>Clear details and a precise location help us resolve issues faster.</p>
            </div>

        <div className="report-grid">

          {/* LEFT COLUMN */}
          <div className="report-left">

            <div className="field-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a short title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Pothole">Pothole</option>
                <option value="Streetlight">Streetlights</option>
                <option value="Garbage">Garbage</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Drainage">Drainage</option>
                <option value="Damaged Roads">Damaged Roads</option>
                <option value="Fallen Trees">Fallen Trees</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field-group">
              <label>Description *</label>
              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label>Severity *</label>

              <div className="severity-list">
                {["Low", "Medium", "High", "Critical"].map(
                  (level) => (
                    <label
                      key={level}
                      className={`severity-choice ${level.toLowerCase()} ${
                        formData.severity === level ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="severity"
                        value={level}
                        checked={formData.severity === level}
                        onChange={handleChange}
                      />
                      {level}
                    </label>
                  )
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="report-right">

            {/* Image Upload */}
            <div className="field-group">
              <label>Upload Images</label>

              <div className="image-upload-area">

                <label className="image-dropzone">
                  <span className="upload-symbol">⇧</span>
                  <strong>Click to upload images</strong>
                  <span>or drag and drop</span>
                  <small>Max 5 images · 5 MB each</small>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageUpload}
                  />
                </label>

                <div className="image-thumbnails">
                  {images.length > 0 ? (
                    images.map((file, index) => (
                      <div
                        className="thumbnail"
                        key={`${file.name}-${index}`}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Issue"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="empty-thumbnail">
                        Image 1
                      </div>
                      <div className="empty-thumbnail">
                        Image 2
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Location Map */}
            <div className="field-group">
              <label>Location</label>

              <div className="map-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search location..."
                  value={mapSearch}
                  onChange={(e) => setMapSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      searchLocation();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={searchLocation}
                >
                  Search
                </button>
              </div>

              <div className="map-wrapper">
                <MapContainer
                  center={defaultPosition}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="report-leaflet-map"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapCenterUpdater position={position} />

                  <MapClickHandler
                    onSelect={updateCoordinates}
                  />

                  <Marker
                    position={position}
                    icon={markerIcon}
                    draggable={true}
                    eventHandlers={{
                      dragend: (e) => {
                        const coords = e.target.getLatLng();

                        updateCoordinates(
                          coords.lat,
                          coords.lng
                        );
                      },
                    }}
                  />
                </MapContainer>
              </div>

              <div className="map-buttons">
                <button
                  type="button"
                  className="current-location-btn"
                  onClick={getCurrentLocation}
                  disabled={loading}
                >
                  {loading
                    ? "Getting Location..."
                    : "⌖ Use Current Location"}
                </button>

                <span className="map-hint">
                  Click map to select location
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ADDRESS AND COORDINATES */}
        <div className="location-details">

          <div className="field-group address-field">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Enter issue address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="report-actions">

          <button
            type="button"
            className="cancel-report-btn"
            onClick={resetForm}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-report-btn"
          >
            Submit Issue
          </button>

        </div>

      </form>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;
