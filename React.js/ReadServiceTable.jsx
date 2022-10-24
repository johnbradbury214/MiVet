import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, Button, Container } from "react-bootstrap";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, useFormik } from "formik";
import ServiceTypeSelect from "./ServiceTypeSelect";
import validationSchema from "schemas/serviceProvidedSchema";
import { Link } from "react-router-dom";

const onSubmit = (values, actions) => {
	actions.resetForm();
	//placeholder for functionality to be added next.
};

const ReadServiceTable = ({ posts }) => {
	const { values, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			serviceType: "",
			serviceName: "",
			serviceDesc: "",
			serviceFee: null,
			serviceCode: "",
		},
		validationSchema: validationSchema,
		onSubmit,
	});
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => setShow(true);

	const ActionMenu = () => {
		return (
			<Dropdown>
				<Dropdown.Toggle size="sm" />
				<Dropdown.Menu align="end">
					<Dropdown.Item variant="primary" onClick={handleShow}>
						<FiEdit size="18px" className="dropdown-item-icon" /> Edit
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<FiTrash2 size="18px" className="dropdown-item-icon" /> Remove
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Service</Modal.Title>
				</Modal.Header>
				<Container>
					<Formik>
						<Form onSubmit={handleSubmit} className="mb-3">
							{/* Service Type */}
							<div className="pb-3">
								<label htmlFor="serviceName">Service Type:</label>
								<ServiceTypeSelect
									onChange={handleChange}
									id="serviceType"
									type="text"
									placeholder="Service Type"
									onBlur={handleBlur}
									className="form-control"
									required
								/>
								<text className="text-muted">Change service type, or {""}</text>
								<Link
									className="text-primary"
									data-bs-target="#exampleModalToggle2"
									data-bs-toggle="modal"
									data-bs-dismiss="modal"
								>
									add a new service type
								</Link>
							</div>
							{/* Service Name */}
							<div className="pb-3">
								<label htmlFor="serviceName">Service Name:</label>
								<Field
									value={values.serviceName}
									onChange={handleChange}
									id="serviceName"
									type="text"
									placeholder="Service Name"
									onBlur={handleBlur}
									className="form-control"
									required
								/>
								<text className="text-muted">
									Update service name. Must be between 2 and 50 characters.
								</text>
							</div>
							{/* Service Description */}
							<div className="pb-3">
								<label htmlFor="serviceDesc">Service Description:*</label>
								<Field
									value={values.serviceDesc}
									onChange={handleChange}
									id="serviceDesc"
									type="text"
									placeholder="Service Description"
									onBlur={handleBlur}
									className="form-control"
									required
								/>
								<text className="text-muted">
									Modify summary of your service.
								</text>
							</div>
							{/* Service Fee */}
							<div className="pb-3">
								<label htmlFor="serviceFee">Service Fee:</label>
								<Field
									value={values.serviceFee}
									onChange={handleChange}
									id="serviceFee"
									type="number"
									placeholder="0.00"
									onBlur={handleBlur}
									className="form-control"
									required
								/>

								<text className="text-muted">
									Update fee for service offered.
								</text>
							</div>
							{/* Service Code */}
							<div className="pb-3">
								<label htmlFor="serviceCode">Service Code:</label>
								<Field
									value={values.serviceCode}
									onChange={handleChange}
									id="serviceCode"
									type="text"
									placeholder="Service Code"
									onBlur={handleBlur}
									className="form-control"
									required
								/>

								<text className="text-muted">Update service code.</text>
							</div>
							{/* Service Active */}
							<div className="pb-3">
								<label htmlFor="serviceName">Service Active:</label>
								<select
									onChange={handleChange}
									id="serviceActive"
									type="text"
									placeholder="Service Active?"
									onBlur={handleBlur}
									className="form-control"
									required
								>
									<option value="">Service Active?</option>
									<option value="1">Yes</option>
									<option value="0">No</option>
								</select>

								<text className="text-muted">
									Update if service is currently offered.
								</text>
							</div>
						</Form>
					</Formik>
				</Container>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			{posts.map((posts) => (
				<tr key={"postId"}>
					<td>{posts.serviceType.name}</td>
					<td>{posts.name}</td>
					<td>{posts.description}</td>
					<td>
						$
						{posts.total.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}
					</td>
					<td>{posts.serviceCode}</td>
					<td>
						<ActionMenu />
					</td>
				</tr>
			))}
		</>
	);
};

ReadServiceTable.propTypes = {
	posts: PropTypes.func.isRequired,
};

export default ReadServiceTable;
