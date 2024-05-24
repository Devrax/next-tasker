"use client"

import { TaskItem } from "@/core/types"
import { TaskItemCard } from "../task-item/task-item-card"
import { useState } from "react";

export function TaskList(props: { tasks: TaskItem[] }) {

    const [tasks, setTasks] = useState(props.tasks);

    function deleteTask(id: string) {
        setTasks(originalTasks => originalTasks);
        const originalTasks = structuredClone(tasks),
        findTaskIndex = originalTasks.findIndex((tk) => tk.id === id);
        if(findTaskIndex < 0) return;
        originalTasks.splice(findTaskIndex, 1);
    }

    function onTaskDone(id: string, state: boolean) {
        console.log(id, state);
    }

    return (<article className={`w-full pt-5 px-5`}>



            <section className={`border-blue-100 rounded`}>

               {tasks.map(task => <TaskItemCard key={task.id} item={task} onDelete={deleteTask} onTaskDone={onTaskDone}/>)}

            </section>

        </article>)
}