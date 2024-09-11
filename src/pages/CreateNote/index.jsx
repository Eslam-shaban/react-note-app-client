import { useState } from "react"
import { useAuth } from "../../contexts/auth"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("#ffffff")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = {
            title,
            description,
            color
        }

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}` // Corrected header name
                },
                body: JSON.stringify(note)
            }
        )
        const data = await res.json();
        // console.log(data)
        if (data.success) {
            setTitle("")
            setDescription("")
            setColor("#ffffff")
            toast.success("Note created")
            navigate("/notes")
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4 min-h-screen justify-center items-center  bg-sky-900">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4">

                <input type="text" name="title" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} className="bg-gray-100 px-4 py-2 rounded-md" />
                <input type="text" name="description" placeholder="description" value={description} onChange={(e) => { setDescription(e.target.value) }} className="bg-gray-100 px-4 py-2 rounded-md" />
                <select name="color" value={color} onChange={(e) => { setColor(e.target.value) }} className="bg-gray-100 px-4 py-2 rounded-md">
                    <option value="#efefef">White</option>
                    <option value="#f44336">Red</option>
                    <option value="#099660">Green</option>
                    <option value="#2196F3">Blue</option>
                    <option value="#FFC107">Yellow</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Create Note
                </button>
            </form>
        </div>
    )
}

export default CreateNote