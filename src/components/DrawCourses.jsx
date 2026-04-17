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

  const handleClick = () => {
    console.log("Course details:", course)
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