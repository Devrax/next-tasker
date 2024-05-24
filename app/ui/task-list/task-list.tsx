"use client"

import { TaskItem } from "@/core/types"
import { TaskItemCard } from "@/app/ui/task-list/task-item/task-item-card"
import { useState } from "react";
import { supabaseClient } from "@/core/services/supabase/client";
import { TABLE } from "@/core/services/supabase/tables.constant";
import { TaskSetter } from "@/app/ui/task-list/task-setter/task-setter";

export function TaskList(props: { tasks: TaskItem[] }) {

    const [tasks, setTasks] = useState(props.tasks);

    async function deleteTask(id: string) {
        const originalTasks = structuredClone(tasks),
        mutableTasks = structuredClone(originalTasks),
        findTaskIndex = originalTasks.findIndex((tk) => tk.id === id);
        if(findTaskIndex < 0) return;
        mutableTasks.splice(findTaskIndex, 1);
        setTasks(mutableTasks);
        try {
            const { error } = await supabaseClient.from(TABLE.TASKS).delete().eq('id', id).select();
            if(error) throw error;
        } catch(err) {
            setTasks(originalTasks);
        }
    }

    async function onTaskDone(id: string, state: boolean) {
        const { error } = await supabaseClient.from(TABLE.TASKS).update({ isDone: state }).eq('id', id).select();
        if(error) throw error;
    }

    async function onSetTask(newTask: TaskItem) {
        const originalTasks = structuredClone(tasks);
        setTasks(currentTasks => [...currentTasks, newTask]);
        const { error } = await supabaseClient.from(TABLE.TASKS).insert(newTask).select();
        if(error) setTasks(originalTasks);
    }

    return (<article className={`w-full pt-5 px-5 max-w-5xl mx-auto`}>

            <section>

                <TaskSetter onSet={onSetTask}/>

            </section>

            <section className={`border-blue-100 rounded`}>

               {tasks.map(task => <TaskItemCard key={task.id} item={task} onDelete={deleteTask} onTaskDone={onTaskDone}/>)}

            </section>

        </article>)
}