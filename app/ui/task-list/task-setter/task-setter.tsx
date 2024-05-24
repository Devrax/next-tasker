import { TaskItem } from "@/core/types";
import { FormEvent, useRef } from "react";

type OnSet = (task: TaskItem) => Promise<void>;

export function TaskSetter(props: { onSet: OnSet}) {
    const inputSetterRef = useRef<HTMLInputElement>(null),
    buttonSubmit = useRef<HTMLButtonElement>(null),
    checkboxRef = useRef<HTMLInputElement>(null);

    async function handleForm(form: FormData) {
        const formValues = Object.fromEntries(form);
        const task = {
            id: crypto.randomUUID(),
            isDone: !!formValues.isDone && true,
            header: formValues.header
        }

        buttonSubmit.current!.disabled = true;
        try {
            await props.onSet(task as TaskItem);
        } finally {
            buttonSubmit.current!.disabled = false;
            inputSetterRef.current!.value = '';
            checkboxRef.current!.checked = false;
        }
    }

    return (
        <form
            className={`mb-5`}
            onSubmit={e => {
                e.preventDefault();
                handleForm(new FormData(e.target as unknown as HTMLFormElement))
            }
        }>
            <div className={`w-full flex border border-b-0 p-2 rounded-t justify-between items-center`}>
                <input className={`bg-[rgb(var(--background-start-rgb))] font-extrabold flex-1 active:outline-none focus:outline-none`} ref={inputSetterRef} type="text" placeholder="Set a goal here" name="header" required/>
                <input className={`h-5 w-5`} type="checkbox" name="isDone" ref={checkboxRef}/>
            </div>

            <button className={`p-1 text-center w-full bg-green-600 rounded-b-lg font-extrabold text-[rgb(var(--foreground-rgb))]`} type="submit" ref={buttonSubmit}>
                Add task
            </button>
        </form>
    )
}