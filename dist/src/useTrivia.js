import { useState, useEffect, useCallback } from "react";

//useTrivia hook is made a custom hook so that if we want to make any future changes like adding Api calls based on
// difficulty level of question, we can easily do that
export default function useTrivia(params) {
  const [question, setQuestion] = useState(null);
  const [category, setCategory] = useState("any");
  // useCallback doesn't automatically execute anything. It returns a function
  // that can be executed by whatever code needs to trigger it. There is no listening
  // to changes that causes an execution of the callback. The array values just control
  // what instance of the function is returned. The array values do not control the timing of the function execution.
  const getQuestion = useCallback(() => {
    let url = "https://opentdb.com/api.php?amount=1";
    if (category !== "any") url += `&category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestion(data.results[0]));
  }, [category]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion, category]);

  return { question, category, setCategory, getQuestion };
}
