import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

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

    const [showForm, setShowForm] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)

    const [courseToEdit, setCourseToEdit] = useState(null)

    const [searchInput, setSearchInput] = useState("")

    const { handleSubmit, register, reset, formState: { errors } } = useForm({
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

    useEffect(() => {
        fetch("https://gpa-counter-backend.onrender.com/api/courses")
            .then(res => res.json())
            .then(fetchedData => {
                setData(fetchedData)
            })
            .catch(err => {
                console.error("Error while fetching data:", err)
            })
    }, [])

    const filters = {
        "all": showAll,
        "math": showMath,
        "statistics": showStatistics,
        "programming": showProgramming,
        "cs": showCS,
        "other": showOther
    }

    const filteredData = searchInput
        ? data.filter(course => course.name.trim().toLowerCase().includes(searchInput.trim().toLowerCase()))
        : data
    

    return (
        <>
            <Header setSearchInput={setSearchInput}/>

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

            <CourseForm 
                setData={setData} 
                handleSubmit={handleSubmit} 
                register={register} 
                reset={reset} 
                errors={errors} 
                showForm={showForm} 
                setShowForm={setShowForm}
                showEditButton={showEditButton}
                setShowEditButton={setShowEditButton}
                courseToEdit={courseToEdit}
            />
            <DrawCourses 
                data={filteredData} 
                filters={filters} 
                showForm={showForm} 
                setShowForm={setShowForm} 
                setShowEditButton={setShowEditButton}
                reset={reset}
                setCourseToEdit={setCourseToEdit}
            />
        </>
    )
}

export default App