const CourseForm = ({ setData, handleSubmit, register, reset, errors, showForm, setShowForm, showEditButton, setShowEditButton, courseToEdit }) => {
    const resetAndCloseForm = () => {
        reset()
        setShowForm(false)
        setShowEditButton(false)
    }


    const handleEdits = data => {
        const updatedCourse = {
            password: data.password,
            name: data.name,
            grade: data.grade,
            op: data.credits,
            description: Object.keys(data).filter(key => 
                data[key] === true && !["name", "grade", "credits", "password"].includes(key)
            )
        }

        fetch(`https://gpa-counter-backend.onrender.com/api/courses/${courseToEdit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCourse)
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.error) {
                    console.error("Error from server:", responseData.error)
                    return
                }
                setData(prevData => prevData.map(course => course._id === courseToEdit ? responseData : course))
                setShowEditButton(false)
                setShowForm(false)
                reset()
            })
            .catch(err => {
                console.error("Error while updating course:", err)
            })
    }


    const showAddForm = () => {
        setShowForm(true)
        reset()
    }


    const handleDelete = data => {
        fetch(`https://gpa-counter-backend.onrender.com/api/courses/${courseToEdit}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: data.password })
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.error) {
                    console.error("Error from server:", responseData.error)
                    return
                }
                setData(prevData => prevData.filter(course => course._id !== courseToEdit))
                setShowEditButton(false)
                setShowForm(false)
                reset()
            })
            .catch(err => {
                console.error("Error while deleting course:", err)
            })
    }


    const onSubmit = (data) => {
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
                // we create an array based on which checkboxes were checked
                description: Object.keys(data).filter(key => data[key] === true && key !== "name" && key !== "grade" && key !== "credits")
            })
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.error) {
                    console.error("Error from server:", responseData.error)
                    return
                }
                setData(prevData => [...prevData, responseData])
                setShowForm(!showForm)
                reset()
            })
            .catch(err => {
                console.error("Error while adding course:", err)
            })
    }

    if (showForm) return (
        <form id="newCourseForm">

            <p onClick={resetAndCloseForm} id="closeForm">x</p>

            <div className="formInputContainer">
                <label htmlFor="passwordInput">Secret password</label>
                <input type="password" id="passwordInput" {...register("password", { required: "Password is required" })}></input>
            </div>
            {errors.password && <div className="errorText">{errors.password.message}</div>}

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

            <button style={{ "display": showEditButton ? "none" : "block" }} type="button" onClick={handleSubmit(onSubmit)}>Submit</button>
            <button style={{ "display": showEditButton ? "block" : "none" }} type="button" onClick={handleSubmit(handleEdits)}>Confirm changes</button>
            <button style={{ "display": showEditButton ? "block" : "none" }} type="button" onClick={handleSubmit(handleDelete)}>Delete course?</button>
        </form>
    )

    return (
        <div id="addCourseButtonContainer">
            <button onClick={() => showAddForm()}>Add a course?</button>
        </div>
    )
}

export default CourseForm