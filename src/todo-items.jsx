import cross from "/images/icon-cross.svg";
import iconCheck from "/images/icon-check.svg";

function Todoitems({ no, display, text, setTodos, isDarkMode }) {
  // 1. Line-through (Toggle) Logic
  const toggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.no === id
          ? { ...todo, display: todo.display === "" ? "line-through" : "" }
          : todo
      )
    );
  };

  // 2. Delete Logic
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.no !== id));
  };

  return (
    <div className={`${isDarkMode? "bg-white":"bg-Navy850"} transition-all ease-in duration-500 flex justify-between items-center border-b border-Gray600 h-15`}>
      <div
        className="flex items-center gap-5 mx-5 cursor-pointer"
        onClick={() => toggle(no)}
      >
        {/* Toggle Icon Logic */}
        <div
          className={`flex items-center justify-center rounded-full w-6 h-6 border ${
            display === "line-through"
              ? "bg-linear-to-br from-checkbg1 to-checkbg2 border-none"
              : "border-Gray600"
          }`}
        >
          {display === "line-through" && <img src={iconCheck} alt="check" />}
        </div>

        {/* Apply line-through class directly to text */}
        <div
          className={`${isDarkMode? "text-Navy850":"text-Gray50"} ${
            display === "line-through" ? "line-through text-Gray400" : ""
          }`}
        >
          {text}
        </div>
      </div>

      <img
        className="mx-5 w-3 h-3 cursor-pointer hover:opacity-70"
        onClick={() => deleteTodo(no)}
        src={cross}
        alt="delete"
      />
    </div>
  );
}

export default Todoitems;
