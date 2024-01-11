import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            {/* Hero Section Start */}
            <nav id='hero' >
                {/* Logo */}
                < div >
                    <h1 className="text-white text-[30px] font-bold"> <a href="./home.html"> myTodo </a> </h1>
                </div >


                <div id="user-profile" className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div className="flex items-center">
                            <label tabIndex={"0"} className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full border border-white">
                                    <img src="" alt="profile-pic" />
                                </div>
                            </label>
                            <p className="text-lg text-white font-medium">  </p>
                        </div>

                        <ul tabIndex={"0"} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="login">
                                    <button> Login </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="register">
                                    <button> Register </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <button> Log Out </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav >
            {/* Hero Section End */}
        </>
    )
}

export default Navbar