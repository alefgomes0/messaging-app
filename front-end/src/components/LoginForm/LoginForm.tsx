import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoadingSpinner } from "../svg/LoadingSpinner";
import { useEffect, useState } from "react";
import { ExclamationIcon } from "../svg/ExclamationIcon";
import { AuthProps } from "../../types/AuthProps";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

type Values = {
  email: string;
  password: string;
};

type LoginError = {
  response: {
    data: {
      message: string;
    };
  };
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
    .required("Required"),
});

type LoginFormProps = {
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
  persist: boolean | string;
  setPersist: React.Dispatch<React.SetStateAction<boolean | string>>;
};

export const LoginForm = ({ setAuth, persist, setPersist }: LoginFormProps) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const LOGIN_URL = "/login";
  const navigate = useNavigate();

  const handleOnSubmit = async (
    formValues: Values,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        {
          email: formValues.email,
          password: formValues.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setAuth({
          success: true,
          accessToken: response.data.accessToken,
          id: response.data.id,
          email: response.data.email,
          name: response.data.name
        });
        setSubmitting(false);
        return navigate(`/${response.data.id}`);
      }
    } catch (err) {
      if ((err as LoginError).response) {
        setLoginErrorMessage((err as LoginError).response.data.message);
      } else {
        setLoginErrorMessage("No server response");
      }
      setSubmitting(false);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist ? "true" : "false");
  }, [persist]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        handleOnSubmit(values, setSubmitting);
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col w-72">
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

          {loginErrorMessage && (
            <div className="flex items-center w-72 text-red-400 ">
              <ExclamationIcon width={18} height={18} />
              <p className="pl-3">{loginErrorMessage}</p>
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
              "Login"
            )}
          </button>
          <div className="flex items-center mt-4 gap-1">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist ? true : false}
              className="w[14px] h-[14px] rounded-lg"
            />
            <label htmlFor="persist">Keep me logged in</label>
          </div>
        </Form>
      )}
    </Formik>
  );
};
