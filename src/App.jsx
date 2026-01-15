import sunIcon from "/images/icon-sun.svg";
import moonIcon from "/images/icon-moon.svg";
import { Circle } from "lucide-react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import Todoitems from "./todo-items";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: todos.length, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.display === "";
    if (filter === "completed") return todo.display === "line-through";
    return true; // 'all'
  });

  const itemsLeft = todos.filter((todo) => todo.display === "").length;

  return (
    <div
      className={`h-full w-screen font-josefin  transition-all ease-in duration-500  ${
        isDarkMode
          ? "bg-[url('/images/bg-mobile-light.jpg')] md:bg-[url('/images/bg-desktop-light.jpg')] bg-Gray300"
          : "bg-[url('/images/bg-mobile-dark.jpg')] md:bg-[url('/images/bg-desktop-dark.jpg')] bg-gray-900"
      } bg-top bg-fixed bg-no-repeat bg-size-[100vw_30vh] py-15 px-10 md:px-50`}
    >
      <div className="flex justify-between items-center">
        <div className="font-josefin font-semibold text-Gray50 text-3xl tracking-widest">
          TODO
        </div>
        <img
          onClick={() => {
            if (!isDarkMode) {
              setIsDarkMode(true);
            } else {
              setIsDarkMode(false);
            }
          }}
          src={isDarkMode ? moonIcon : sunIcon}
          alt="icon"
        />
      </div>

      {/* TODO */}
      <div className="flex flex-col gap-5">
        <div
          className={`${
            isDarkMode ? "bg-white" : "bg-Gray600"
          } transition-all ease-in duration-500 mt-10 p-4 rounded-lg flex gap-5 items-center overflow-hidden`}
        >
          <button
            onClick={() => {
              add();
            }}
            className={`${
              isDarkMode ? "border-Gray600" : "border-Gray300"
            } border bg-white/20 rounded-full shrink-0 w-5 h-5`}
          ></button>
          <input
            type="text"
            placeholder="Create a new todo..."
            ref={inputRef}
            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 "
          />
        </div>

        <div className=" bg-white rounded-md">
          {filteredTodos.map((item, index) => {
            return (
              <Todoitems
                key={index}
                setTodos={setTodos}
                no={item.no}
                display={item.display}
                text={item.text}
                isDarkMode={isDarkMode}
              />
            );
          })}
          {itemsLeft > 0 && todos.length > 0 && (
            <div className={`flex justify-between p-5 text-sm text-Gray600 ${isDarkMode? "bg-white":"bg-Navy850"} transition-all ease-in duration-500`}>
              <div>{itemsLeft} items left</div>
              <div
                onClick={() => {
                  setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.display !== "line-through")
                  );
                }}
              >
                Clear Completed
              </div>
            </div>
          )}

         
        </div>

        <div className={`flex gap-4 justify-center py-4 rounded-lg shadow-md ${isDarkMode? "bg-white":"bg-Navy850"} transition-all ease-in duration-500`}>
            <button
              onClick={() => setFilter("all")}
              className={`${
                filter === "all" ? "text-blue-600 font-bold" : "text-gray-500"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`${
                filter === "active"
                  ? "text-blue-600 font-bold"
                  : "text-gray-500"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`${
                filter === "completed"
                  ? "text-blue-600 font-bold"
                  : "text-gray-500"
              }`}
            >
              Completed
            </button>
          </div>
      </div>
    </div>
  );
}

export default App;
