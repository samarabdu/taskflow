"use client"
import { Header } from "@/components/header"
import { TaskColumn } from "@/components/task-column"
import { TaskColumnSkeleton } from "@/components/loading-skeleton"
import { useTask } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const { getProjectById, getProjectTasks, loading } = useTask()

  const project = getProjectById(id)
  const tasks = getProjectTasks(id)

  const todoTasks = tasks.filter((t) => t.status === "todo")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const doneTasks = tasks.filter((t) => t.status === "done")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          {loading ? (
            <div className="space-y-2">
              <div className="h-8 w-64 bg-muted rounded animate-pulse" />
              <div className="h-4 w-96 bg-muted rounded animate-pulse" />
            </div>
          ) : project ? (
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <Button asChild>
                <Link href={`/add-task?projectId=${id}`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold text-destructive">Project not found</h2>
              <Button asChild className="mt-4">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Task Columns */}
        {project && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <>
                <TaskColumnSkeleton />
                <TaskColumnSkeleton />
                <TaskColumnSkeleton />
              </>
            ) : (
              <>
                <TaskColumn title="To Do" status="todo" tasks={todoTasks} />
                <TaskColumn title="In Progress" status="in-progress" tasks={inProgressTasks} />
                <TaskColumn title="Done" status="done" tasks={doneTasks} />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
