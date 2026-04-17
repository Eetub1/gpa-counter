const DrawCourses = ({ data, filters, setShowForm, setShowEditButton, reset, courseToEdit, setCourseToEdit }) => {
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
          <DrawCourse 
            course={course} 
            key={course.name} 
            setShowForm={setShowForm} 
            setShowEditButton={setShowEditButton} 
            reset={reset}
            courseToEdit={courseToEdit}
            setCourseToEdit={setCourseToEdit}
          />
        ))}
      </div>
    </div>
  )
}

const DrawCourse = ({ course, setShowForm, setShowEditButton, reset, courseToEdit, setCourseToEdit }) => {
  
  const handleClick = () => {
    setShowForm(true)
    setShowEditButton(true)
    setCourseToEdit(course._id)

    reset({
      name: course.name,
      grade: course.grade,
      credits: course.op,
      math: course.description.includes("math"),
      statistics: course.description.includes("statistics"),
      programming: course.description.includes("programming"),
      cs: course.description.includes("CS"),
      other: course.description.includes("other"),
    })
  }

  return (
    <div onClick={handleClick} className="courseCard">
      <p>{course.name}</p>
      <p>grade: {course.grade}</p>
      <p>credits: {course.op}</p>
    </div>
  )
}

export default DrawCourses