import React from 'react'



const Login = () => {
    return (
        <>
            <div className='flex justify-center mt-[-20px]'>
                <div className="w-[45%] p-10 bg-white">
                    <h3 className="font-bold text-2xl"> Login </h3>
                    <p className="py-4 text-gray-700"> Please login to add todo's </p>

                    <form>
                        <input type="email" className='w-full p-3 border-2  outline-none' placeholder='Enter Email' required />
                        <input type="password" className='mt-2 w-full p-3 border-2  outline-none' placeholder='Enter Password' required />
                        <button type="submit" className='mt-5 p-3 text-white outline-none bg-gray-700'> &nbsp; Login &nbsp; </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login 