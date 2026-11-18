import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../EmployeeRegistration.css";

const fields = [
	{ name: "name", label: "Full name", type: "text", placeholder: "Enter employee name" },
	{ name: "email", label: "Email address", type: "email", placeholder: "name@company.com" },
	{ name: "phone", label: "Phone number", type: "tel", placeholder: "Enter phone number" },
	{ name: "employeeId", label: "Employee ID", type: "text", placeholder: "Enter employee ID" },
	{ name: "department", label: "Department", type: "text", placeholder: "Enter department" },
	{ name: "designation", label: "Designation", type: "text", placeholder: "Enter designation" },
	{ name: "office", label: "Office", type: "text", placeholder: "Enter office location" },
	{ name: "serviceArea", label: "Service area", type: "text", placeholder: "Enter service area" },
	{ name: "password", label: "Password", type: "password", placeholder: "Create a password" },
];

export default function EmployeRegistraion() {
	const [formData, setFormData] = useState(
		Object.fromEntries(fields.map(({ name }) => [name, ""])),
	);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [idProof, setIdProof] = useState(null);

	function handleChange(event) {
		const { name, value, files } = event.target;
		if (files) {
			const file = files[0];
			if (!file) return;

			const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
			if (!allowedTypes.includes(file.type)) {
				setSubmitError("ID proof must be PDF, JPG or PNG.");
				event.target.value = "";
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				setSubmitError("ID proof size must not exceed 5 MB.");
				event.target.value = "";
				return;
			}

			setSubmitError("");
			setIdProof(file);
		} else {
			setFormData((current) => ({ ...current, [name]: value }));
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setSubmitted(false);
		setSubmitError("");
		try {
			if (!idProof) {
				setSubmitError("Please upload your identity proof.");
				return;
			}
			const uploadData = new FormData();
			Object.entries(formData).forEach(([name, value]) => {
				if (value !== "" && value !== null) {
					uploadData.append(name, value);
				}
			});
			uploadData.append("idproof", idProof);
			await axios.post("http://localhost:5000/api/employeereg", uploadData);
			setSubmitted(true);
			setFormData(Object.fromEntries(fields.map(({ name }) => [name, ""])));
			setIdProof(null);
			event.target.reset();
		} catch (error) {
			setSubmitError(error.response?.data?.message || "Unable to register employee. Please try again.");
		}
	}

	return (
		<div className="employee-registration">
			<nav className="reg-navbar" aria-label="Main navigation">
				<Link className="brand employee-brand" to="/" aria-label="Fixnear home">
					<span className="employee-brand-icon" aria-hidden="true">F</span>
					<span className="employee-brand-name">
						Fix<span className="employee-brand-highlight">near</span>
					</span>
				</Link>
				<span className="nav-text">Already have an account? <Link to="/login">Login</Link></span>
			</nav>

			<section className="registration-card" aria-labelledby="registration-title">
				<header className="registration-header">
					<p className="registration-eyebrow">TEAM MANAGEMENT</p>
					<h1 id="registration-title">Employee registration</h1>
					<p>Enter the employee details below to create a profile.</p>
				</header>

				<form onSubmit={handleSubmit}>
					<div className="registration-grid">
						{fields.map(({ name, label, type, placeholder }) => (
							<label className="registration-field" htmlFor={name} key={name}>
								<span>{label}</span>
								<input
									id={name}
									name={name}
									type={type}
									value={type === "file" ? undefined : formData[name]}
									onChange={handleChange}
									placeholder={placeholder}
									accept={name === "idproof" ? "image/jpeg,image/png,.pdf" : undefined}
									autoComplete={name === "password" ? "new-password" : name}
									required
								/>
							</label>
						))}
					</div>
					<section className="employee-id-section" aria-labelledby="employee-id-heading">
						<h2 id="employee-id-heading">Identity Verification</h2>
						<div className="upload-card">
							<div className="upload-title">
								<div><h4>Identity Proof</h4><p>Upload a valid employee ID document</p></div>
								<div className="document-icon">ID</div>
							</div>
							<label className="file-button">
								<span>{idProof ? "Change Document" : "Choose Document"}</span>
								<input type="file" name="idproof" accept="image/jpeg,image/png,.pdf" onChange={handleChange} required className="file-input" />
							</label>
							{idProof ? <div className="file-success" role="status" aria-live="polite">
								<div className="file-status"><span>✓ Identity proof selected</span><button type="button" onClick={() => { setIdProof(null); const input = document.querySelector('input[name="idproof"]'); if (input) input.value = ""; }}>Remove</button></div>
								<p>{idProof.name}</p><small>{(idProof.size / 1024).toFixed(1)} KB</small>
							</div> : <small className="upload-hint">No document selected · PDF, JPG or PNG · Maximum 5 MB</small>}
						</div>
					</section>

					<button className="registration-submit" type="submit">
						Register employee
					</button>
					{submitted && (
						<p className="registration-success" role="status">
							Employee details are ready to submit.
						</p>
					)}
					{submitError && <p className="registration-error" role="alert">{submitError}</p>}
				</form>
			</section>

		</div>
	);
}
