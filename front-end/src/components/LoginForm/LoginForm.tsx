import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

type Values = {
  email: string;
  password: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(4, "Email must have at least 4 characters")
    .max(50, "Email must have at most 50 characters")
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(5, "Password must have at least 5 characters")
    .max(30, "Password must have at most 30 characters")
    .required(),
});

export const LoginForm = () => {
  const handleOnSubmit = async (formValues: Values) => {
    console.log(formValues)
/*     try {
      await axios.post(
        "http://locahost:3000/login",
        (formValues.email, formValues.password)
      );
    } catch (err) {
      console.log(err);
    } */
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        handleOnSubmit(values);
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col w-72">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <Field
            type="email"
            name="email"
            placeholder="johndoe@email.com"
            className="mb-3 text-sm placeholder:text-sm pl-1 h-[26px] rounded-sm border-none outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-[-9px]"/>

          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <Field
            type="password"
            name="password"
            className="mb-3 text-sm placeholder:text-sm pl-1 h-[26px] rounded-sm border-none outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-[-9px]"/>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-72 h-min py-1 mt-4 rounded-sm bg-fuchsia-800 hover:bg-fuchsia-700 transition-colors text-fuchsia-50 border-none"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};
