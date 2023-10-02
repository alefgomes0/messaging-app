import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoadingSpinner } from "../svg/LoadingSpinner";
import { useState } from "react";
import { ExclamationIcon } from "../svg/ExclamationIcon";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

type Values = {
  name: string;
  email: string;
  password: string;
};

type RegisterError = {
  response: {
    data: {
      message: string;
    };
  };
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must have at least 4 characters")
    .max(25, "Name must have at most 25 characters")
    .required("Required"),
  email: Yup.string()
    .min(4, "Email must have at least 4 characters")
    .max(50, "Email must have at most 50 characters")
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(5, "Password must have at least 5 characters")
    .max(30, "Password must have at most 30 characters")
    .required("Required"),
});

type RegisterFormProps = {
  setNewAccountCreated: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterForm = ({
  setNewAccountCreated,
  setShowRegisterForm,
}: RegisterFormProps) => {
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const LOGIN_URL = "/register";

  const handleOnSubmit = async (
    formValues: Values,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        {
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setSubmitting(false);
        setNewAccountCreated(true);
        setShowRegisterForm(false);
      }
    } catch (err) {
      if ((err as RegisterError).response) {
        setRegisterErrorMessage((err as RegisterError).response.data.message);
      } else {
        setRegisterErrorMessage("No server response");
      }
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        handleOnSubmit(values, setSubmitting);
      }}
      validationSchema={RegisterSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col w-72">
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          <Field
            type="text"
            name="name"
            placeholder="John Doe"
            className={`mb-3 text-sm placeholder:text-sm pl-1 h-[26px] rounded-sm border-none outline-none focus:ring-2 ${
              errors.email && touched.email
                ? "focus:ring-red-400"
                : "focus:ring-fuchsia-400"
            }
            }`}
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm mt-[-9px] mb-[9px]"
          />

          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <Field
            type="email"
            name="email"
            placeholder="johndoe@email.com"
            className={`mb-3 text-sm placeholder:text-sm pl-1 h-[26px] rounded-sm border-none outline-none focus:ring-2 ${
              errors.email && touched.email
                ? "focus:ring-red-400"
                : "focus:ring-fuchsia-400"
            }
            }`}
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-[-9px] mb-[9px]"
          />

          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <Field
            type="password"
            name="password"
            className={`mb-3 text-sm placeholder:text-sm pl-1 h-[26px] rounded-sm border-none outline-none focus:ring-2 ${
              errors.password && touched.password
                ? "focus:ring-red-400"
                : "focus:ring-fuchsia-400"
            }
            }`}
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-[-9px]"
          />

          {registerErrorMessage && (
            <div className="flex items-center w-72 text-red-400 ">
              <ExclamationIcon width={18} height={18} />
              <p className="pl-3">{registerErrorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-72 h-min flex items-center justify-center py-1 mt-4 rounded-sm bg-fuchsia-800 hover:bg-fuchsia-700 transition-colors text-fuchsia-50 border-none  
            shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.25)_inset]"
          >
            {isSubmitting ? (
              <>
                <p className="pr-4">Processing...</p>
                <LoadingSpinner width={15} height={15} />
              </>
            ) : (
              "Register"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};
