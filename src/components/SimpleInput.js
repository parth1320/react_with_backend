import { useState } from "react";

const SimpleInput = (props) => {
  const [userInput, setUserInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = userInput.trim() !== "";
  const userInputIsInValid = !inputIsValid && inputTouched;

  const inputNameChangeHandler = (event) => {
    setUserInput(event.target.value);
  };

  const formInputBlurHandle = (event) => {
    setInputTouched(true);
  };

  const formSubmitHandler = (event) => {
    setInputTouched(true);
    event.preventDefault();
    if (!inputIsValid) {
      return;
    }
    console.log(userInput);
    setUserInput("");
    setInputTouched(false);
  };

  const userInputClassName = userInputIsInValid
    ? "form-control invalid input"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={userInputClassName}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={formInputBlurHandle}
          onChange={inputNameChangeHandler}
          value={userInput}
        />
      </div>
      {userInputIsInValid && (
        <p className="error-text">Username must not be empty</p>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
