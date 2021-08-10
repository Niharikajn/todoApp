import React, { useState } from "react";
import { TextField, Button, IconButton, Card, Divider, Switch, Tooltip, FormGroup, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    done: {
        textDecoration: "line-through",
        opacity: ".5",
        display: "flex",
        width: "100%"
    },
    header: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    main: {
        width: "100%",
        maxWidth: "400px",
        margin: "20px auto",
    },
    card: {
        padding: "20px",
        margin: "20px 0"
    },
    todo: {
        position: "relative",
        display: "flex",
        flexFow: "row",
        alignContent: "space-between"
    },
    label: {
        display: "flex",
        width: "100%"
    },
    divider: {
        position: "absolute",
        width: "100%",
        top: 0
    }
})


const TodoComponent = () => {

    const classes = useStyles();

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);
    

    const onTextUpdate = e => {
        setNewTask(e.target.value);

    };

    const addTask = () => {
    let copyList = [...tasks];
    copyList = [...copyList, { text: newTask, done: false}];
    setTasks(copyList);
    setNewTask("");
    };

    const deleteTask = e => {
        const remaingDeleteTasks = tasks.filter((item) => item.text !== e);
        setTasks(remaingDeleteTasks);
        setNewTask("");

    };

   const toggle = item => {
        let mapped = tasks.map((e)=>{return e.text===item? {...e, done:!e.done} : {...e}});
        setTasks(mapped);
        setNewTask("");
      };


    return (
        <div id="main" className={classes.main}>
            <header className={classes.header}>
                <TextField
                    label="Add new task"
                    value={newTask}
                    onChange={onTextUpdate}
                />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!newTask}
                    onClick={addTask}
                >
                    Add
                </Button>
            </header>
            {tasks.length > 0 && (
                <Card className={classes.card}>
                    <FormGroup>
                        {tasks.map((task, index) => (
                            <div key={index} className={classes.todo}>
                                {index > 0 ? <Divider className={classes.divider} /> : ""}
                                <FormControlLabel
                                    control={
                                        <Switch
                                        color="primary"
                                        checked={!task.done}
                                        onChange={() => toggle(task.text)}
                                      />
                                    }
                                    label={task.text}
                                    className={task.done ? classes.done : classes.label}
                                />
                                <Tooltip title="Delete task" placement="top">
                                    <IconButton
                                        color="secondary"
                                        aria-label="delete"
                                        onClick={() => deleteTask(task.text)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ))}
                    </FormGroup>
                </Card>
            )}
        </div>
    );

}

export default TodoComponent;
