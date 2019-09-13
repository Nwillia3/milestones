import React, { useState } from "react"
import Navbar from "./Navbar"
import Moment from "react-moment";
import classNames from "classnames"
import MilestoneForm from "./MilestoneForm"

function UsersHomePage() {
  let [state, setstate] = useState({
    data: []
  })

  const generateDisplayData = (milestones) => {

    let displayData = milestones.map(milestone => {
      let circleStatus = classNames({
        'bg-teal-400': milestone.status === 1 ? true : false
      })
  
      
      return (
        <div 
          key={milestone.id}
          class="flex max-w-md mx-auto my-10 rounded overflow-hidden">

          <div class={`px-4 mx-2 mt-8 rounded-full h-8 w-8 border border-gray-500 ${circleStatus}`}></div>
          <div>
            <div class="px-6 py-4">
              <div class="py-4 font-thin">
                <Moment format="YYYY-MM-DD">{milestone.startDate}</Moment>
              </div>

              <div class="font-bold text-xl mb-2">
                {milestone.title}
              </div>
              <p class="text-gray-700 text-base">
                {milestone.description}
              </p>
            </div>
            <div class="px-6 py-4">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
            </div>

          </div>

        </div>
      )
    })

    return displayData
  }


  return (
    <div>
      <Navbar />

      <div class="container mx-auto my-8">
        <MilestoneForm />
      </div>

      <div class="container mx-auto my-8 w-full">
        {generateDisplayData(state.data)}
      </div>
    </div>
  );
}

export default UsersHomePage