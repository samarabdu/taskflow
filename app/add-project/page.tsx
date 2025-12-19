"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout"
import { useTask } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FolderPlus } from "lucide-react"
import Link from "next/link"

export default function AddProjectPage() {
  const router = useRouter()
  const { addProject } = useTask()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsSubmitting(true)

    addProject({
      title: title.trim(),
      description: description.trim(),
    })

    setTimeout(() => {
      router.push("/")
    }, 300)
  }

  return (
    <MainLayout>
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <FolderPlus className="h-6 w-6" />
          </div>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>Create a new project to organize your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a detailed description"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting || !title.trim()}>
                {isSubmitting ? "Creating..." : "Create Project"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
