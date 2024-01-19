import React, { useRef, useState } from 'react'

const TodoList = ({ index, task, editTodo, dltTodo }) => {

    const [showTodo, setShowTodo] = useState(true);

    const editedTodoVal = useRef()

    // Saving Edited Todo Value
    const saveEditedTodo = () => {
        editTodo(index, editedTodoVal.current.value)
        setShowTodo(true)
    }

    return (
        <>
            {showTodo ?
                <li className='flex justify-between p-3 border-b-[1px] border-gray-600 text-white'>
                    <div className='flex items-center text-lg '>
                        <i className="fa-solid fa-hand-point-right"></i>  &nbsp; &nbsp; {task}
                    </div>
                    <div>
                        <button onClick={() => setShowTodo(false)}>
                            <i className="fa-solid fa-pencil mr-3 p-2 text-[10px] text-blue-400 border-[1px] border-blue-400 rounded-full"></i>
                        </button>
                        {/* <button>
                            <i className="fa-solid fa-check mr-3 p-2 text-[10px] text-green-500 border-[1px] border-green-500 rounded-full"></i>
                        </button> */}
                        <button onClick={dltTodo}>
                            <i className="fa-solid fa-trash p-2 text-[10px] text-red-400 border-[1px] border-red-400 rounded-full"></i>
                        </button>
                    </div>
                </li> : <div className='flex justify-between p-3 border-b-[1px] border-gray-600 text-white'>

                    <input type="text" ref={editedTodoVal} placeholder='Enter Edited Value' className='bg-gray-700 outline-none ' />
                    <button onClick={saveEditedTodo}>
                        <i className="fa-solid fa-arrow-right p-2 text-[10px] text-blue-400 border-[1px] border-blue-400 rounded-full"></i>
                    </button>
                </div>}



        </>
    )
}

export default TodoList