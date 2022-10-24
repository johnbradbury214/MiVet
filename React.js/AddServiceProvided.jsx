import React, { Fragment, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, useFormik } from "formik";
import serviceProvidedService from "services/serviceProvidedService";
import { toast } from "react-toastify";
import validationSchema from "schemas/serviceProvidedSchema";
import ServiceTypeSelect from "./ServiceTypeSelect";
import debug from "sabio-debug";

const _logger = debug.extend("NewServiceProvided");

const onSubmit = (actions) => {
	actions.resetForm();
	serviceProvidedService
		.addServiceProvided()
		.then(addServiceProvidedSuccess)
		.catch(addServiceProvidedError);
};
const addServiceProvidedSuccess = (response) => {
	toast.success("You have succesfully added a new service.");
	_logger("addServiceProvidedSuccess", response);
};
const addServiceProvidedError = (error) => {
	toast.error("Error");
	_logger("addServiceProvidedError", error);
};
const NewServiceProvided = () => {
	const [userId] = useState({
		userId: 30,
	});
	_logger("userId", userId);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => setShow(true);

	const {
		values,
		handleBlur,
		handleChange,
		handleSubmit,
		isSubmitting,
		resetForm,
	} = useFormik({
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

	return (
		<Fragment>
			<div className="py-4 py-lg-6 bg-colors-gradient">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<div className="d-lg-flex align-items-center justify-content-between">
								<div className="mb-4 mb-lg-0">
									<h1 className="text-black mb-1">Add New Service</h1>
									<p className="mb-0 text-Black lead">
										Just fill the form and add your service.
									</p>
								</div>
								<div>
									<Link to="/services" className="btn btn-primary ">
										Back to Services
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="pb-12">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<Formik>
								<Form onSubmit={handleSubmit} className="mb-3">
									{/* Information Card */}
									<Card className="mb-3 ">
										<Card.Header className="border-bottom px-4 py-3">
											<h4 className="mb-0">Information</h4>
										</Card.Header>
										<Card.Body>
											{/* Service Type */}
											<div className="pb-3">
												<label htmlFor="serviceName">Service Type:</label>
												<ServiceTypeSelect />
												<text className="text-muted">
													Specify service type, or {""}
												</text>
												<Link onClick={handleShow} className="text-primary">
													add a new service type.
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
													Specify service name. Must be between 2 and 50
													characters.
												</text>
											</div>
											{/* Service Description */}
											<div className="pb-3">
												<label htmlFor="serviceDesc">
													Service Description:
												</label>
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
													Give a brief summary of your service.
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
													placeholder="$0.00"
													onBlur={handleBlur}
													className="form-control"
													required
												/>

												<text className="text-muted">
													Specify fee for service offered.
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

												<text className="text-muted">
													Specify service code.
												</text>
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
													Specify if service is currently offered.
												</text>
											</div>
										</Card.Body>
									</Card>
									{/* Buttons */}
									<div className="d-flex justify-content-between mb-22">
										<Button
											type="reset"
											onClick={resetForm}
											variant="secondary"
										>
											Cancel
										</Button>
										<Button
											disabled={isSubmitting}
											type="submit"
											className="btn-outline-primary"
											variant="btn-outline-primary"
										>
											Submit
										</Button>
									</div>
								</Form>
							</Formik>
						</Col>
					</Row>
				</Container>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Service Type</Modal.Title>
				</Modal.Header>
				<Container>
					<Formik>
						<Form onSubmit={handleSubmit} className="mb-3">
							{/* Service Name */}
							<div className="pb-3">
								<label htmlFor="serviceType">Service Type:</label>
								<Field
									value={values.serviceType}
									onChange={handleChange}
									id="serviceName"
									type="text"
									placeholder="Service Name"
									onBlur={handleBlur}
									className="form-control"
									required
								/>
								<text className="text-muted">
									Add a service type. Must be between 2 and 50 characters.
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
						Add Service Type
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};
export default NewServiceProvided;
