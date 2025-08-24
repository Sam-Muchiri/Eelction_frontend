import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import County from './components/County'
import CandidateProfile from './components/Candidate'
import Constituency from './components/Constituency'
import CountiesList from './components/CountyList'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/county/:id' element={<County />} />
        <Route path='/counties' element={<CountiesList />} />
        <Route path='/candidateprof/:id' element={<CandidateProfile />} />
        <Route path='/county/:id/constituencies/:id' element={<Constituency />} />
      </Routes>
    </>
  )
}

export default App
