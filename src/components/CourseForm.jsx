import { useState } from "react"
import { useForm } from "react-hook-form"

const CourseForm = ({ setData}) => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
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

  const onSubmit = (data) => {
    console.log(data)
    setShowForm(!showForm)

    fetch("https://gpa-counter-backend.onrender.com/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: data.password,
        name: data.name,
        grade: data.grade,
        op: data.credits,
        //we create an array based on which checkboxes were checked
        description: Object.keys(data).filter(key => data[key] === true && key !== "name" && key !== "grade" && key !== "credits")
      })
    })
    .then(res => res.json())
    .then(responseData => {
      if (responseData.error) {
        console.error("Error from server:", responseData.error)
        return
      }
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
        <label htmlFor="passwordInput">Secret password</label>
        <input type="password" id="passwordInput" {...register("password", { required: "Password is required" })}></input>
      </div>

      <div className="formInputContainer">
        <label htmlFor="courseName">Course name</label>
        <input id="courseName" {...register("name", { required: "Course name is required" })}></input>
      </div>
      {errors.name && <div className="errorText">{errors.name.message}</div>}

      <div className="formInputContainer">
        <label htmlFor="courseGrade">Grade</label>
        <input id="courseGrade" {...register("grade", { 
          required: "Grade is required", 
          pattern: { value: /^([1-5]|hyv)$/i, message: "Please enter a valid grade" } })}></input>
      </div>
      {errors.grade && <div className="errorText">{errors.grade.message}</div>}

      <div className="formInputContainer">
        <label htmlFor="courseCredits">Credits</label>
        <input id="courseCredits" {...register("credits", { 
          required: "Credits is required", 
          pattern: { value: /^[0-9]\d*$/, message: "Please enter a valid number of credits" } })}></input>
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
    <div id="addCourseButtonContainer">
      <button onClick={() => setShowForm(true)}>Add a course?</button>
    </div>
  )
}

export default CourseForm