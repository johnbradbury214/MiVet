import React, { useEffect, useState } from "react";
import ReadServiceTable from "./ReadServiceTable";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import serviceProvidedService from "services/serviceProvidedService";
import PropTypes from "prop-types";
import toastr from "toastr";
import "../../toastr/build/toastr.css";
import validationSchema from "schemas/serviceProvidedSchema";
import debug from "sabio-debug";

const ServiceTables = ({ currentUser }) => {
  const _logger = debug.extend("ServiceTables");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [pageData] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    current: 1,
    userId: currentUser.id,
  });

  const [posts, setPosts] = useState([]);

  //Get ID
  //const [editPostId, setEditPostId] = useState(null);

  const [formData, setFormData] = useState({
    postId: null,
    serviceTypeId: null,
    name: "",
    description: "",
    total: null,
    serviceCode: "",
    isActive: null,
  });

  const handleEditPostForm = (e, post) => {
    e.preventDefault();
    handleShow();
    setFormData({ postId: post.id });

    const formValues = {
      postId: post.id,
      serviceTypeId: post.serviceType.id,
      name: post.name,
      description: post.description,
      total: post.total,
      serviceCode: post.serviceCode,
      isActive: post.isActive,
    };

    setFormData(formValues);
  };

  //Remove Service
  const deleteService = (id, e) => {
    e.preventDefault();
    serviceProvidedService
      .deleteServiceProvided(id)
      .then(onDeleteServiceTypeSuccess)
      .catch(onDeleteServiceTypeError);
  };
  const onDeleteServiceTypeSuccess = () => {
    window.location.reload();
    toastr.success("You have removed the service type.");
  };
  const onDeleteServiceTypeError = () => {
    toastr.error("Cannot delete, service is currently in use");
  };

  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("");

  function search(posts) {
    return posts.filter(
      (row) =>
        row.serviceType.name.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
        row.name.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
        row.description.toLocaleLowerCase().indexOf(searchQuery) !== -1 ||
        row.serviceCode.toLocaleLowerCase().indexOf(searchQuery) !== -1
    );
  }

  useEffect(() => {
    serviceProvidedService
      .getUserServiceProvided(
        pageData.pageIndex,
        pageData.pageSize,
        pageData.userId
      )
      .then(onGetUserServiceSuccess)
      .catch(onGetError);
  }, []);
  const onGetUserServiceSuccess = (response) => {
    let newData = response.item.pagedItems;
    setPosts(newData);
  };

  const onSubmit = (values) => {
    serviceProvidedService
      .updateServiceProvided(values.postId, values)
      .then(onUpdateServiceSuccess)
      .catch(onGetError);
  };

  const onUpdateServiceSuccess = (response) => {
    toastr.success("You have successfully updated your service");
    _logger("onUpdateServiceSuccess", response);
    window.location.reload();
  };

  const [serviceTypes, setServiceTypes] = useState([{ name: "", id: "" }]);

  useEffect(() => {
    serviceProvidedService
      .getAllServiceTypes(pageData.userId)
      .then(onGetSuccess)
      .catch(onGetError);
  }, [pageData.userId]);

  const onGetSuccess = (response) => {
    let newData = response.items;
    setServiceTypes(newData);
  };
  const onGetError = (error) => {
    return error;
  };

  const mapServiceTypes = serviceTypes.map((serviceType) => (
    <option value={serviceType.id} key={serviceType.Id}>
      {serviceType.name}
    </option>
  ));

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
                  <Link to="/dashboard/admin" className="btn btn-primary">
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
              deleteService={deleteService}
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
          <Formik
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
            initialValues={formData}
          >
            <Form>
              {/*ServiceType Select*/}
              <div className="pb-3">
                <label>Service Type:</label>
                <Field
                  as="select"
                  className="form-control"
                  name="serviceTypeId"
                  required
                >
                  <option value="">Select Service Type</option>
                  {mapServiceTypes}
                </Field>
                <text className="text-muted">Change service type.</text>
              </div>
              {/*Service Name*/}
              <div className="pb-3">
                <label>Service Name:</label>
                <Field
                  type="text"
                  className="form-control"
                  name="name"
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
                  name="description"
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
                  name="total"
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

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Container>
      </Modal>
    </>
  );
};
ServiceTables.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default ServiceTables;
