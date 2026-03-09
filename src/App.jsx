//import { useState } from 'react'
import data from "../data"
function App() {
  //const [data, setData] = useState([])

  /*useEffect(() => {
    localStorage.getItem("kurssiData")
  }, [])
  */
  return (
    <>
      <Header/>
      <DrawCheckboxes/>
      <DrawCourses data={data}/>
    </>
  )
}

const DrawCheckboxes = () => {
  return (<div id="checkboxContainer">
      <div className="checkboxRow">
        <label htmlFor="all">Show all</label>
        <input type="checkbox" id="all" />
      </div>

      <div className="checkboxRow">
        <label htmlFor="math">Mathematics</label>
        <input type="checkbox" id="math" />
      </div>

      <div className="checkboxRow">
        <label htmlFor="stats">Statistics</label>
        <input type="checkbox" id="stats" />
      </div>

      <div className="checkboxRow">
        <label htmlFor="prog">Programming</label>
        <input type="checkbox" id="prog" />
      </div>

      <div className="checkboxRow">
        <label htmlFor="cs">Computer Science</label>
        <input type="checkbox" id="cs" />
      </div>

      <div className="checkboxRow">
        <label htmlFor="dumb">Dumb courses</label>
        <input type="checkbox" id="dumb" />
      </div>

      <div className="checkboxRow">
        <label htmlFor="other">Other</label>
        <input type="checkbox" id="other" />
      </div>
    </div>)
}

const DrawCourses = ({ data }) => {
  if (data.length === 0) return (<>No courses</>)

  return (
    <>
      {data.map(course => (
        <DrawCourse course={course} key={course.name}/>
      ))}
    </>
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
      This is a header
    </div>
  )
}

export default App
