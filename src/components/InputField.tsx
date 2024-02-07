import { Dispatch, SetStateAction, FC, FormEvent, useRef } from "react";
import "./styles.css";

interface InputProps {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  handleAdd: (e: FormEvent) => void;
}

const InputField: FC<InputProps> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your task"
        className="input__box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input__submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
