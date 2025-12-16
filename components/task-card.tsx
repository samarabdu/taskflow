"use client"

import { GripVertical, Trash2, ArrowRight, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTask, type TaskStatus } from "@/context/task-context"

interface TaskCardProps {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export function TaskCard({ id, title, description, status }: TaskCardProps) {
  const { updateTaskStatus, deleteTask } = useTask()

  const moveRight = () => {
    if (status === "todo") {
      updateTaskStatus(id, "in-progress")
    } else if (status === "in-progress") {
      updateTaskStatus(id, "done")
    }
  }

  const moveLeft = () => {
    if (status === "done") {
      updateTaskStatus(id, "in-progress")
    } else if (status === "in-progress") {
      updateTaskStatus(id, "todo")
    }
  }

  const statusColors = {
    todo: "border-l-todo",
    "in-progress": "border-l-in-progress",
    done: "border-l-done",
  }

  return (
    <Card className={`group relative transition-all duration-200 hover:shadow-md border-l-4 ${statusColors[status]}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-sm font-medium flex-1 line-clamp-2">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-xs line-clamp-2 mb-3">{description}</CardDescription>
        <div className="flex items-center justify-between gap-1">
          <div className="flex gap-1">
            {status !== "todo" && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={moveLeft} title="Move Left">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Button>
            )}
            {status !== "done" && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={moveRight} title="Move Right">
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => deleteTask(id)}
            title="Delete Task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
