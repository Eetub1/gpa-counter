import { useState } from "react"

const Header = ({ setSearchInput }) => {
    const [input, setInput] = useState("")

    const handleChange = event => {
        const newInput = event.target.value
        setInput(newInput)
        setSearchInput(newInput)
    }

    return (
        <div className="header">
            <p>List of all of my completed courses</p>
            <div id="searchContainer">
                <input value={input} onChange={handleChange} id="search" type="text" />
            </div>
        </div>
    )
}

export default Header