import { useRef } from "react";
import { useAuth } from "../../contexts/auth";

const Login = () => {

    const LoginRef = useRef(null);
    const { loginUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(LoginRef.current);
        // console.log(formData)
        const data = Object.fromEntries(formData)
        // console.log(data)
        loginUser(data);
    }
    return (
        <>

            <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-900">
                <h1 className="font-bold text-4xl mb-4">Login</h1>
                <form
                    ref={LoginRef}
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>

                    <input type="email" placeholder="Email" name="email"
                        className="p-2 border-2 rounded outline-none focus:border-blue-400 focus:shadow" />
                    <input type="password" placeholder="Password" name="password"
                        className="p-2 border-2 rounded outline-none focus:border-blue-400 focus:shadow" />
                    <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-400 text-white rounded shadow">Login</button>
                </form>
            </div >
        </>
    )
}

export default Login