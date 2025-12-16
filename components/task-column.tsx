"use client"

import type { Task, TaskStatus } from "@/context/task-context"
import { TaskCard } from "./task-card"
import { Circle, Clock, CheckCircle2 } from "lucide-react"

interface TaskColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
}

const statusConfig = {
  todo: {
    icon: Circle,
    bgColor: "bg-todo/10",
    textColor: "text-todo",
    borderColor: "border-todo/30",
  },
  "in-progress": {
    icon: Clock,
    bgColor: "bg-in-progress/10",
    textColor: "text-in-progress",
    borderColor: "border-in-progress/30",
  },
  done: {
    icon: CheckCircle2,
    bgColor: "bg-done/10",
    textColor: "text-done",
    borderColor: "border-done/30",
  },
}

export function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`flex flex-col rounded-xl border ${config.borderColor} ${config.bgColor} p-4 min-h-[500px]`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${config.textColor}`} />
          <h3 className={`font-semibold ${config.textColor}`}>{title}</h3>
        </div>
        <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${config.bgColor} ${config.textColor}`}>
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} />
        ))}
        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  )
}
