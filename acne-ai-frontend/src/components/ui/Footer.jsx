import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className="py-12 px-16 border bg-gray-100 rounded-md mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-4">
                    <div className="mx-auto">
                        <h1 className="font-bold text-lg mb-4">Info</h1>
                        <ul><Link to="/about">About</Link></ul>
                        <ul><Link to="/contact">Contact</Link></ul>
                        <ul><Link to="/how-it-works">How it works?</Link></ul>
                    </div>
                    <div className="mx-auto">
                        <h1 className="font-bold text-lg mb-4">Features</h1>
                        <ul>About</ul>
                        <ul>Contact</ul>
                        <ul>How it works?</ul>
                    </div>
                    <div className="mx-auto">
                        <h1 className="font-bold text-lg mb-4">Get started</h1>
                        <ul><Link to="/login">Login</Link></ul>
                        <ul><Link to="/register">Register</Link></ul>
                    </div>
                </div>
            </footer>
    </div>
  )
}

export default Footer