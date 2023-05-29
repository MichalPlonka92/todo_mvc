import { useState } from "react";

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);

    function getID() {
        if (!tasks.length) return 1;

        return Math.max(...tasks.map((task) => task.id)) + 1;
    }

    function handleInput(event) {
        setValue(event.target.value);
    }

    function handleAddTask(event) {
        if (event.key === 'Enter') {
            const newTask = {
                id: getID(),
                name: value,
                status: 'active'
            };
            setTasks([...tasks, newTask]);
            setValue('');
        }
    }

    function handleDelete(event) {
        const id = parseInt(event.target.dataset.id);
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function handleChangeStatus(task) {
        return function () {
            const updatedTasks = tasks.map((t) => {
                if (t.id === task.id) {
                    return { ...t, status: t.status === 'active' ? 'done' : 'active' };
                }
                return t;
            });
            setTasks(updatedTasks);
        };
    }

    return (
        <>
            <h1>todos</h1>
            <input
                type="text"
                value={value}
                onChange={handleInput}
                onKeyUp={handleAddTask}
            />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <button onClick={handleChangeStatus(task)}
                        className={task.status === 'active' ? 'done' : 'active'}
                        >{task.status}</button>
                        <span>{task.name}</span>
                        <button onClick={handleDelete} data-id={task.id}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
            {tasks.some((task) => task.status === 'done') && (

            <button>Clear completed</button>
                )}
        </>
    );
}

export default App;
