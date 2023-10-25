import React, { useState } from "react";
import AddBook from "./AddBook";
import EditBook from "./EditBook";

function AdminDashboard() {
  const [editBooks, seteditBooks] = useState({
    id: "",
    title: "",
    author: "",
    totalBooks: 2,
    available: 1,
  });

  const [books, setBooks] = useState([
    {
      id: "1",
      title: "Book 1",
      author: "Author1",
      totalBooks: 10,
      available: 5,
    },
    {
      id: "2",
      title: "Book 2",
      author: "Author2",
      totalBooks: 8,
      available: 3,
    },
    {
      id: "3",
      title: "Book 3",
      author: "Author3",
      totalBooks: 10,
      available: 5,
    },
    {
      id: "4",
      title: "Book 4",
      author: "Author2",
      totalBooks: 7,
      available: 6,
    },
    {
      id: "5",
      title: "Book 5",
      author: "Author1",
      totalBooks: 9,
      available: 3,
    },
    {
      id: "6",
      title: "Book 6",
      author: "Author2",
      totalBooks: 4,
      available: 4,
    },
    {
      id: "7",
      title: "Book 7",
      author: "Author2",
      totalBooks: 8,
      available: 2,
    },
    {
      id: "8",
      title: "Book 8",
      author: "Author2",
      totalBooks: 2,
      available: 1,
    },
    {
      id: "9",
      title: "Book 9",
      author: "Author6",
      totalBooks: 6,
      available: 3,
    },
    {
      id: "10",
      title: "Book 10",
      author: "Author2",
      totalBooks: 5,
      available: 4,
    },
  ]);
  const handleAddBook = (newBookValues) => {
    const newBook = {
      id: +books[books.length - 1].id + 1,
      available: newBookValues.totalBooks,
      ...newBookValues,
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleEditBook = (editedBookValues) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === editedBookValues.editId
          ? {
              id: editedBookValues.editId,
              title: editedBookValues.editTitle,
              author: editedBookValues.editAuthor,
              totalBooks: editedBookValues.editTotalBooks,
              available: editedBookValues.editAvailableBooks,
            }
          : book
      )
    );
  };

  function DeleteBook(id){
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  }
  
  function  BorrowBook(id){
    setBooks((prevBooks) => prevBooks.map((book) =>{
      if(book.id === id){
        const newAvailable = Math.max(0, book.available - 1);
        return { ...book, available: newAvailable };
      }
      return {...book}
    } ));
  }

  function  ReturnBook(id){
    setBooks((prevBooks) => prevBooks.map((book) =>{
      if(book.id === id){
        const newAvailable = Math.max(0,Math.min(book.available + 1, book.totalBooks));
        return { ...book, available: newAvailable };
      }
      return {...book}
    } ));
  }
 

  return (
    <div className="dashBoard">
      <h2 className="text-center text-white py-2 bg-primary">
        Library Management
      </h2>
      <div className="d-flex justify-content-end me-5 pe-2 AddBookdiv ">
        <button
          className="btn btn-primary my-2  me-5 AddBook"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#addBook"
        >
          Add Book
        </button>
      </div>
      <div className="row ms-1 ">
        <h4 className="col-1 col-sm-1 ps-5  col-md-2 idh">Id</h4>
        <h4 className="col-2 col-sm-1 ps-0  Titleh">Title</h4>
        <h4 className="col-2 col-sm-1 ps-0 Authorh">Author</h4>
        <h4 className="col-2 col-sm-1 Availableh">Available</h4>
        <h4 className="col-5 col-sm-2  col-md-2 ps-4">Total Books</h4>
      </div>
      {books.map((book) => (
        <div className="row " key={book.id}>
          <div className="row ms-1">
            <p className="col-1 col-sm-1 ps-5  col-md-2 idp">{book.id}</p>
            <p className="col-1 col-sm-1  ps-1 Titlep">{book.title}</p>
            <p className="col-1 col-sm-1  ps-1 Authorp">{book.author}</p>
            <p className="col-1 col-sm-1 ps-5 Availablep">{book.available}</p>
            <p className="col-5 col-sm-1 ps-5 ms-4 pe-0 me-0 totalBooksp">{book.totalBooks}</p>
            <button
              className="col-1 col-sm-1  btn btn-link text-decoration-none pt-0 edit"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#editbook"
              onClick={() => seteditBooks(book)}
            >
              Edit
            </button>
            <button className="col-2 col-sm-1  btn btn-link text-decoration-none  pt-0 delete" onClick={()=> DeleteBook(book.id)}>
              Delete
            </button>
            <button className="col-2 col-sm-1  btn btn-link text-decoration-none  pt-0 borrow" onClick={()=> BorrowBook(book.id)}>
              Borrow
            </button>
            <button className="col-2 col-sm-1  btn btn-link text-decoration-none  pt-0 return" onClick={()=> ReturnBook(book.id)}>
              Return
            </button>
          </div>
        </div>
      ))}
      <AddBook onSubmit={handleAddBook} />
      <EditBook books={editBooks} onSubmit={handleEditBook} />
    </div>
  );
}

export default AdminDashboard;
