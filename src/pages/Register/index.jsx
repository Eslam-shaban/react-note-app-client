import { useRef } from "react";
import { useAuth } from '../../contexts/auth'

const Register = () => {

    const registerRef = useRef(null);
    const { registerUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(registerRef.current);
        // console.log(formData)
        const data = Object.fromEntries(formData)
        // console.log(data)
        registerUser(data);

    }
    return (
        <>

            <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-900">
                <h1 className="font-bold text-4xl mb-4">Register</h1>
                <form
                    ref={registerRef}
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>

                    <input type="email" placeholder="Email" name="email"
                        className="p-2 border-2 rounded outline-none focus:border-blue-400 focus:shadow" />
                    <input type="password" placeholder="Password" name="password"
                        className="p-2 border-2 rounded outline-none focus:border-blue-400 focus:shadow" />
                    <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-400 text-white rounded shadow">Register</button>
                </form>
            </div >
        </>
    )
}

export default Register