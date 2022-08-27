// import dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import components
import GemPage from './components/GemPage';
import Home2022 from './components/Home2022';
import Contact from './components/Contact';
import About from './components/About';
import WhitelistingPage from './components/WhitelistingPage';

// font awesome icons
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// library.add(fab);

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home2022/>} />
        <Route path='/:gemstoneId' element={<GemPage/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/whitelist' element={<WhitelistingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
