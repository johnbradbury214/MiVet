import React, { useEffect, useState } from "react";
import ReadServiceTypeTable from "./ReadServiceTypeTable";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import serviceProvidedService from "services/serviceProvidedService";
import toastr from "toastr";
import "../../toastr/build/toastr.css";
import debug from "sabio-debug";
import PropTypes from "prop-types";

const ManageServiceTypes = ({ currentUser }) => {
  const _logger = debug.extend("ManageServiceTypes");

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);
  const [posts, setPosts] = useState([]);

  const [formData] = useState({
    name: "",
    UserId: currentUser.id,
  });

  const onSubmit = (values) => {
    serviceProvidedService
      .addServiceType(values)
      .then(addServiceTypeSuccess)
      .catch(addServiceTypeError);
  };
  const addServiceTypeSuccess = (response) => {
    _logger("addServiceProvidedSuccess", response);
    toastr.success("You have succesfully added a new service type.");
    window.location.reload();
  };
  const addServiceTypeError = (error) => {
    toastr.error("Error");
    _logger("addServiceProvidedError", error);
  };

  //Remove Service Type
  const deleteServiceType = (id, e) => {
    e.preventDefault();
    serviceProvidedService
      .deleteServiceTypeProvided(id)
      .then(onDeleteServiceTypeSuccess)
      .catch(onDeleteServiceTypeError);
  };
  const onDeleteServiceTypeSuccess = () => {
    toastr.success("You have removed the service type.");
    window.location.reload();
  };
  const onDeleteServiceTypeError = () => {
    toastr.error("error");
  };

  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("");

  function search(posts) {
    return posts.filter(
      (row) => row.name.toLocaleLowerCase().indexOf(searchQuery) !== -1
    );
  }

  useEffect(() => {
    async function fetchData() {
      const data = await serviceProvidedService
        .getServiceTypesByCreatedBy(currentUser.id)
        .then()
        .catch();
      setPosts(data.items);
    }
    fetchData();
  }, []);

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
              deleteServiceType={deleteServiceType}
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
          <Formik
            enableReinitialize={true}
            onSubmit={onSubmit}
            initialValues={formData}
          >
            <Form className="mb-3">
              {/* Service Name */}
              <div className="pb-3">
                <label htmlFor="serviceType">Service Type:</label>
                <Field
                  id="serviceName"
                  name="name"
                  type="text"
                  placeholder="Service Type Name"
                  className="form-control"
                  required
                />
                <text className="text-muted">
                  Add a service type. Must be between 2 and 50 characters.
                </text>
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleAddClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleAddClose}
                >
                  Add Service Type
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Container>
      </Modal>
    </>
  );
};
ManageServiceTypes.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default ManageServiceTypes;
