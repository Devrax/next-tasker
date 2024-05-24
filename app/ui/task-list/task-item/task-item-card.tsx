import { TaskItem } from "@/core/types";
import { useRef, useState } from "react";

type OnDelete = (id: string) => Promise<void>;
type OnDone = (id: string, state: boolean) => Promise<void>;

export function TaskItemCard(props: { item: TaskItem, onDelete: OnDelete, onTaskDone: OnDone }) {

    const [taskCompletion, setTaskCompletion] = useState(props.item.isDone),
        checkerRef = useRef<HTMLInputElement>(null);

    async function checkHandler(checkState: boolean) {
        try {
            setTaskCompletion(checkState);
            await props.onTaskDone(props.item.id, checkState);
        } catch {
            checkerRef.current!.checked = !checkState;
        }
    }

    function deleteTask() {
        props.onDelete(props.item.id)
    }

    return (
        <>
            <div className={`flex justify-between items-center`}>
                <div className={`flex flex-row items-center`}>
                    <input
                        ref={checkerRef}
                        type="checkbox"
                        id={props.item.id}
                        name={props.item.id + 'field'}
                        className={`mr-3 h-8 w-8`}
                        defaultChecked={props.item.isDone}
                        onChange={(e) => checkHandler(e.target.checked)}

                    />
                    <label htmlFor={props.item.id} className={`flex-1 font-bold ${taskCompletion ? 'line-through opacity-75' : ''}`}>
                        {props.item.header}
                    </label>
                </div>

                <div className={`bg-red-400 rounded p-1`}>
                    <button onClick={deleteTask}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <hr className={`h-px bg-[rgb(var(--foreground-rgb))] w-full mb-3 mt-1`} />
        </>
    )
}