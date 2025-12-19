"use client"

import { MainLayout } from "@/components/layout"
import { ProjectCard } from "@/components/project-card"
import { ProjectCardSkeleton } from "@/components/loading-skeleton"
import { useTask } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { projects, loading } = useTask()

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="mb-10 text-center">
        {/* <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Manage tasks with ease</span>
        </div> */}
        <h1 className="text-4xl font-bold mb-3 text-balance">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TaskFlow</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          Organize your projects and tasks visually. Drag tasks between columns to track your progress.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-muted-foreground text-sm">
            {loading ? "Loading..." : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/add-project">
            <Plus className="h-5 w-5" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} id={project.id} title={project.title} description={project.description} />
          ))
        )}
      </div>

      {!loading && projects.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
            <Sparkles className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">Start by creating your first project</p>
          <Button asChild>
            <Link href="/add-project">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Link>
          </Button>
        </div>
      )}
    </MainLayout>
  )
}
