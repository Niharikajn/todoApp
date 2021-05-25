import React from 'react';
import './App.css';

const TodoList = (props) => {

  return (
    <>
      {props.todos && props.todos.length > 0 ?
        props.todos.map((element, index) => {
          return (
            <div className="checkbox" >
              <label className={props.isChecked ? 'completed' : null}>
                <input type="checkbox" id={element.id} key={element.id}
                 defaultChecked={props.isChecked}
                  onClick={props.handleClick} />
                {element.task}</label>
            </div>
          )
        })
        : <p>no records found</p>}
    </>
  );
}

export default TodoList;
