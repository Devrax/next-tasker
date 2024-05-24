import { TaskItem } from "@/core/types";
import { FormEvent, useRef } from "react";

type OnSet = (task: TaskItem) => Promise<void>;

export function TaskSetter(props: { onSet: OnSet}) {
    const inputSetterRef = useRef<HTMLInputElement>(null),
    buttonSubmit = useRef<HTMLButtonElement>(null);

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
        }
    }

    return (
        <form 
            onSubmit={e => {
                e.preventDefault();
                handleForm(new FormData(e.target as unknown as HTMLFormElement))
            }
        }>
            <div>
                <input ref={inputSetterRef} type="text"  placeholder="Set a goal" name="header" required/>
                <input type="checkbox" name="isDone"/>
            </div>

            <button type="submit" ref={buttonSubmit}>
                Set it
            </button>
        </form>
    )
}