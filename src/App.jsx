import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import { Circle } from "lucide-react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import Todoitems from "./todo-items";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
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

  return (
    <div className={`h-screen w-screen font-josefin  transition-all ease-in duration-500  ${isDarkMode? "bg-[url('./images/bg-mobile-light.jpg')] md:bg-[url('./images/bg-desktop-light.jpg')] bg-Gray300":"bg-[url('./images/bg-mobile-dark.jpg')] md:bg-[url('./images/bg-desktop-dark.jpg')] bg-gray-900"} bg-top bg-fixed bg-no-repeat bg-size-[100vw_30vh] py-15 px-10`}>
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
        <div className={`${isDarkMode? "bg-white":"bg-Gray600"} transition-all ease-in duration-500 mt-20 p-4 rounded-lg flex gap-5 items-center overflow-hidden`}>
          <button
            onClick={() => {
              add();
            }}
            className={`${isDarkMode? "border-Gray600":"border-Gray300"} border shrink-0 w-5 h-5`}
          ></button>
          <input
            type="text"
            placeholder="Create a new todo..."
            ref={inputRef}
            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 "
          />
        </div>

        <div className=" bg-white rounded-md">
          {todos.map((item, index) => {
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
          <div className="flex justify-between p-5 text-sm text-Gray600">
            <div>5 items left</div>
            <div>Clear Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
