import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import {getPassword} from "../secret.js"

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

      <NewCourseForm setData={setData}/>

      <DrawCourses data={data} filters={filters}/>
    </>
  )
}


const NewCourseForm = ({ setData}) => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      grade: "",
      credits: "",
      math: false,
      statistics: false,
      programming: false,
      cs: false,
      other: false
    }
  })

  const [showForm, setShowForm] = useState(false)

  const openForm = () => {
    if (window.prompt("Enter password to add a course") !== getPassword()) {
      alert("Wrong password")
      return
    }
    setShowForm(true)
  }

  const onSubmit = (data) => {
    console.log(data)
    setShowForm(!showForm)

    fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        grade: data.grade,
        op: data.credits,
        //we create an array based on which checkboxes were checked
        description: Object.keys(data).filter(key => data[key] === true && key !== "name" && key !== "grade" && key !== "credits")
      })
    })
    .then(res => res.json())
    .then(responseData => {
      console.log("Course added successfully:", responseData)
      setData(prevData => [...prevData, responseData])
    })
    .catch(err => {
      console.error("Error while adding course:", err)
    })
  }

  if (showForm) return (
    <form onSubmit={handleSubmit(onSubmit)} id="newCourseForm">

      <div className="formInputContainer">
        <label htmlFor="courseName">Course name</label>
        <input id="courseName" {...register("name", { required: "Course name is required" })}></input>
      </div>
      {errors.name && <div className="errorText">{errors.name.message}</div>}

      <div className="formInputContainer">
        <label htmlFor="courseGrade">Grade</label>
        <input id="courseGrade" {...register("grade", { required: "Grade is required" })}></input>
      </div>
      {errors.grade && <div className="errorText">{errors.grade.message}</div>}

      <div className="formInputContainer">
        <label htmlFor="courseCredits">Credits</label>
        <input id="courseCredits" {...register("credits", { required: "Credits is required" })}></input>
      </div>
      {errors.credits && <div className="errorText">{errors.credits.message}</div>}

      <div id="formCheckboxContainer">

        <div className="formCheckboxRow">
          <label htmlFor="mathInput">Mathemathics</label>
          <input type="checkbox" id="mathInput" {...register("math")}></input>
        </div>

        <div className="formCheckboxRow">
          <label htmlFor="statsInput">Statistics</label>
          <input type="checkbox" id="statsInput" {...register("statistics")}></input>
        </div>

        <div className="formCheckboxRow">
          <label htmlFor="progInput">Programming</label>
          <input type="checkbox" id="progInput" {...register("programming")}></input>
        </div>

        <div className="formCheckboxRow">
          <label htmlFor="csInput">Computer Science</label>
          <input type="checkbox" id="csInput" {...register("cs")}></input>
        </div>

        <div className="formCheckboxRow">
          <label htmlFor="otherInput">Other</label>
          <input type="checkbox" id="otherInput" {...register("other")}></input>
        </div>

      </div>

      <button type="submit">Submit</button>
    </form>
  )

  return (
    <div>
      <button onClick={openForm}>Add a course?</button>
    </div>
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

  filteredData.sort((a, b) => {
    return a.name.trim().localeCompare(b.name.trim(), 'fi', {sensitivity: 'base'});
  })

  return (
    <div id="mainContent">
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