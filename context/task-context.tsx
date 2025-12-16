"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type TaskStatus = "todo" | "in-progress" | "done"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  projectId: string
}

export interface Project {
  id: string
  title: string
  description: string
}

interface TaskContextType {
  projects: Project[]
  tasks: Task[]
  loading: boolean
  darkMode: boolean
  toggleDarkMode: () => void
  addProject: (project: Omit<Project, "id">) => void
  deleteProject: (projectId: string) => void
  addTask: (task: Omit<Task, "id">) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  deleteTask: (taskId: string) => void
  getProjectTasks: (projectId: string) => Task[]
  getProjectById: (projectId: string) => Project | undefined
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode === "true") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("darkMode", "true")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("darkMode", "false")
      }
      return newValue
    })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products as projects from DummyJSON API
        const productsRes = await fetch("https://dummyjson.com/products?limit=6")
        const productsData = await productsRes.json()

        const fetchedProjects: Project[] = productsData.products.map(
          (product: { id: number; title: string; description: string }) => ({
            id: String(product.id),
            title: product.title,
            description: product.description,
          }),
        )

        // Fetch todos as tasks from DummyJSON API
        const todosRes = await fetch("https://dummyjson.com/todos?limit=30")
        const todosData = await todosRes.json()

        const fetchedTasks: Task[] = todosData.todos.map(
          (todo: { id: number; todo: string; completed: boolean; userId: number }) => ({
            id: String(todo.id),
            title: todo.todo,
            description: `Task assigned to user #${todo.userId}`,
            status: todo.completed ? "done" : ((todo.id % 3 === 0 ? "in-progress" : "todo") as TaskStatus),
            projectId: String((todo.id % 6) + 1),
          }),
        )

        setProjects(fetchedProjects)
        setTasks(fetchedTasks)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: String(Date.now()),
    }
    setProjects((prev) => [...prev, newProject])
  }

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))
    setTasks((prev) => prev.filter((task) => task.projectId !== projectId))
  }

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: String(Date.now()),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const getProjectTasks = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId)
  }

  const getProjectById = (projectId: string) => {
    return projects.find((project) => project.id === projectId)
  }

  return (
    <TaskContext.Provider
      value={{
        projects,
        tasks,
        loading,
        darkMode,
        toggleDarkMode,
        addProject,
        deleteProject,
        addTask,
        updateTaskStatus,
        deleteTask,
        getProjectTasks,
        getProjectById,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
