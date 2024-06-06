// import { useState } from 'react'
import { Router, Route, Link } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import './App.css'

function App() {
  return (
    <Router hook={useHashLocation}>
      <h1 className="text-3xl font-bold underline mb-6">
        Hello world!
      </h1>
      <Link href='/test' className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">LINK</Link>
      <Route path="/test" component={Test} />
    </Router>
  )
}

function Test() {
  return <div>
    <h1 className="text-3xl font-bold underline mb-6">
      TestPage
    </h1>
    <Link href="/" className="bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2">Return</Link>
  </div>
}

export default App
