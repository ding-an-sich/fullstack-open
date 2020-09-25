import React from  'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce(
      // We need to provide an initial value, 
      // otherwise the function will try to sum 
      // the whole first object.
      (total, part) => total + part.exercises, 0 
    )
    return(
      <p><strong>Total exercises:</strong> {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
      </div>
    )
  }

  export default Course