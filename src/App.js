
import React, { Component } from 'react';
import TodoList from './TodoList';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      data: [],
      isChecked: false,
      isError:false
    };


  }
  async componentDidMount() {
    let getTodos = localStorage.getItem("task");
    if (getTodos) {
      let todos = JSON.parse(getTodos);
      this.setState({
        data: todos,

      })
    } else {
      this.setState({
        data: [],
      })
    }
  }

  handleChange = (e) => {
    if (e.target.value.length > 20) {
      this.setState({isError:true})
    } else {
      this.setState({ task: e.target.value });
    }

  }
  addTask = () => {
    console.log(this.state.task.length)
    if (this.state.task && this.state.task.length <= 20) {
      var obj = {
        task: this.state.task,
        isCompleted: false,
        createdDate: new Date(),
      }
      this.state.data.push(obj);
      localStorage.setItem("task", JSON.stringify(this.state.data));
      this.setState({ task: '' })
    }


  }

  click = (e) => {
    console.log(e.target.id)
    const id = e.target.id;
    this.state.data[id].isCompleted = true;
    localStorage.setItem('task', JSON.stringify(this.state.data));
  }
  sortTask = () => {
    const sortedTodos = [].concat(this.state.data)
      .sort((a, b) => a.task > b.task ? 1 : -1)
    this.setState({ data: sortedTodos });
  }

  render() {
    var isCompleted = [], Completed = [];
    if (this.state.data && this.state.data.length > 0) {
      isCompleted = this.state.data.filter((element, index, array) => {
        return !element.isCompleted;
      })
      Completed = this.state.data.filter((element, index, array) => {
        return element.isCompleted;
      })
      console.log("that", this.state.data);
    }

    return (
      <div >
        <div>
          <div className="container">
            <div className="row">
              <div className="todolist">
                <header>
                  <h1 className="tasks">Tasks </h1>
                  <span>
                    <input type="text"
                      className={this.state.isError ?"error" : "form-control add-todo"}
                      placeholder="Add task" value={this.state.task} onChange={this.handleChange} />
                    <button onClick={this.addTask}>Add</button>
                    <button onClick={this.sortTask}>Sort</button>
                  </span>
                 

                </header>
                <div className="content">
                  <div>
                    <label className="todo">To-do</label>
                    <TodoList todos={isCompleted} handleClick={this.click} isChecked={this.state.isChecked} />
                  </div>
                  <div>
                    <label className="todo">Completed</label>
                    <TodoList todos={Completed} isChecked={true} />
                  </div>
                </div>
              </div></div></div></div></div>

    );
  }
}

export default App;
