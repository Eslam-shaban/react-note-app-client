import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Example spinner from react-spinners
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { formatDistanceToNow } from 'date-fns';
import { AiFillPlusCircle } from "react-icons/ai";




const Notes = () => {

    const [loading, setLoading] = useState(true); // State to manage loading
    const [notes, setNotes] = useState([]);
    const { user } = useAuth();

    const handleDeleteNote = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}` // Corrected header name
                },

            }
        )
        const data = await res.json();
        setNotes(notes.filter((note) => note._id !== id))
        if (data.success) {
            toast.success("Note deleted successfully")
        }
    }
    const getAllNotes = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}` // Corrected header name
                }
            });
            const data = await res.json();
            // console.log(data);
            if (data.success) {
                setNotes(data.data);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false); // Set loading to false after the fetch is complete
        }

    }

    useEffect(() => {
        getAllNotes()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }
    return (
        <div className=" py-8 flex flex-col gap-4 bg-sky-900 w-full h-screen">
            <Link to="/notes/create"
                className="ml-4"
            >

                <AiFillPlusCircle size={40} className="text-black hover:text-blue-500" />
            </Link>
            {notes.length === 0 && (
                <h1 className="text-2xl  font-bold">No notes found</h1>
            )}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="flex flex-col gap-4 p-3 rounded-md shadow-sm shadow-gray-400"
                        style={{ backgroundColor: note.color }}>
                        <h1 className="text-2xl font-bold text-black" >{note.title}</h1>
                        <p className="text-black text-base">{note.description}</p>

                        <div className="flex justify-between">
                            <p className="text-sm text-gray-800 text-base">
                                {`Created: ${formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}`}
                            </p>

                            <div className="flex justify-between">
                                <Link to={`/notes/update/${note._id}`}>
                                    <CiEdit className="hover:cursor-pointer ml-1 hover:text-blue-800" size={20}>
                                    </CiEdit>
                                </Link>

                                <MdDelete onClick={() => handleDeleteNote(note._id)}
                                    className="hover:cursor-pointer ml-1 hover:text-red-500" size={20} />

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes