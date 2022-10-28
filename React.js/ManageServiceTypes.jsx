import React, { useEffect, useState } from "react";
import ReadServiceTypeTable from "./ReadServiceTypeTable";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import serviceProvidedService from "services/serviceProvidedService";

const ManageServiceTypes = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => setShow(true);

	const [showAdd, setShowAdd] = useState(false);

	const handleAddClose = () => setShowAdd(false);

	const handleAddShow = () => setShowAdd(true);

	const [userId] = useState({
		userId: 30,
		// userId hardcoded until login is implemented
	});

	const [posts, setPosts] = useState([]);

	//Get ID
	const [editPostId, setEditPostId] = useState(null);

	const [editFormData, setEditFormData] = useState({
		name: "",
	});

	//Edit data

	const handleEditPostForm = (e, post) => {
		e.preventDefault();
		handleShow();
		setEditPostId(post.id);

		const formValues = {
			name: post.name,
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
			name: editFormData.name,
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
			(row) => row.name.toLocaleLowerCase().indexOf(searchQuery) !== -1
		);
	}

	useEffect(() => {
		async function fetchData() {
			const data = await serviceProvidedService
				.getServiceTypesByCreatedBy(userId.userId)
				.then()
				.catch();
			setPosts(data.items);
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
										A quick overview of all current service types provided.
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
									<Button onClick={handleAddShow} className="btn btn-primary">
										Add New Service Type
									</Button>
									&nbsp; &nbsp;
									<Link to="/services/" className="btn btn-primary">
										Manage Services
									</Link>
									<form className="row g-3 ms-auto">
										<div className="col-auto">
											<input
												type="text"
												className="form-control ms-auto"
												placeholder="Search Service Types"
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
							<th scope="col">Name</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<ReadServiceTypeTable
							posts={search(posts)}
							handleEditPostForm={handleEditPostForm}
							handleDelete={handleDelete}
						/>
					</tbody>
				</Table>
			</Card>
			{/*Add ServiceType Modal*/}
			<Modal show={showAdd} onHide={handleAddClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Service Type</Modal.Title>
				</Modal.Header>
				<Container>
					<Formik>
						<Form className="mb-3">
							{/* Service Name */}
							<div className="pb-3">
								<label htmlFor="serviceType">Service Type:</label>
								<Field
									id="serviceName"
									type="text"
									placeholder="Service Name"
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
					<Button variant="secondary" onClick={handleAddClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddClose}>
						Add Service Type
					</Button>
				</Modal.Footer>
			</Modal>
			{/*Edit ServiceType Modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Service</Modal.Title>
				</Modal.Header>
				<Container>
					<Formik>
						<Form onSubmit={handleFormSave}>
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

export default ManageServiceTypes;
