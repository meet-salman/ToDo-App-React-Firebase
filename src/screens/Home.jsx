import React, { useEffect, useState } from 'react'
import { auth } from '../components/config/config'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [todo, setTodo] = useState([])


    useEffect(() => {
        userLoginOrLogout()
    }, [])

    // Check Use Login or Logout
    function userLoginOrLogout() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(user);
            } else {
                navigate('login')
            }
        });
    }

    // Add Todo Function
    function addTodo(e) {
        e.preventDefault()

        setTodo([...todo, text])
        setText("")
    }

    // Edit Todo Function
    function editTodo(index) {
        const editedValue = prompt('Enter Edited Todo Value')

        if (editedValue !== "") {
            todo[index] = editedValue
            setTodo([...todo])
        }
        else {
            alert("Please Enter a Value")
            editTodo(index)
        }
    }

    // Dlt Todo Function
    function DltTodo(index) {
        todo.splice(index, 1)
        setTodo([...todo])
    }

    return (
        <>
            {/* Todo Section Start */}
            <div>

                {/* Todo Form Input */}
                <div className='mt-[-20px]'>
                    <form onSubmit={addTodo} className='flex justify-center'>
                        <input value={text} onChange={(e) => { setText(e.target.value) }} type="text" className='w-[30%] p-3 text-white outline-none bg-gray-700' placeholder='Create a new todo' required />
                        <button type="submit" className='p-3 text-white outline-none bg-gray-700'> <i className="fa-solid fa-plus p-2 text-[10px] border-[1px] rounded-full"></i> </button>
                    </form>
                </div>

                {/* Todo List Section */}
                <div className='flex justify-center mt-10 pb-10'>

                    <div className='w-[34%] bg-gray-700'>

                        {todo.map((item, index) => {
                            return <li key={index} className='flex justify-between p-3 border-b-[1px] border-gray-600 text-white'>
                                <div className='flex items-center text-lg '>
                                    <i className="fa-solid fa-hand-point-right"></i>  &nbsp; &nbsp; {item}
                                </div>
                                <div>
                                    <button onClick={() => editTodo(index)}>
                                        <i className="fa-solid fa-pencil mr-3 p-2 text-[10px] text-blue-400 border-[1px] border-blue-400 rounded-full"></i>
                                    </button>
                                    <button>
                                        <i className="fa-solid fa-check mr-3 p-2 text-[10px] text-green-500 border-[1px] border-green-500 rounded-full"></i>
                                    </button>
                                    <button onClick={() => DltTodo(index)}>
                                        <i className="fa-solid fa-trash p-2 text-[10px] text-red-400 border-[1px] border-red-400 rounded-full"></i>
                                    </button>
                                </div>
                            </li>
                        })}

                    </div>

                </div>

            </div>
            {/* Todo Section End */}











        </>

    )
}

export default Home