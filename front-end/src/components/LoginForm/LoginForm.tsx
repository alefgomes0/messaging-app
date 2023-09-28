import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

type Values = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const handleOnSubmit = async (formValues: Values) => {
    try {
      await axios.post(
        "http://locahost:3000/login",
        (formValues.email, formValues.password)
      );
    } catch (err) {
      console.log(err);
    }
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
            className="mb-3 text-sm placeholder:text-sm pl-1 h-[26px]"
          />
          <ErrorMessage name="email" component="div" />

          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <Field
            type="password"
            name="password"
            className="mb-3 text-sm placeholder:text-sm pl-1 h-[26px]"
          />
          <ErrorMessage name="password" component="div" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-72 h-min py-1 mt-4 rounded-sm bg-fuchsia-800 text-fuchsia-50"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};
