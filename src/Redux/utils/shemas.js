import * as Yup from "yup";

export const addContactSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  number: Yup.string().required("Required"),
});