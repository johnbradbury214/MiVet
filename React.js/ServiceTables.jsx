import React, { useEffect, useState } from "react";
import ReadServiceTable from "./ReadServiceTable";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import ServiceTypeSelect from "./ServiceTypeSelect";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import serviceProvidedService from "services/serviceProvidedService";

const Tables = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => setShow(true);

	const [pageData] = useState({
		pageIndex: 0,
		pageSize: 10,
		totalCount: 0,
		current: 1,
		userId: 30,
		// userId hardcoded until login is implemented
	});

	const [posts, setPosts] = useState([]);

	//Get ID
	const [editPostId, setEditPostId] = useState(null);

	const [editFormData, setEditFormData] = useState({
		serviceType: "",
		name: "",
		description: "",
		total: "",
		serviceCode: "",
		isActive: "",
	});

	//Edit data

	const handleEditPostForm = (e, post) => {
		e.preventDefault();
		handleShow();
		setEditPostId(post.id);

		const formValues = {
			serviceType: post.serviceType.name,
			name: post.name,
			description: post.description,
			total: post.total,
			serviceCode: post.serviceCode,
			isActive: post.isActive,
		};

		setEditFormData(formValues);
	};

	//Edit Form Data
	const handleEditFormClick = (input) => (e) => {
		e.preventDefault();
		setEditFormData({ ...editFormData, [input]: e.target.value });
	};

	//Save Form Data
	const handleFormSave = (e) => {
		e.preventDefault();

		const savePost = {
			id: editPostId,
			serviceType: editFormData.serviceType.name,
			name: editFormData.name,
			description: editFormData.description,
			total: editFormData.total,
			serviceCode: editFormData.serviceCode,
			isActive: editFormData.isActive,
		};

		const newPosts = [...posts];

		const formIndex = posts.findIndex((post) => post.id === editPostId);

		newPosts[formIndex] = savePost;

		setPosts(newPosts);
		setEditPostId(null);
	};

	//Delete Data
	const handleDelete = (e) => {
		e.preventDefault();
		const newPosts = [...posts];

		const formIndex = posts.findIndex((post) => post.id === editPostId);

		newPosts.splice(formIndex, 1);

		setPosts(newPosts);
	};

	//Search Filter Data
	const [searchQuery, setSearchQuery] = useState("");

	function search() {
		return posts.filter(
			(row) =>
				row.serviceType.name.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
				row.name.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
				row.description.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
				row.serviceCode.toLocaleLowerCase().indexOf(searchQuery) !== -1
		);
	}

	//Request
	useEffect(() => {
		async function fetchData() {
			const data = await serviceProvidedService
				.getUserServiceProvided(
					pageData.pageIndex,
					pageData.pageSize,
					pageData.userId
				)
				.then()
				.catch();
			setPosts(data.item.pagedItems);
		}
		fetchData();
	}, []);

	const onEditSubmit = () => {
		handleClose();
		//placeholder for functionality to be added next.
	};

	return (
		<>
			<div className="py-4 py-lg-6 bg-colors-gradient">
				<Container>
					<Row>
						<Col lg={{ span: 11, offset: 1 }} md={12} sm={12}>
							<div className="d-lg-flex align-items-center justify-content-between">
								<div className="mb-4 mb-lg-0">
									<h1 className="text-black mb-1">Service Dashboard</h1>
									<p className="mb-0 text-black lead">
										A quick overview of all current services provided.
									</p>
								</div>
								<div className="d-flex flex-row">
									<Link to="/" className="btn btn-primary">
										Back to Main Dashboard
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			{/*Add, Manage, Search*/}
			<Card className="border-0">
				<Card.Body>
					<div className=" overflow-hidden">
						<Row>
							<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2">
								<div className="d-flex flex-row">
									<Link to="/services/add" className="btn btn-primary ">
										Add New Service
									</Link>
									&nbsp; &nbsp;
									<Link
										to="/services/servicetypes"
										className="btn btn-primary "
									>
										Manage Service Types
									</Link>
									<form className="row g-3 ms-auto">
										<div className="col-auto">
											<input
												type="text"
												className="form-control ms-auto"
												placeholder="Search Services"
												value={searchQuery.toLocaleLowerCase()}
												onChange={(e) => setSearchQuery(e.target.value)}
											/>
										</div>
									</form>
								</div>
							</Col>
						</Row>
					</div>
				</Card.Body>
				{/*Table*/}
				<Table className="table table table-responsive">
					<thead>
						<tr>
							<th scope="col">Service Type</th>
							<th scope="col">Name</th>
							<th scope="col">Description</th>
							<th scope="col">Fee</th>
							<th scope="col">Service Code</th>
							<th scope="col">Service Active?</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<ReadServiceTable
							posts={search(posts)}
							handleEditPostForm={handleEditPostForm}
							handleDelete={handleDelete}
						/>
					</tbody>
				</Table>
			</Card>
			{/*Edit Service Modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Service</Modal.Title>
				</Modal.Header>
				<Container>
					<Formik>
						<Form onSubmit={handleFormSave}>
							{/*ServiceType Select*/}
							<div className="pb-3">
								<label>Service Type:</label>
								<ServiceTypeSelect />
								<text className="text-muted">Change service type, or {""}</text>
								<Link className="text-primary">add a new service type</Link>
							</div>
							{/*Service Name*/}
							<div className="pb-3">
								<label>Service Name:</label>
								<Field
									type="text"
									className="form-control"
									name="serviceName"
									value={editFormData.name}
									onChange={handleEditFormClick("serviceType")}
									required
								/>
								<text className="text-muted">
									Update service name. Must be between 2 and 50 characters.
								</text>
							</div>
							{/*Service Description*/}
							<div className="pb-3">
								<label>Service Description:</label>
								<Field
									component="textarea"
									rows="4"
									type="text"
									className="form-control"
									name="serviceDescription"
									value={editFormData.description}
									onChange={handleEditFormClick("serviceDescription")}
									required
								/>
								<text className="text-muted">
									Modify summary of your service.
								</text>
							</div>
							{/*Service Fee*/}
							<div className="pb-3">
								<label>Service Description:</label>
								<Field
									type="text"
									className="form-control"
									name="serviceFee"
									value={editFormData.total}
									onChange={handleEditFormClick("serviceFee")}
									required
								/>
								<text className="text-muted">
									Update total fee for service offered.
								</text>
							</div>
							{/* Service Active */}
							<div className="pb-3">
								<label htmlFor="serviceName">Service Active:</label>
								<select
									type="text"
									className="form-control"
									name="isActive"
									value={editFormData.isActive}
									onChange={handleEditFormClick("isActive")}
									required
								>
									<option value="">Service Active?</option>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>

								<text className="text-muted">
									Update if service is currently being offered.
								</text>
							</div>
						</Form>
					</Formik>
				</Container>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={onEditSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Tables;
