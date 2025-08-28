import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navb'
import Home from './components/Home'
import County from './components/County'
import CandidateProfile from './components/Candidate'
import Constituency from './components/Constituency'
import CountiesList from './components/CountyList'
import PresidentsPage from "./components/PresidentsPage";
import RankRefPage from "./components/RankRefPage";
import { ScrollToHash } from './components/ScrollToHash'

function App() {

  return (
    <>
      
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/county/:id' element={<County />} />
        <Route path='/counties' element={<CountiesList />} />
        <Route path='/candidateprof/:id' element={<CandidateProfile />} />
        <Route path='/county/:id/constituencies/:id' element={<Constituency />} />
        <Route path="/presidents" element={<PresidentsPage />} />
        <Route path='/rating-criteria' element={<RankRefPage />} />
      </Routes>
    </>
  )
}

export default App
