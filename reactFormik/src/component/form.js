import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './form.css';

export const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(10, 'Name must be less than 10 character')
        .required('Name is required'),
      email: Yup.string()
        .email('Not Valid Email')
        .required('Email is reuired')
        .max(30, 'So long Email'),
        password: Yup.string()
        .max(20,'Password max character is 20')
        .min(8,'Password can not be less than 8')
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik.touched);
  function displyError(name){
    return formik.touched[name]  && formik.errors[name] ? <span>{formik.errors[name]}</span> : null
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>React Formik </h1>
      <div className="form-group">
        <input
          type="text"
          id="name"
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {displyError("name")}
      </div>
      <div className="form-group">
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {displyError("email")}
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          placeholder="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
     {displyError("password")}
      </div>
      <button type="submit"> Submit</button>
    </form>
  );
};
