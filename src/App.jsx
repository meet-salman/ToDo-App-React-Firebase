import { useState } from 'react'

function App() {

  const [text, setText] = useState("")
  const [todo, setTodo] = useState([])


  function addTodo(e) {
    e.preventDefault()

    setTodo([...todo, text])
    setText("")
  }

  return (
    <>
      {/* <!-- Navbar Started --> */}
      <div className="navbar justify-between px-8 ">

        {/* Logo */}
        <div id="logo">
          <h1 className="text-white text-[30px] font-bold"> <a href="./home.html"> myTodo </a> </h1>
        </div>


        {/* User Profile */}
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
              <li><button id="logout-btn"> Login </button></li>
              <li><button id="logout-btn"> Register </button></li>
              <li><button id="logout-btn"> Log Out </button></li>
            </ul>
          </div>
        </div>

      </div>
      {/* <!-- Navbar Ended --> */}


      <div className='mt-10'>
        <form onSubmit={addTodo} className='flex justify-center'>
          <input value={text} onChange={(e) => { setText(e.target.value) }} type="text" className='w-[30%] p-3 text-white outline-none bg-gray-700' placeholder='Create a new todo' required />
          <button type="submit" className='p-3 text-white outline-none bg-gray-700'> <i className="fa-solid fa-plus p-2 text-[10px] border-[1px] rounded-full"></i> </button>
        </form>
      </div>

      <div className='flex justify-center mt-10 pb-10'>

        <div className='w-[34%] bg-gray-700'>

          {todo.map((item, index) => {
            return <li key={index} className='flex justify-between p-3 border-b-[1px] border-gray-600 text-white'>
              <div className='flex items-center text-lg '>
              <i class="fa-solid fa-hand-point-right"></i>  &nbsp; &nbsp; {item}
              </div>
              <div>
                <button>
                  <i className="fa-solid fa-pencil mr-3 p-2 text-[10px] text-blue-400 border-[1px] border-blue-400 rounded-full"></i>
                </button>
                <button>
                  <i className="fa-solid fa-check mr-3 p-2 text-[10px] text-green-500 border-[1px] border-green-500 rounded-full"></i>
                </button>
                <button>
                  <i className="fa-solid fa-trash p-2 text-[10px] text-red-400 border-[1px] border-red-400 rounded-full"></i>
                </button>
              </div>
            </li>
          })}

        </div>

      </div>










    </>
  )
}

export default App
