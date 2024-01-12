import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/config'
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../config/config';
import { collection, doc, addDoc, getDocs, where, query } from "firebase/firestore";




const Home = () => {

    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [todo, setTodo] = useState([])
    const [logedInUser, setUser] = useState()


    // Use Effect
    useEffect(() => {
        userLoginOrLogout()
    }, [])

    
    // Check Use Login or Logout
    function userLoginOrLogout() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(user)

                console.log(logedInUser);
                // gettingTodo()
            } else {
                navigate('login')
            }
        });
    }


    // Getting Toda Data from Firebase
    // async function gettingTodo() {

    //     const q = query(collection(db, "todo"), where("userUid", "==", logedInUser.uid));
    //     const querySnapshot = await getDocs(q);

    //     querySnapshot.forEach((doc) => {

    //         const data = { ...doc.data(), docId: doc.id }
    //         todo.push(data)
    //         console.log(todo);

    //     });
    // }


    // Add Todo Function
    async function addTodo(e) {
        e.preventDefault()

        // Todo Add in Firebase
        try {
            const docRef = await addDoc(collection(db, "todo"), {
                task: text,
                userUid: logedInUser.uid
            });
            console.log("Document written with ID: ", docRef.id);

            setTodo([...todo, text])
            setText("")
        } catch (e) {
            console.error("Error adding document: ", e);
        }


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

                        {todo.length > 0 ? todo.map((item, index) => {
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
                        }) : <h1 className='text-center p-3 text-white'> No items to show. </h1>}

                    </div>

                </div>

            </div>
            {/* Todo Section End */}











        </>

    )
}

export default Home