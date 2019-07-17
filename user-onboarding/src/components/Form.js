import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegisterForm({ values, errors, touched }) {

    return (
      <div className="loginForm">
        <Form>
            <Field
              type="text"
              name="username"
              placeholder="Username"
            />
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field
              type="email"
              name="email"
              placeholder="Email"
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field
              type="password"
              name="password"
              placeholder="Password"
            />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <label>

            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
            Accept our Terms and Conditions?
            {touched.terms && errors.terms && <p>{errors.terms}</p>}
            </label>
          <button type="submit">Submit!</button>
        </Form>
      </div>
    );
}
const FormikRegisterForm = withFormik({
    mapPropsToValues({ username, password, email, terms }) {
      return {
        username: username || "",
        email: email || "",
        password: password || "",
        terms: terms || false
      };
    },

    // Validation
    validationSchema: Yup.object().shape({
        username: Yup.string()
          .min(6)
          .required("Common Dummy, you need a username..."),
        email: Yup.string()
          .email("OOPS! It needs to be an actual E-mail address dude!")
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
        terms: Yup.boolean()
            .required("You gotta accept!")
      }),
    //   End Validation

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === "alreadytaken@atb.dev") {
          setErrors({ email: "That email is already taken" });
        } else {
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              console.log("SUCCESFUL POST", res); // Data was created successfully and logs to console
              resetForm();
              setSubmitting(false);
              window.alert(`Success! ${res.data.username}, your account was created!`)
            })
            .catch(err => {
              console.log("OH NO, AN ERROR", err); // There was an error creating the data and logs to console
              setSubmitting(false);
            });
        }
      }
  })(RegisterForm);


export default FormikRegisterForm

