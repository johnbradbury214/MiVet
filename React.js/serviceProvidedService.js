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
const getAllServiceTypes = () => {
	const config = {
		method: "GET",
		url: `${serviceTypeProvidedEndpoint}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getServiceProvidedByPractice = (pageIndex, pageSize, practiceId) => {
	const config = {
		method: "GET"
		, url: `${serviceProvidedEndpoint}/practice/${practiceId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`
		, withCredentials: true, crossdomain: true
		, headers: { "Content-Type": "application/json" }
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const serviceProvidedService = {
	addServiceProvided
	, getUserServiceProvided
	, getAllServiceTypes
	, getServiceProvidedByPractice
}

export default serviceProvidedService;
