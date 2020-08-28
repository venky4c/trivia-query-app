## Trivia App

Pulled trivia questions from [Open Trivia Database](https://opentdb.com) and use them to create a Trivia game.

![Alt Text](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/Trivia.gif)

### Learnings from this project

- [Custom React Hook](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/useTrivia.js) for accommodating future changes based on fresh API calls
- [Multi Select](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/components/CategorySelector.js) options **added dynamically using array map fn**
- Building array by culling answers from API call with help of [spread operator](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/components/Question.js)
- *Sanitize Html* by using [dangerouslySetInnerHtml](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/components/Question.js) attribute, as we trust the API to give us non-malicious html. 
  This is done to remove the '&amp' where it should show just '&'. Similarily issue with quotes or apostrophes.
- [Lodash shuffle](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/components/Question.js) fn used to shuffle the order of answers in the array.
- When to use [useCallback](https://github.com/venky4c/trivia-question-game/blob/master/dist/src/useTrivia.js) hook? How is it different from a useEffect hook?
  *We often see this error:*
  **'React Hook useEffect has a missing dependency: 'getQuestion'. Either include it or remove the dependency  array'.** 
And most of the times, the solution is to implement useCallback(). 
useEffect has very specific timing aspects related to it. The function specified will be executed after rendering is complete and the DOM has been updated. 

This will happen after each rendering where any of the values specified in the second-argument array change. 
> useCallback doesn't automatically execute anything. It returns a function that can be executed by whatever code needs to trigger it. 
There is no listening to changes that causes an execution of the callback. The array values just control what instance of the function is returned. 
The array values do not control the timing of the function execution.

  **Wrong approach:**  
  ```javascript
  useEffect(() => {
    getQuestion();
  }, [getQuestion]);
  ```
  This will result in an infinite loop of renders, because in Js if you create two fns with the same name, it will treat is as two different functions. So the getQuestion fn inside the array dependency and the getQuestion fn implementation are treated differently, and hence useEffect thinks that is a different fn and renders again and again.
  /*...*/
  }
  
  **Correct Approach:** 
  ```javascript
  const getQuestion = useCallback(() => {    ... }, [selectedCategory]) 
  & the useEffect() would look like this: 
  useEffect(() => {   getQuestion(); }, [getQuestion,     selectedCategory]);
  ```
  
> So what we are telling React is that, 'Hey getQuestion fn is not changing, so do not render it everytime the app is rendered. But only when the selectedCategory changes.
  



