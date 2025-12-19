# TaskFlow - Task Management Dashboard

A modern, responsive task management application built with Next.js 15 and React. This mini Trello-like app allows users to manage projects and tasks with a beautiful Kanban board interface.



---

## Summary

**TaskFlow** is a task management dashboard that provides:

- **Project Management**: Create, view, and delete projects with task statistics
- **Kanban Board**: Visual task management with three columns (To Do, In Progress, Done)
- **Task Operations**: Add, move, and delete tasks within projects
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **API Integration**: Fetches initial data from JSONPlaceholder API with local fallback

### Key Features

| Feature | Description |
|---------|-------------|
| Projects List | View all projects with task count badges |
| Kanban Board | Drag tasks between To Do, In Progress, and Done columns |
| Add Project | Create new projects with name and description |
| Add Task | Create tasks with title, description, and status |
| Delete Operations | Remove projects or individual tasks |
| Theme Toggle | Switch between light and dark modes |
| Loading States | Skeleton loaders for better UX |

### Tech Stack

- **Framework**: Next.js  (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **API**: JSONPlaceholder (RESTful API)
- **Icons**: Lucide React

---

## Run Instructions

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
  
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

### Project Structure

```
├── app/
│   ├── page.tsx              # Home page (Projects list)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & theme tokens
│   ├── add-project/          # Add project page
│   ├── add-task/             # Add task page
│   └── project/[id]/         # Dynamic project page (Kanban board)
├── components/
│   ├── layout/               # Layout components (Navbar, Footer, MainLayout)
│   ├── ui/                   # shadcn/ui components
│   ├── project-card.tsx      # Project card component
│   ├── task-card.tsx         # Task card component
│   ├── task-column.tsx       # Kanban column component
│   └── loading-skeleton.tsx  # Loading skeleton component
├── context/
│   └── task-context.tsx      # Global state management
└── lib/
    └── utils.ts              # Utility functions
```

---

## Team Roles

| Team Member | Role | Responsibilities |
|-------------|------|------------------|
| **samar** |  UI Components (ProjectCard, TaskCard, Columns) | API & State Logic (fetching, organizing tasks)  |
| **sara** |  Routing & Layout (Navbar, page structure)| Forms (Add Task, Add Project)   |
### Contribution Guidelines

1. Create a feature branch from `main`
2. Make your changes following the existing code style
3. Test your changes thoroughly
4. Submit a pull request with a clear description

---

## API Reference

The application uses **JSONPlaceholder API** for initial data:

- **Projects**: `GET https://jsonplaceholder.typicode.com/users`
- **Tasks**: `GET https://jsonplaceholder.typicode.com/todos`

> Note: All create, update, and delete operations are handled locally in React state.

---

## License

This project is built for educational purposes.

---

## Links

- **Live Demo**: [Deployed on Vercel](https://taskflow-eight-azure.vercel.app/)
- **Repository**: [GitHub](https://github.com/samarabdu/taskflow)


