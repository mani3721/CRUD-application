import { Component } from "react";

class CRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDo: [],
      task: "",
      id: ""
    };
  }

  addTask = () => {
    if (this.state.upDateId) {
      const editedTaskList = this.state.toDo.map((task) => {
        if (this.state.id === task.id) {
          return { ...task, task: this.state.task };
        }
        return task;
      });
      this.setState({ toDo: editedTaskList, task: "", upDateId: false });
    } else if(this.state.task) {
      let newEntry = { id: Date.now(), task: this.state.task };
      this.setState({ toDo: [...this.state.toDo, newEntry] });
      this.setState({ task: "" });
    }
  };

  deleteTodo = (id) => {
    let newTasks = this.state.toDo.filter((task) => task.id !== id);
    this.setState({ toDo: newTasks });
  };

  editTodo = (index) => {
    let todo = this.state.toDo[index];
    this.setState({
      task: todo.task,
      id: todo.id,
      upDateId: true,
      editindex: index,
    });
  };

  render() {
    return (
      <>
        <div className="TodoList">
          <div className="Todobackground">
            <div className="Todohead">
              <h1 className="">To Do List</h1>
            </div>
            <div className="todobodyinput">
              <input
                type="text"
                name="task"
                className="enterinput"
                placeholder="Create Task..."
                value={this.state.task}
                onChange={(e) => this.setState({ task: e.target.value })}
              />
              <button className="create-btn" onClick={this.addTask}>
                {this.state.upDateId ? "SAVE" : "CREATE"}
              </button>
            </div>
            <div className="todobody">
              <div className="todobody2">
              {this.state.toDo && this.state.toDo.length ? '': "No Task...."}
                {this.state.toDo.map((item, i) => {
                  return (
                    <>
                      <div className="tasklist">
                        <div>{i + 1}</div>
                        <div>{item.task}</div>
                        <div className="action">
                          <button className="editbtn" onClick={() => this.editTodo(i)}>
                            Edit
                          </button>
                          <button
                           className="deletebtn"
                            onClick={() => this.deleteTodo(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CRUD;
