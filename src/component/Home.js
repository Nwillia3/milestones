import React, { useState } from "react";
import uuid from "uuid/v1";
import Moment from "react-moment";
import { getMileStones, addMileStone } from "../data/milestones";
import { generateDays, generateMonths, generateYears } from "./DateOptions"
import classNames from "classnames"

function Home() {
  const [data, setData] = useState(getMileStones());

  const [formData, setFormData] = useState({
    id: `${uuid()}`,

    title: "",
    description: "",

    milestoneMonth: "",
    milestoneDay: "",
    milestoneYear: "",

    createdAt: Date.now(),
  });


  const createMilestone = (formValues) => {

    let milestoneStartDate = new Date(
      formValues.milestoneYear,
      formValues.milestoneMonth,
      formValues.milestoneDay
    )

    let entry = { 

      title: formValues.milestoneTitle,
      description: formValues.milestoneDescription,
  
      startDate: milestoneStartDate,
      endDate: null,
      status: 0,
  
      createdAt: formValues.createdAt,
    }

    return entry

  }

  const onChange = e => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    addMileStone(createMilestone(formData));

    setData(getMileStones());
  };

  let circleStatus = classNames({
    'bg-teal-400': true
  })
  
  let displayData = data.map(milestone => (
      <div 
        key={milestone.description}
        class="flex max-w-md mx-auto my-10 rounded overflow-hidden">

        <div 
          class={`px-4 mx-2 mt-8 rounded-full h-8 w-8 border border-gray-500 ${circleStatus}`}></div>
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

  ));

  displayData = displayData.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  })

  const MonthOptions = () => {
    let data = generateMonths()

    return (
        <select
          name="milestoneMonth"
          onChange={e => onChange(e)}
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            {data.map(obj => (
                <option key={obj.value} value={obj.value}>{obj.name}</option>
            ))}
        </select>
    )
  }

  const DayOptions = () => {
    let data = generateDays()

    return (
        <select
          name="milestoneDay"
          onChange={e => onChange(e)}
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            {data.map(obj => (
                <option key={obj.value} value={obj.value}>{obj.name}</option>
            ))}
        </select>
    )  
  }

  const YearOptions = () => {
      let data = generateYears(1920, 2020)

      return (
          <select
            name="milestoneYear"
            onChange={e => onChange(e)}
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {data.map(obj => (
                  <option key={obj.value} value={obj.value}>{obj.name}</option>
              ))}
          </select>
      )  
  }

  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-black p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">Milestones</span>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </a>
          </div>
        </div>
      </nav>

      <div class="container mx-auto my-8">
        <form class="w-full max-w-lg mx-auto" onSubmit={e => onSubmit(e)}>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Month
              </label>
              <div class="relative">
                {MonthOptions()}
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Day
              </label>
              <div class="relative">
                {DayOptions()}
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Year
              </label>
              <div class="relative">
                {YearOptions()}
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="goal-title">
                Goal
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="milestoneTitle" 
                type="text"
                name="milestoneTitle"
                onChange={e => onChange(e)}
                placeholder="What do you want to accomplish?" />
            </div>

            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="goal-description">
                Description
              </label>
              <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="milestoneDescription" 
                type="text"
                name="milestoneDescription"
                onChange={e => onChange(e)}
                placeholder="How will you accomplish this? Why do you want to do this?" 
              ></textarea>
            </div>
          </div>
          <button class="bg-gray-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            Add milestone
          </button>
        </form>
      </div>

      <div class="container mx-auto my-8 w-full">
        {displayData}
      </div>
    </div>
  );
}

export default Home;
