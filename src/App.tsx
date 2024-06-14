// import { useState } from 'react'
import { Switch, Router, Route, Link } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

// import Header from './Header'

function App() {
  return (
    <div className="min-h-full">
      <Switch>
        <Router hook={useHashLocation}>
          <div className='p-5'>
            <Link href='/test' className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">LINK</Link>
          </div>
          <Route path="/" component={Root} />
          <Route path="/test" component={Test} />
        </Router>
      </Switch>
    </div>
  )
}

function Root() {
  return <div className='p-5'>
    Root
  </div>
}

function Test() {
  return <div>
    <div className='p-5'>
      <h1 className="text-3xl font-bold underline mb-6">
        TestPage
      </h1>
      <Link href="/" className="bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2">Return</Link>
    </div>

    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
    </main>
  </div>
}

export default App
