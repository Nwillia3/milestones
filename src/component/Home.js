import React, { useState } from "react";
import { Link } from "react-router-dom"
import Navbar from "./Navbar"

function HomePage() {

  return (
    <React.Fragment>
      <Navbar />
      <div class="py-20" style={{ background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"}}>
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold mb-2 text-white">
            Milestones App
          </h2>
          <h3 class="text-2xl mb-8 text-gray-200">
            Track your daily milestones, and analyze them to achieve more in your life.
          </h3>

          <Link to="/login" class="bg-white rounded-full py-4 px-8 shadow">
            Write your first milestone!
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;
