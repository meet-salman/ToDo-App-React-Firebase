import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/config'
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../config/config';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, where, query } from "firebase/firestore";




const Home = () => {

    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [todo, setTodo] = useState([])
    const [loggedInUser, setLoggedInUser] = useState();
    const [showTodo, setShowTodo] = useState(true);


    // Use Effect
    useEffect(() => {
        userLoginOrLogout()
    }, [])

    // Use Effect
    useEffect(() => {
        gettingTodo()
    }, [loggedInUser])


    // Check Use Login or Logout
    function userLoginOrLogout() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                const q = query(collection(db, "users"), where("uid", "==", user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {

                    setLoggedInUser(doc.data())
                    console.log(loggedInUser);

                });

            } else {
                navigate('login')
            }
        });
    }


    // Getting Toda Data from Firebase
    async function gettingTodo() {
        setTodo([])

        const q = query(collection(db, "todo"), where("uid", "==", loggedInUser.uid));
        const querySnapshot = await getDocs(q);

        const todoData = []

        querySnapshot.forEach((doc) => {

            const data = { ...doc.data(), docId: doc.id }
            // todo.push(data)
            todoData.push(data)
            console.log(todoData);
            setTodo(todoData)
        });
    }


    // Add Todo Function
    async function addTodo(e) {
        e.preventDefault()

        // Todo Add in Firebase
        try {
            const docRef = await addDoc(collection(db, "todo"), {
                task: text,
                uid: loggedInUser.uid,
                status: 'pending'
            });
            console.log("Document written with ID: ", docRef.id);

            // setTodo([...todo, text])
            setText("")
            gettingTodo()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    // Edit Todo Function
    async function editTodo(index) {
        // const editedValue = prompt('Enter Edited Todo Value')

        // if (editedValue !== "") {

        //     const docRef = doc(db, 'todo', todo[index].docId)

        //     await updateDoc(docRef, { task: editedValue })
        //         .then(() => {
        //             todo[index].task = editedValue
        //             setTodo([...todo])
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
        // }
        // else {
        //     alert("Please Enter a Value")
        //     editTodo(index)
        // }

        setShowTodo(true)
    }


    // Dlt Todo Function
    async function DltTodo(index) {

        await deleteDoc(doc(db, "todo", todo[index].docId))
            .then(() => {
                todo.splice(index, 1)
                setTodo([...todo])
            })
            .catch((err) => {
                console.log(err);
            })
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

                        {showTodo ? todo.length > 0 ? todo.map((item, index) => {
                            return <li key={index} className='flex justify-between p-3 border-b-[1px] border-gray-600 text-white'>
                                <div className='flex items-center text-lg '>
                                    <i className="fa-solid fa-hand-point-right"></i>  &nbsp; &nbsp; {item.task}
                                </div>
                                <div>
                                    <button onClick={() => setShowTodo(false)}>
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
                        }) : <h1 className='text-center p-3 text-white'> No items to show. </h1> : <div>

                            <form onSubmit={editTodo} className='flex justify-between p-3 border-b-[1px] border-gray-600 text-white'>
                                <input type="text" placeholder='Enter Edited Value' className='bg-gray-700 outline-none ' />
                                <button type='submit'>
                                    <i className="fa-solid fa-arrow-right p-2 text-[10px] text-blue-400 border-[1px] border-blue-400 rounded-full"></i>
                                </button>
                            </form>
                        </div>}

                    </div>

                </div>

            </div>
            {/* Todo Section End */}











        </>

    )
}

export default Home