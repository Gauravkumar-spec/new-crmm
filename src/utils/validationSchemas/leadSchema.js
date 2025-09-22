import * as Yup from "yup";

export const buildLeadValidationSchema = (isEditMode) =>
    Yup.object({
        requirement: isEditMode
            ? Yup.string().nullable()
            : Yup.string().required("Requirement is required"),

        budgetMin: Yup.number().typeError("Must be a number").required("Min budget required"),

        budgetMax: Yup.number().typeError("Must be a number").required("Max budget required"),

        location: Yup.string().required("Location is required"),
        propertyType: Yup.string().required("Property type is required"),
        followUpDate: isEditMode ? Yup.date().optional() : Yup.date().required("Follow-up date is required"),
        source: Yup.string().required("Source is required"),
        notes: Yup.string(),
    });
