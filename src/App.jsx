import { useState } from 'react'

import data from "../data"

function App() {
  const [showAll, setShowAll] = useState(true)
  const [showMath, setShowMath] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [showProgramming, setShowProgramming] = useState(false)
  const [showCS, setShowCS] = useState(false)
  const [showOther, setShowOther] = useState(false)

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

      <DrawCourses data={data} filters={filters}/>
    </>
  )
}

const DrawCourses = ({ data, filters }) => {
  let combined = 0
  let points = 0
  let pointsAll = 0

  const filteredData = data.filter(course => {
    if (filters.all) return true
    return course.description.some(desc => filters[desc])
  })

  if (filteredData.length === 0) return <p>No courses found</p>

  filteredData.forEach(course => {
    pointsAll += course.op

    if (Number(course.grade)) {
      combined += course.grade * course.op
      points += course.op
    }
  })

  return (
    <div>
      
      <div id="gpaDiv">GPA: {(combined / points).toFixed(2)}</div>
      <div id="creditsDiv">Study credits: {pointsAll}</div>

      <div id="coursesContainer">
        {filteredData.map(course => (
          <DrawCourse course={course} key={course.name} />
        ))}
      </div>
    </div>
  )
}

const DrawCourse = ({ course }) => {
  return (
    <div className="courseCard">
      <p>{course.name}</p>
      <p>grade: {course.grade}</p>
      <p>credits: {course.op}</p>
    </div>
  )
}

const Header = () => {
  return (
    <div className="header">
      List of all of my completed courses
    </div>
  )
}

export default App