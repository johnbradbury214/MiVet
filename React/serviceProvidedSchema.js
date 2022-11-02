import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    total: yup.number().positive().integer().required("Required"),
    serviceCode: yup.string().required("Required"),
});

export default validationSchema;