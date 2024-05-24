import { TaskItem } from "@/core/types";
import { TaskList } from "@/app/ui/task-list/task-list";
import { createClient } from "@/core/services/supabase/server";
import { TABLE, TableEnums } from "@/core/services/supabase/tables.constant";

export default async function Home() {

  const supabase = createClient();

  const { data: taskItems } = await supabase.from<TableEnums.tasks, TaskItem[]>(TABLE.TASKS).select<'*', TaskItem>('*');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <TaskList tasks={taskItems || []}/>
    </main>
  );
}
