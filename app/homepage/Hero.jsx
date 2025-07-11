import React from 'react'
import Link from "next/link";

function Hero() {
  return (

    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/good.jpg')" }} >

      <div className="text-center bg-white bg-opacity-50 p-10 rounded-md">
        <h1 className="text-4xl font-bold">Manage Your Expense</h1>
        <h2 className="text-2xl text-blue-600">Control Your Money</h2>
        <p className="mt-4 text-lg">Start creating your budget and save your money</p>
        <Link href={'/sign-in'}>
          <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-md">Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default Hero