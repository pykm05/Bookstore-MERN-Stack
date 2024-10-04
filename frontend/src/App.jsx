import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

// SPA (Single Page Application)
// Loads and updates a single HTML page as user interacts with app

// React Router Dom
// Directs you to certain page depending on request
// Updates view without reloading page
const App = () => {
  return (
    // Define how to navigate thorough different pages in application
    // Renders componenets based on url
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='./books/edit/:id' element={<EditBook />} />
      <Route path='./books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App