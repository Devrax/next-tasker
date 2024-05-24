import { TaskItem } from "@/core/types";
import { TaskList } from "@/app/ui/task-list/task-list";

export default function Home() {

  const taskItems: TaskItem[] = [
    {
        id: crypto.randomUUID(),
        header: 'Extorsionar a Togashi creador de HxH',
        isDone: false
    },
    {
        id: crypto.randomUUID(),
        header: 'Volver a retransmitir HxH en televisión nacional',
        isDone: false
    },
    {
        id: crypto.randomUUID(),
        header: 'Ser aclamado como un heroe',
        isDone: true
    }
]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <TaskList tasks={taskItems}/>
    </main>
  );
}
