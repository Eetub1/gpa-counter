import { useState, useEffect } from "react"

import DrawCourses from "./components/DrawCourses"
import CourseForm from "./components/CourseForm"
import Header from "./components/Header"

function App() {
  const [showAll, setShowAll] = useState(true)
  const [showMath, setShowMath] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [showProgramming, setShowProgramming] = useState(false)
  const [showCS, setShowCS] = useState(false)
  const [showOther, setShowOther] = useState(false)
  const [data, setData] = useState([])

  //this could be put in it's own file but this is really simple
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData)
      })
      .catch(err => {
        console.error("Error while fetching data:", err)
      })
  }, [data])

  const filters = {
    "all": showAll,
    "math": showMath,
    "statistics": showStatistics,
    "programming": showProgramming,
    "CS": showCS,
    "other": showOther
  }

  return (
    <>
      <Header/>

      <div id="checkboxContainer">
        <div className="checkboxRow">
          <label htmlFor="all">Show all</label>
          <input onChange={() => setShowAll(!showAll)} type="checkbox" id="all" defaultChecked={true} />
        </div>

        <div className="checkboxRow">
          <label htmlFor="math">Mathematics</label>
          <input onChange={() => setShowMath(!showMath)} type="checkbox" id="math" />
        </div>

        <div className="checkboxRow">
          <label htmlFor="stats">Statistics</label>
          <input onChange={() => setShowStatistics(!showStatistics)} type="checkbox" id="stats" />
        </div>

        <div className="checkboxRow">
          <label htmlFor="prog">Programming</label>
          <input onChange={() => setShowProgramming(!showProgramming)} type="checkbox" id="prog" />
        </div>

        <div className="checkboxRow">
          <label htmlFor="cs">Computer Science</label>
          <input onChange={() => setShowCS(!showCS)} type="checkbox" id="cs" />
        </div>

        <div className="checkboxRow">
          <label htmlFor="other">Other</label>
          <input onChange={() => setShowOther(!showOther)} type="checkbox" id="other" />
        </div>
      </div>

      <CourseForm setData={setData}/>
      <DrawCourses data={data} filters={filters}/>
    </>
  )
}

export default App