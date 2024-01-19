import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/config'
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../config/config';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, where, query } from "firebase/firestore";
import TodoList from '../components/TodoList';




const Home = () => {

    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [todo, setTodo] = useState([])
    const [loggedInUser, setLoggedInUser] = useState();

    const editValRef = useRef()


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
    async function editTodo(index, editedTodoVal) {

        const updatedTodo = doc(db, "todo", todo[index].docId);
        updateDoc(updatedTodo, {
            task: editedTodoVal
        })
            .then(() => {
                todo[index].task = editedTodoVal
                setTodo([...todo])
            })
            .catch((err) => {
                console.log(err);
            })
    }


    // Dlt Todo Function
    async function dltTodo(index) {

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

                        {todo.length > 0 ? todo.map((item, index) => {
                            return <TodoList key={item.docId} index={index} task={item.task} editTodo={editTodo} dltTodo={() => dltTodo(index)} />
                        }) : <h1 className='text-center p-3 text-white'> No items to show. </h1>}

                    </div>

                </div>

            </div>
            {/* Todo Section End */}











        </>

    )
}

export default Home