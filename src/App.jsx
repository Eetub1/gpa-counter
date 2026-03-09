//import { useState } from 'react'
import data from "../data"
function App() {
  //const [data, setData] = useState([])

  /*useEffect(() => {
    localStorage.getItem("kurssiData")
  }, [])
  */
  return (
    <div>
      <DrawCourses data={data}/>
    </div>
  )
}

const DrawCourses = ({ data }) => {
  if (data.length === 0) return (<>Ei kursseja</>)

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
    <div>
      <p>{course.name}</p>
      <p>{course.grade}</p>
      <p>{course.op}</p>
    </div>
  )
}

export default App
