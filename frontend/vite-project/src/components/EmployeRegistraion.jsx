import { useState } from "react";
import axios from "axios";
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
	{ name: "idproof", label: "ID proof", type: "text", placeholder: "Enter ID proof details" },
	{ name: "password", label: "Password", type: "password", placeholder: "Create a password" },
];

export default function EmployeRegistraion() {
	const [formData, setFormData] = useState(
		Object.fromEntries(fields.map(({ name }) => [name, ""])),
	);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState("");

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setSubmitted(false);
		setSubmitError("");
		try {
			await axios.post("/api/employeereg", formData);
			setSubmitted(true);
		} catch (error) {
			setSubmitError(error.response?.data?.message || "Unable to register employee. Please try again.");
		}
	}

	return (
		<main className="employee-registration">
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
									value={formData[name]}
									onChange={handleChange}
									placeholder={placeholder}
									autoComplete={name === "password" ? "new-password" : name}
									required
								/>
							</label>
						))}
					</div>

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

		</main>
	);
}
