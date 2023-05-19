import {Component} from "react"

import "./index.css"
import EachTodoItem from "../EachTodoItem"

interface IProps{

}

interface IState{
    todoList : any[];
    inputTodo : string,
    isButton : boolean,
    activeId : number
}

class TodoApplication extends Component<IProps,IState>{

    state : IState ={
        todoList : [],
        inputTodo : "",
        isButton : false,
        activeId : 0
    }

    getTodosInList=()=>{
        const {todoList,inputTodo,isButton} = this.state
        if(!isButton){
            const addTodoItem = {
                id : todoList.length,
                todoTask : inputTodo,
                isEdit : false,
                isComplete : false
            }

            this.setState(p => ({todoList : [...p.todoList,addTodoItem],inputTodo : ""}))
        }else{
            const {todoList,activeId} = this.state 
            const upatedList = todoList.map(item => item.id === activeId ? ({...item,todoTask:inputTodo}):(item))
            this.setState({todoList:upatedList,isButton:false,inputTodo:""})
        }
    }

    deleteTodoItem=(id : number)=>{
        const {todoList} = this.state 
        const updatedList = todoList.filter(item => item.id !== id)
        this.setState({todoList : updatedList})
    }

    editTodoItem=(sendObject : {
        id : number,
        todoTask : string,
        isEdit : boolean,
        isComplete : boolean
    })=>{
        this.setState({inputTodo:sendObject.todoTask,isButton:true,activeId:sendObject.id})
    }

    completedTask=(id:number)=>{
        const {todoList} = this.state 
        const updateList = todoList.map(item => item.id === id ? ({...item,isComplete:!item.isComplete}):(item))
        this.setState({todoList:updateList})

    }
    

    render(){
        const {inputTodo,todoList,isButton} = this.state
        const palceHolder = isButton ? "Update Todo" : "Enter Todo"
        // const isCompletedTask = todoList.map(item => item.isComplete ? "classCompleted" : "")
        return(
            <center>
                <div style={{width:"300px"}}>
                    <h1>Todos</h1>
                    <input type="text" value={inputTodo} placeholder={palceHolder} onChange={(e)=>this.setState({inputTodo:e.target.value})}/>
                    <button type="button" disabled = {inputTodo.trim() === "" ? true : false} onClick={this.getTodosInList}>{isButton ? "Update" : "Add"}</button>
                </div>
                <ul>
                    {todoList.map(eachItem => (
                        <EachTodoItem key={eachItem.id} details={eachItem} deleteTodoItem={this.deleteTodoItem} editTodoItem={this.editTodoItem} completedTask={this.completedTask}/>
                    ))}
                </ul>
            </center>
        )
    }
    
}

export default TodoApplication