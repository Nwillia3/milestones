import React, { useState } from "react"
import Firebase from "./Firebase"
import { generateDays, generateMonths, generateYears } from "./DateOptions"
import { useSession } from "./Session"


function MilestoneForm() {
  const user = useSession()

  const [formData, setFormData] = useState({
    milestoneTitle: "",
    milestoneDescription: "",

    milestoneMonth: "",
    milestoneDay: "",
    milestoneYear: "",

    createdAt: Date.now(),
  });

  const onChange = e => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const milestoneStartDate = new Date(
      formData.milestoneYear,
      formData.milestoneMonth,
      formData.milestoneDay
    )

    const entry = { 
      title: formData.milestoneTitle,
      description: formData.milestoneDescription,
  
      startDate: milestoneStartDate,
      endDate: null,
      status: 0,
  
      createdAt: formData.createdAt,
      createdBy: user.username,
    }
    
      
    return Firebase.fdb.collection("milestones").add(entry);
  };

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
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="milestoneTitle">
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
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="milestoneDescription">
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
    )

}
export default MilestoneForm