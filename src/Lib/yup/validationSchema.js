import { useTranslation } from "react-i18next";
import * as Yup from "yup";


export const validationSchema = (form) => {

    const {t} = useTranslation(["common"]);

    
    return Yup.object().shape({
        agEmail: Yup.string()
            .email(t("phrases.invalid_email", "common"))
            .required(t("phrases.required_email", "common")),
        //rgFirstName: Yup.string()
        //rgLastName: Yup.string()
        //rgPreferredName: Yup.string()
        //rgUsername: Yup.string()
        rgEmail: Yup.string()
            .email(t("phrases.invalid_email", "common"))
            .required(t("phrases.required_email", "common")),
        agPassword: Yup.string()
            .min(8, t("phrases.invalid_password", "common"))
            .max(16, t("phrases.invalid_password", "common"))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Invalid Password."
            )
            .required(t("phrases.required_password", "common")), 
        rgPassword: Yup.string()
            .min(8, t("phrases.2short_password", "common"))
            .max(16, t("phrases.2long_password", "common"))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Password must contain at least one lowercase, one uppercase, one number, and one special character."
            )
            .required(t("phrases.required_password", "common")),
        //rgRenterPassword: Yup.string()
        dob: Yup.date()
            .required("A date of birth is required")
            .typeError("Invalid date format")
            .max(new Date(), 'How were you born in the future? Are you secretly a time traveler?'),
    });

}

/*
rgPassword: Yup.string()
    .min(8, t("phrases.2short_password", "common"))
    .max(16, t("phrases.2long_password", "common"))
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one lowercase, one uppercase, one number, and one special character."
    )
    .required(t("phrases.required_password", "common"))
*/