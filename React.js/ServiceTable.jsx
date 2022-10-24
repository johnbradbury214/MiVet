import React, { useState, useEffect, Fragment } from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import serviceProvidedService from "services/serviceProvidedService";
import ReadServiceTable from "./ReadServiceTable";
import debug from "sabio-debug";
import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

const _logger = debug.extend("ServicesProvided");

const ServiceTable = () => {
	const [pageData, setPageData] = useState({
		pageIndex: 0,
		pageSize: 10,
		totalCount: 0,
		current: 1,
		userId: 30,
		// userId hardcoded until login is implemented
	});

	const [searchQuery, setSearchQuery] = useState("");
	const [posts, setPosts] = useState([]);

	// Search
	function search() {
		return posts.filter(
			(row) =>
				row.serviceType.name.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
				row.name.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
				row.description.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
				row.serviceCode.toLocaleLowerCase().indexOf(searchQuery) !== -1
		);
	}

	// Request
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
	_logger(posts);

	const onChange = (page) => {
		setPageData((prevState) => {
			const serviceView = { ...prevState };
			serviceView.current = page;
			serviceView.pageIndex = serviceView.current - 1;
			return serviceView;
		});
	};

	return (
		<Fragment>
			<div className="py-4 py-lg-6 bg-colors-gradient">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<div className="d-lg-flex align-items-center justify-content-between">
								<div className="mb-4 mb-lg-0">
									<h1 className="text-black mb-1">Service Dashboard</h1>
									<p className="mb-0 text-black lead">
										Services dashboard is a quick overview of all current
										services provided.
									</p>
								</div>
								<div className="d-flex flex-row">
									<Link to="/" className="btn btn-primary">
										Back to Home
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="pb-12">
				<Container>
					<div>
						<Row>
							<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
								<div>
									<Card className="border-0">
										<Card.Body>
											<div className=" overflow-hidden">
												<Row>
													<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2">
														<div className="d-flex flex-row">
															<Link
																to="/services/add"
																className="btn btn-primary "
															>
																Add New Service
															</Link>
															<form className="row g-3 ms-auto">
																<div className="col-auto">
																	<input
																		type="text"
																		className="form-control ms-auto"
																		placeholder="Search Services"
																		value={searchQuery.toLocaleLowerCase()}
																		onChange={(e) =>
																			setSearchQuery(e.target.value)
																		}
																	/>
																</div>
															</form>
														</div>
													</Col>
												</Row>
											</div>
										</Card.Body>
										<Card.Body className="p-0 pb-5">
											<Row>
												<Col lg={12} md={12} sm={12}>
													<div className="table-responsive ">
														<Table className="table table table-responsive">
															<thead>
																<tr>
																	<th scope="col">Service Type</th>
																	<th scope="col">Name</th>
																	<th scope="col">Description</th>
																	<th scope="col">Fee</th>
																	<th scope="col">Service Code</th>
																	<th scope="col">Action</th>
																</tr>
															</thead>
															<tbody>
																<ReadServiceTable posts={search(posts)} />
															</tbody>
														</Table>
													</div>
												</Col>
											</Row>
										</Card.Body>
										<Pagination
											className="align-items-center g-0 mt-4"
											onChange={onChange}
											current={pageData.current}
											total={pageData.totalcount}
											pageSize={pageData.pageSize}
											pageIndex={pageData.pageIndex}
											locale={locale}
											style={{ textAlign: "center" }}
										/>
									</Card>
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</Fragment>
	);
};

export default ServiceTable;
