import React, { useRef } from 'react'
import { auth } from '../components/config/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const confPasswordRef = useRef()


    function login(e) {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confPassword = confPasswordRef.current.value

        console.log(email)
        console.log(password)
        console.log(confPassword)


        // Checking Password Same or Not
        if (password === confPassword) {

            // User Register on Firebase
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate('/')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        } else {
            alert("Password do not match.")
        }

    }

    return (
        <>
            {/* Login Form */}
            <div className='flex justify-center mt-[-20px]'>
                <div className="w-[45%] p-10 bg-white">
                    <h3 className="font-bold text-2xl"> Register </h3>
                    <p className="py-4 text-gray-700"> Please Register to add todo's </p>

                    <form onSubmit={login}>
                        <input type="email" ref={emailRef} className='w-full p-3 border-2  outline-none' placeholder='Enter Email' required />
                        <input type="password" ref={passwordRef} className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Password' required />
                        <input type="password" ref={confPasswordRef} className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Confirm Password' required />
                        <button type="submit" className='mt-5 p-3 text-white outline-none bg-gray-700'> &nbsp; Login &nbsp; </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register