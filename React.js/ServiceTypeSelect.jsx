import React, { useState, useEffect } from "react";

import debug from "sabio-debug";
import serviceProvidedService from "services/serviceProvidedService";

const ServiceTypeSelect = () => {
	const _logger = debug.extend("ServiceTypeSelect");
	const [userId] = useState({
		userId: 30,
	});
	const [serviceTypes, setServiceTypes] = useState([{ name: "", id: "" }]);

	useEffect(() => {
		serviceProvidedService
			.getAllServiceTypes(userId.userId)
			.then(onGetSuccess)
			.catch(onGetError);
	}, [userId.userId]);

	const onGetSuccess = (response) => {
		let newData = response.items;
		setServiceTypes(newData);
	};
	const onGetError = (error) => {
		_logger("Error", error);
	};

	const mapServiceTypes = serviceTypes.map((serviceType) => (
		<option value={serviceType.Id} key={serviceType.Id}>
			{serviceType.name}
		</option>
	));

	return (
		<select className="form-select">
			<option value="">Select Service Type</option>
			{mapServiceTypes}
		</select>
	);
};

export default ServiceTypeSelect;
