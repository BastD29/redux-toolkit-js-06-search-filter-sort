import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/search";

export default function Search() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const onInputChangeHandler = (e) => {
    setInputValue(e.target.value);
    // console.log("e", e);
  };

  // !in the case we want to reuse the search in several components through the app,
  // !we should pass this function from outside of this component
  const onSearchHandler = () => {
    dispatch(searchActions.setSearchTerm(inputValue));
  };

  const onClearSearchTermHandler = () => {
    setInputValue("");
    dispatch(searchActions.clearSearchTerm());
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search"
        value={inputValue}
        onChange={onInputChangeHandler}
        placeholder="Search"
      />

      {inputValue.length > 0 && (
        <button
          onClick={onClearSearchTermHandler}
          type="button"
          id="search-clear-button"
        >
          X
        </button>
      )}

      <button onClick={onSearchHandler} type="button" id="search-button">
        Search
      </button>
    </div>
  );
}
