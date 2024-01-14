import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";


const Register = () => {

    const navigate = useNavigate()

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confPasswordRef = useRef()


    // User Register Function
    function userSignUp(e) {
        e.preventDefault()

        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confPassword = confPasswordRef.current.value

        const userData = {
            name: name,
            email: email
        }

        // console.log(userData);
        

        // Checking Password Same or Not
        if (password === confPassword) {

            // User Register on Firebase
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log(user);


                    addDoc(collection(db, "users"), userData)
                        .then(() => {
                            console.log('User Added to BD');

                            emailRef.current.value = ""
                            passwordRef.current.value = ""
                            confPasswordRef.current.value = ""

                            navigate('/')

                        })
                        .catch((rej) => {
                            console.log(rej);
                        });

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
            {/* User SignUp Box */}
            <div className='flex justify-center mt-[-20px]'>
                <div className="w-[45%] p-10 bg-white">
                    <h3 className="font-bold text-2xl"> Register </h3>
                    <p className="py-4 text-gray-700"> Please Register to add todo's </p>

                    {/* SignUp Form */}
                    <form onSubmit={userSignUp}>
                        <input type="text" ref={nameRef} className='w-full p-3 border-2  outline-none' placeholder='Enter Full Name' required />
                        <input type="email" ref={emailRef} className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Email' required />
                        <div className='flex gap-3'>
                            <input type="password" ref={passwordRef} className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Password' required />
                            <input type="password" ref={confPasswordRef} className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Confirm Password' required />
                        </div>
                        <button type="submit" className='mt-5 p-3 text-white outline-none bg-gray-700'> &nbsp; Login &nbsp; </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register