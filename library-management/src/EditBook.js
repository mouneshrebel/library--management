import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "./App.css";

const validationSchema = Yup.object().shape({
  editTitle: Yup.string().required("Title is required"),
  editAuthor: Yup.string().required("Author is required"),
  editAvailableBooks: Yup.number()
    .typeError("Available books must be a number")
    .required("Available books is required")
    .test(
      "availableBooksValidation",
      "Available books cannot exceed total books",
      function (value) {
        const totalBooks = this.parent.editTotalBooks;
        return value <= totalBooks;
      }
    ),
  editTotalBooks: Yup.number()
    .typeError("Total books must be a number")
    .required("Total number of books is required"),
});

const EditBookForm = ({ books, onSubmit }) => {
  const initialValues = {
    editId: books.id,
    editTitle: books.title,
    editAuthor: books.author,
    editAvailableBooks: books.available,
    editTotalBooks: books.totalBooks,
  };
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <div className="offcanvas offcanvas-end" id="editbook">
      <div className="offcanvas-header">
        <h1 className="offcanvas-title">Edit Book</h1>
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
          enableReinitialize
        >
          <Form>
            <div className="my-3">
              <Field
                type="text"
                id="editTitle"
                name="editTitle"
                placeholder="Title name"
                className="inputbox"
              />
              <ErrorMessage
                name="editTitle"
                component="div"
                className="error"
              />
            </div>

            <div className="my-3">
              <Field
                type="text"
                id="editAuthor"
                name="editAuthor"
                placeholder="Author name"
                className="inputbox"
              />
              <ErrorMessage
                name="editAuthor"
                component="div"
                className="error"
              />
            </div>
            <div className="my-3">
              <Field
                type="text"
                id="editAvailableBooks"
                name="editAvailableBooks"
                placeholder="Available books"
                className="inputbox"
              />
              <ErrorMessage
                name="editAvailableBooks"
                component="div"
                className="error"
              />
            </div>
            <div className="my-3">
              <Field
                type="text"
                id="editTotalBooks"
                name="editTotalBooks"
                placeholder="Available books"
                className="inputbox"
              />
              <ErrorMessage
                name="editTotalBooks"
                component="div"
                className="error"
              />
            </div>
            <button className="btn btn-primary my-2 inputbox" type="submit"  data-bs-dismiss="offcanvas">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditBookForm;
