import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/config/config'
import { signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {

    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    // User Register Function
    function userLogin(e) {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        console.log(email)
        console.log(password)

        // User Login Function
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                emailRef.current.value = ""
                passwordRef.current.value = ""
                navigate('/')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <>
            {/* User Login Box */}
            <div className='flex justify-center mt-[-20px]'>
                <div className="w-[45%] p-10 bg-white">
                    <h3 className="font-bold text-2xl"> Login </h3>
                    <p className="py-4 text-gray-700"> Please login to add todo's </p>

                    {/* Login Form */}
                    <form onSubmit={userLogin}>
                        <input type="email" ref={emailRef} className='w-full p-3 border-2  outline-none' placeholder='Enter Email' required />
                        <input type="password" ref={passwordRef} className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Password' required />
                        <button type="submit" className='mt-5 p-3 text-white outline-none bg-gray-700'> &nbsp; Login &nbsp; </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login 