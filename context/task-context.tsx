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
        // Fetch users as projects from JSONPlaceholder API
        const usersRes = await fetch("https://jsonplaceholder.typicode.com/users")
        const usersData = await usersRes.json()

        const projectNames = [
          "Website Redesign",
          "Mobile App Development",
          "Marketing Campaign",
          "Database Migration",
          "UI/UX Improvements",
          "API Integration",
        ]

        const projectDescriptions = [
          "Modernize the company website with new design",
          "Build cross-platform mobile application",
          "Q4 marketing and social media strategy",
          "Migrate legacy database to cloud",
          "Improve user experience across all platforms",
          "Connect third-party services and APIs",
        ]

        const fetchedProjects: Project[] = usersData.slice(0, 6).map((user: { id: number }, index: number) => ({
          id: String(user.id),
          title: projectNames[index],
          description: projectDescriptions[index],
        }))

        // Fetch todos as tasks from JSONPlaceholder API
        const todosRes = await fetch("https://jsonplaceholder.typicode.com/todos")
        const todosData = await todosRes.json()

        const taskTemplates = [
          { title: "Create wireframes", description: "Design initial wireframes for review" },
          { title: "Setup project repository", description: "Initialize Git repo and project structure" },
          { title: "Design mockups", description: "Create high-fidelity design mockups" },
          { title: "Implement authentication", description: "Add user login and registration" },
          { title: "Build dashboard", description: "Create main dashboard interface" },
          { title: "Write unit tests", description: "Add test coverage for components" },
          { title: "API endpoint development", description: "Build REST API endpoints" },
          { title: "Database schema design", description: "Design and create database tables" },
          { title: "Code review", description: "Review and refactor existing code" },
          { title: "Performance optimization", description: "Improve app loading speed" },
          { title: "Bug fixes", description: "Fix reported issues and bugs" },
          { title: "Documentation", description: "Write technical documentation" },
          { title: "User testing", description: "Conduct user acceptance testing" },
          { title: "Deployment setup", description: "Configure CI/CD pipeline" },
          { title: "Security audit", description: "Review and fix security vulnerabilities" },
          { title: "Responsive design", description: "Ensure mobile compatibility" },
          { title: "Analytics integration", description: "Add tracking and analytics" },
          { title: "Email notifications", description: "Implement email service" },
          { title: "Search functionality", description: "Add search feature to app" },
          { title: "Data backup system", description: "Setup automated backups" },
          { title: "Error handling", description: "Improve error messages and logging" },
          { title: "Accessibility review", description: "Ensure WCAG compliance" },
          { title: "Load testing", description: "Test app under heavy traffic" },
          { title: "SSL configuration", description: "Setup secure connections" },
          { title: "Cache implementation", description: "Add caching for better performance" },
          { title: "Payment integration", description: "Connect payment gateway" },
          { title: "Report generation", description: "Build reporting features" },
          { title: "User permissions", description: "Implement role-based access" },
          { title: "Data migration", description: "Transfer data from old system" },
          { title: "Final review", description: "Complete project review before launch" },
        ]

        const fetchedTasks: Task[] = todosData
          .slice(0, 30)
          .map((todo: { id: number; completed: boolean; userId: number }, index: number) => ({
            id: String(todo.id),
            title: taskTemplates[index].title,
            description: taskTemplates[index].description,
            status: todo.completed ? "done" : ((todo.id % 3 === 0 ? "in-progress" : "todo") as TaskStatus),
            projectId: String(todo.userId <= 6 ? todo.userId : (todo.userId % 6) + 1),
          }))

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
