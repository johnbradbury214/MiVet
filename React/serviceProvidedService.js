import axios from "axios";
import {
	onGlobalSuccess,
	onGlobalError,
	API_HOST_PREFIX,
} from "./serviceHelpers";

const serviceProvidedEndpoint = `${API_HOST_PREFIX}/api/services`;
const serviceTypeProvidedEndpoint = `${API_HOST_PREFIX}/api/servicetypes`;

const addServiceProvided = (payload) => {
	const config = {
		method: "POST",
		url: `${serviceProvidedEndpoint}`,
		data: payload,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const addServiceType = (payload) => {
	const config = {
		method: "POST",
		url: `${serviceTypeProvidedEndpoint}`,
		data: payload,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const updateServiceProvided = (id, payload) => {
	const config = {
		method: "PUT",
		url: `${serviceProvidedEndpoint}/${id}`,
		data: payload,
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getServiceProvidedById = (id) => {
	const config = {
		method: "GET",
		url: `${serviceProvidedEndpoint}/${id}`,
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getUserServiceProvided = (pageIndex, pageSize, userId) => {
	const config = {
		method: "GET",
		url: `${serviceProvidedEndpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
// pass in userId when new proc is made
const getAllServiceTypes = (userId) => {
	const config = {
		method: "GET",
		url: `${serviceTypeProvidedEndpoint}/${userId}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getServiceTypesByCreatedBy = () => {
	const config = {
		method: "GET",
		url: `${serviceTypeProvidedEndpoint}/createdby/`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getServiceProvidedByPractice = (pageIndex, pageSize, practiceId) => {
	const config = {
		method: "GET",
		url: `${serviceProvidedEndpoint}/practice/${practiceId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const deleteServiceTypeProvided = (id) => {
	const config = {
		method: "DELETE",
		url: `${serviceTypeProvidedEndpoint}/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteServiceProvided = (id) => {
	const config = {
		method: "DELETE",
		url: `${serviceProvidedEndpoint}/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateServiceType = (id, payload) => {
	const config = {
		method: "PUT",
		url: `${serviceTypeProvidedEndpoint}/${id}`,
		data: payload,
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const serviceProvidedService = {
	addServiceProvided,
	getUserServiceProvided,
	updateServiceProvided,
	getServiceProvidedById,
	getAllServiceTypes,
	getServiceProvidedByPractice,
	getServiceTypesByCreatedBy,
	addServiceType,
	deleteServiceTypeProvided,
	deleteServiceProvided,
	updateServiceType,
};

export default serviceProvidedService;
