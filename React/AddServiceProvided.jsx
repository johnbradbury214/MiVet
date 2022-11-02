import React, { useState, useEffect, Fragment } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import serviceProvidedService from "services/serviceProvidedService";
import { toast } from "react-toastify";
import validationSchema from "schemas/serviceProvidedSchema";
import debug from "sabio-debug";
import PropTypes from "prop-types";

const NewServiceProvided = ({ currentUser }) => {
  const _logger = debug.extend("NewServiceProvided");
  _logger(currentUser);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    serviceProvidedService
      .addServiceProvided(values)
      .then(addServiceProvidedSuccess)
      .catch(addServiceProvidedError);
  };
  const addServiceProvidedSuccess = (response) => {
    toast.success("You have succesfully added a new service.");
    _logger("addServiceProvidedSuccess", response);
    navigate("/services");
  };
  const addServiceProvidedError = (error) => {
    toast.error("Error");
    _logger("addServiceProvidedError", error);
  };

  const [formData] = useState({
    serviceTypeId: null,
    name: "",
    description: "",
    total: null,
    serviceCode: "",
    isActive: null,
  });

  const [serviceTypes, setServiceTypes] = useState([{ name: "", id: "" }]);

  useEffect(() => {
    serviceProvidedService
      .getAllServiceTypes(currentUser.id)
      .then(onGetSuccess)
      .catch(onGetError);
  }, [currentUser.id]);

  const onGetSuccess = (response) => {
    let newData = response.items;
    setServiceTypes(newData);
  };
  const onGetError = (error) => {
    _logger("Error", error);
  };

  const mapServiceTypes = serviceTypes.map((serviceType) => (
    <option value={serviceType.id} key={serviceType.Id}>
      {serviceType.name}
    </option>
  ));

  return (
    <Fragment>
      <div className="py-4 py-lg-6 bg-colors-gradient">
        <Container>
          <Row>
            <Col lg={{ span: 11, offset: 1 }} md={12} sm={12}>
              <div className="d-lg-flex align-items-center justify-content-between">
                <div className="mb-4 mb-lg-0">
                  <h1 className="text-black mb-1">Add New Service</h1>
                  <p className="mb-0 text-Black lead">
                    Just fill the form and add your service.
                  </p>
                </div>
                <div>
                  <Link to="/services" className="btn btn-primary ">
                    Back to Services Dashboard
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Card className="border-0">
        <Card.Body>
          <div className=" overflow-hidden">
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2">
                <div className="d-flex flex-row">
                  <Link to="/services" className="btn btn-primary ">
                    Back
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
        <div className="pb-12">
          <Container>
            <Row>
              <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                <Formik
                  validationSchema={validationSchema}
                  enableReinitialize={true}
                  onSubmit={onSubmit}
                  initialValues={formData}
                >
                  <Form className="mb-3">
                    {/* Information Card */}
                    <Card className="mb-3 ">
                      <Card.Header className="border-bottom px-4 py-3">
                        <h4 className="mb-0">Information</h4>
                      </Card.Header>
                      <Card.Body>
                        {/* Service Type */}
                        <div className="pb-3">
                          <label>Service Type:</label>
                          <Field
                            as="select"
                            className="form-control"
                            id="serviceTypeId"
                            name="serviceTypeId"
                            required
                          >
                            <option value="">Select Service Type</option>
                            {mapServiceTypes}
                          </Field>

                          <text className="text-muted">
                            Specify service type.
                          </text>
                        </div>
                        {/* Service Name */}
                        <div className="pb-3">
                          <label>Service Name:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Service Name"
                            required
                          />
                          <text className="text-muted">
                            Specify service name. Must be between 2 and 50
                            characters.
                          </text>
                        </div>
                        {/* Service Description */}
                        <div className="pb-3">
                          <label>Service Description:</label>
                          <Field
                            component="textarea"
                            rows="4"
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Service Description"
                            required
                          />
                          <text className="text-muted">
                            Give a brief summary of your service.
                          </text>
                        </div>
                        {/* Service Fee */}
                        <div className="pb-3">
                          <label>Service Fee:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="total"
                            name="total"
                            placeholder="Service Fee"
                            required
                          />

                          <text className="text-muted">
                            Specify fee for service offered.
                          </text>
                        </div>
                        {/* Service Code */}
                        <div className="pb-3">
                          <label>Service Code:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="serviceCode"
                            name="serviceCode"
                            placeholder="Service Code"
                            required
                          />

                          <text className="text-muted">
                            Specify service code.
                          </text>
                        </div>
                        {/* Service Active */}

                        <div className="pb-3">
                          <label htmlFor="serviceName">Service Active:</label>
                          <Field
                            as="select"
                            className="form-control"
                            id="isActive"
                            name="isActive"
                            required
                          >
                            <option value="">Service Active?</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </Field>

                          <text className="text-muted">
                            Specify if service is currently offered.
                          </text>
                        </div>
                      </Card.Body>
                    </Card>
                    {/* Buttons */}
                    <div className="d-flex justify-content-between mb-22">
                      <Button type="reset" variant="secondary">
                        Reset Form
                      </Button>
                      <Button
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
      </Card>
    </Fragment>
  );
};

NewServiceProvided.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
export default NewServiceProvided;
