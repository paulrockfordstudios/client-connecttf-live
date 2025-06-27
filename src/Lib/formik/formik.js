import { useFormik } from "formik";
import { validationSchema } from "../yup/validationSchema";

export const formik = () => {

    return useFormik({
        initialValues: {agEmail: "", rgEmail: "", agPassword: "", rgPassword: "", dob: ""},
        validationSchema: validationSchema(),
        validateOnBlur: true,
        validateOnChange: false,
    })

};