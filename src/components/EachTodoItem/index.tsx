import "./index.css"


interface Iprops{
    details : {
        id : number,
        todoTask : string,
        isEdit : boolean,
        isComplete : boolean
    },

    deleteTodoItem:(id:number)=>void

    editTodoItem:(sendObject : {
        id : number,
        todoTask : string,
        isEdit : boolean,
        isComplete : boolean
    })=>void

    completedTask:(id:number)=>void


}

const EachTodoItem = (props : Iprops) => {

    const onClickDeleteItem = ()=>{
        props.deleteTodoItem(props.details.id)
        
    }

    const onClickEditTodoItem=()=>{
        props.editTodoItem(props.details)
    }

    const onClickCompletedTask=()=>{
        props.completedTask(props.details.id)
    }

    const completedClassName = props.details.isComplete ? "completeTask" : ""

  return (
    <li>
        <h1 className={completedClassName} onClick={onClickCompletedTask}>{props.details.todoTask}</h1>
        <div>
            <button type="button" onClick={onClickEditTodoItem}>Edit</button>
            <button type="button" onClick={onClickDeleteItem}>Delete</button>
        </div>  
    </li>
  )
}

export default EachTodoItem