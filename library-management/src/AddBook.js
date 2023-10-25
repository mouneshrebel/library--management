import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "./App.css";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  totalBooks: Yup.number()
    .typeError("Total books must be a number")
    .required("Total number of books is required"),
});

const AddBookForm = ({ onSubmit }) => {
  const initialValues = {
    title: "",
    author: "",
    totalBooks: Yup.number,
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <div className="offcanvas offcanvas-end" id="addBook">
      <div className="offcanvas-header">
        <h1 className="offcanvas-title">Add Book</h1>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="my-3">
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Title name"
                className="inputbox"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="my-3">
              <Field
                type="text"
                id="author"
                name="author"
                placeholder="Author name"
                className="inputbox"
              />
              <ErrorMessage name="author" component="div" className="error" />
            </div>

            <div className="my-3">
              <Field
                type="text"
                id="totalBooks"
                name="totalBooks"
                placeholder="Total books"
                className="inputbox"
              />
              <ErrorMessage
                name="totalBooks"
                component="div"
                className="error"
              />
            </div>
            <button
              className="btn btn-primary my-2 inputbox"
              type="submit"
              data-bs-dismiss="offcanvas"
            >
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddBookForm;
