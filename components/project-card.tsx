"use client"

import type React from "react"

import Link from "next/link"
import { FolderKanban, ArrowRight, CheckCircle2, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTask } from "@/context/task-context"

interface ProjectCardProps {
  id: string
  title: string
  description: string
}

export function ProjectCard({ id, title, description }: ProjectCardProps) {
  const { getProjectTasks, deleteProject } = useTask()
  const tasks = getProjectTasks(id)

  const todoCount = tasks.filter((t) => t.status === "todo").length
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length
  const doneCount = tasks.filter((t) => t.status === "done").length

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this project and all its tasks?")) {
      deleteProject(id)
    }
  }

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="mt-4 text-lg line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-todo" />
            <span>{todoCount} To Do</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-in-progress" />
            <span>{inProgressCount} In Progress</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 text-done" />
            <span>{doneCount} Done</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative">
        <Button asChild className="w-full group/btn">
          <Link href={`/project/${id}`}>
            View Tasks
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
