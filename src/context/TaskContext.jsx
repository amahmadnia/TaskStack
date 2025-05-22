import React, { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// Create the context
export const TaskContext = createContext()

// Mock Categories Data
const mockCategories = [
  { id: "work", name: "Work", color: "#3f51b5" },
  { id: "personal", name: "Personal", color: "#f50057" },
  { id: "study", name: "Study", color: "#4caf50" },
  { id: "health", name: "Health & Fitness", color: "#ff9800" },
  { id: "shopping", name: "Shopping", color: "#9c27b0" },
  { id: "travel", name: "Travel", color: "#00bcd4" },
]

// Mock Tasks Data
const mockTasks = [
  {
    id: "task-1",
    title: "Complete quarterly financial report",
    description: "Prepare and submit the Q4 financial analysis including revenue projections and expense breakdowns for the executive team review.",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    priority: "high",
    status: "pending",
    categoryId: "work",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    subTasks: [
      { id: "sub-1", text: "Gather revenue data", completed: true },
      { id: "sub-2", text: "Analyze expense reports", completed: false },
      { id: "sub-3", text: "Create presentation slides", completed: false }
    ],
    notes: "Remember to include comparison with previous quarter and highlight key trends."
  },
  {
    id: "task-2",
    title: "Team meeting preparation",
    description: "Prepare agenda and materials for the weekly team standup meeting.",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    priority: "medium",
    status: "in-progress",
    categoryId: "work",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-3",
    title: "Update project documentation",
    description: "Review and update the project README file and API documentation.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    priority: "low",
    status: "pending",
    categoryId: "work",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-4",
    title: "Code review for new feature",
    description: "Review the authentication module implementation and provide feedback to the development team.",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (overdue)
    priority: "high",
    status: "pending",
    categoryId: "work",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-5",
    title: "Client presentation rehearsal",
    description: "Practice the upcoming client presentation and prepare for potential questions.",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    priority: "medium",
    status: "completed",
    categoryId: "work",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-6",
    title: "Grocery shopping",
    description: "Buy groceries for the week including fresh vegetables, fruits, and household essentials.",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "pending",
    categoryId: "shopping",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    subTasks: [
      { id: "sub-4", text: "Make shopping list", completed: true },
      { id: "sub-5", text: "Check store hours", completed: true },
      { id: "sub-6", text: "Go to store", completed: false }
    ]
  },
  {
    id: "task-7",
    title: "Call dentist for appointment",
    description: "Schedule routine dental cleaning and checkup appointment.",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "pending",
    categoryId: "health",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-8",
    title: "Morning workout routine",
    description: "Complete 30-minute cardio and strength training session.",
    dueDate: new Date().toISOString(), // Today
    priority: "high",
    status: "completed",
    categoryId: "health",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "task-9",
    title: "Read 'Atomic Habits' chapter 5",
    description: "Continue reading the book and take notes on key concepts about habit stacking.",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    status: "in-progress",
    categoryId: "personal",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-10",
    title: "Clean and organize home office",
    description: "Declutter desk space, organize files, and clean the workspace for better productivity.",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "pending",
    categoryId: "personal",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-11",
    title: "Complete React advanced course",
    description: "Finish the remaining modules on hooks, context API, and performance optimization.",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
    priority: "high",
    status: "in-progress",
    categoryId: "study",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    subTasks: [
      { id: "sub-7", text: "Complete hooks module", completed: true },
      { id: "sub-8", text: "Study context API", completed: true },
      { id: "sub-9", text: "Learn performance optimization", completed: false },
      { id: "sub-10", text: "Build final project", completed: false }
    ]
  },
  {
    id: "task-12",
    title: "Practice JavaScript algorithms",
    description: "Solve 5 algorithm problems on coding platforms to improve problem-solving skills.",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "pending",
    categoryId: "study",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-13",
    title: "Plan weekend trip to mountains",
    description: "Research hiking trails, book accommodation, and prepare packing list for the mountain getaway.",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    status: "pending",
    categoryId: "travel",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    subTasks: [
      { id: "sub-11", text: "Research hiking trails", completed: false },
      { id: "sub-12", text: "Book accommodation", completed: false },
      { id: "sub-13", text: "Create packing list", completed: false }
    ]
  },
  {
    id: "task-14",
    title: "Buy birthday gift for mom",
    description: "Find and purchase a thoughtful birthday gift for mom's upcoming birthday celebration.",
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    status: "pending",
    categoryId: "shopping",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-15",
    title: "Update resume and LinkedIn profile",
    description: "Add recent projects and achievements to resume and update LinkedIn profile information.",
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "pending",
    categoryId: "personal",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-16",
    title: "Schedule annual health checkup",
    description: "Book appointment with primary care physician for annual physical examination.",
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "completed",
    categoryId: "health",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-17",
    title: "Learn TypeScript fundamentals",
    description: "Complete online course on TypeScript basics and practice with small projects.",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks from now
    priority: "low",
    status: "pending",
    categoryId: "study",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-18",
    title: "Backup important documents",
    description: "Create digital copies of important documents and store them securely in cloud storage.",
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago (overdue)
    priority: "high",
    status: "pending",
    categoryId: "personal",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-19",
    title: "Join local gym membership",
    description: "Research local gyms, compare prices and facilities, and sign up for membership.",
    dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    status: "in-progress",
    categoryId: "health",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-20",
    title: "Set up automated bill payments",
    description: "Configure automatic payments for recurring bills to avoid late fees and simplify financial management.",
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    status: "completed",
    categoryId: "personal",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  }
]

export const TaskContextProvider = ({ children }) => {
  // Initialize state with mock data as baseline + any stored additional data
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks")
    const additionalTasks = storedTasks ? JSON.parse(storedTasks) : []
    
    // Check if mock data is already included to avoid duplicates
    const mockTaskIds = mockTasks.map(task => task.id)
    const filteredAdditionalTasks = additionalTasks.filter(task => !mockTaskIds.includes(task.id))
    
    return [...mockTasks, ...filteredAdditionalTasks]
  })

  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories")
    const additionalCategories = storedCategories ? JSON.parse(storedCategories) : []
    
    // Check if mock categories are already included to avoid duplicates
    const mockCategoryIds = mockCategories.map(cat => cat.id)
    const filteredAdditionalCategories = additionalCategories.filter(cat => !mockCategoryIds.includes(cat.id))
    
    return [...mockCategories, ...filteredAdditionalCategories]
  })

  // Update localStorage when tasks or categories change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  // Task CRUD operations
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...taskData,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
    return newTask
  }

  const updateTask = (id, taskData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const getTask = (id) => {
    return tasks.find((task) => task.id === id)
  }

  // Category operations
  const addCategory = (categoryData) => {
    const newCategory = {
      id: uuidv4(),
      ...categoryData,
    }
    setCategories((prevCategories) => [...prevCategories, newCategory])
    return newCategory
  }

  const updateCategory = (id, categoryData) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, ...categoryData } : category,
      ),
    )
  }

  const deleteCategory = (id) => {
    // Remove the category
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id),
    )

    // Update tasks that had this category
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.categoryId === id ? { ...task, categoryId: null } : task,
      ),
    )
  }

  // Filter and sort operations
  const filterTasks = (filters) => {
    let filteredTasks = [...tasks]

    if (filters.status) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filters.status,
      )
    }

    if (filters.priority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filters.priority,
      )
    }

    if (filters.categoryId) {
      filteredTasks = filteredTasks.filter(
        (task) => task.categoryId === filters.categoryId,
      )
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          (task.description &&
            task.description.toLowerCase().includes(searchLower)),
      )
    }

    if (filters.dueDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (filters.dueDate === "today") {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        filteredTasks = filteredTasks.filter((task) => {
          const taskDate = new Date(task.dueDate)
          return taskDate >= today && taskDate < tomorrow
        })
      } else if (filters.dueDate === "upcoming") {
        const nextWeek = new Date(today)
        nextWeek.setDate(nextWeek.getDate() + 7)

        filteredTasks = filteredTasks.filter((task) => {
          const taskDate = new Date(task.dueDate)
          return taskDate >= today && taskDate <= nextWeek
        })
      } else if (filters.dueDate === "overdue") {
        filteredTasks = filteredTasks.filter((task) => {
          return task.status !== "completed" && new Date(task.dueDate) < today
        })
      }
    }

    return filteredTasks
  }

  const sortTasks = (taskList, sortBy) => {
    const sortedTasks = [...taskList]

    switch (sortBy) {
      case "dueDate":
        return sortedTasks.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
        )

      case "priority":
        const priorityOrder = { high: 1, medium: 2, low: 3 }
        return sortedTasks.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
        )

      case "title":
        return sortedTasks.sort((a, b) => a.title.localeCompare(b.title))

      case "createdAt":
        return sortedTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )

      default:
        return sortedTasks
    }
  }

  // Data import/export
  const exportData = () => {
    return {
      tasks,
      categories,
      exportDate: new Date().toISOString(),
    }
  }

  const importData = (data) => {
    if (data.tasks) setTasks(data.tasks)
    if (data.categories) setCategories(data.categories)
    return true
  }

  // Task statistics
  const getTaskStatistics = () => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === "completed").length
    const pending = tasks.filter((task) => task.status === "pending").length

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const overdue = tasks.filter(
      (task) => task.status !== "completed" && new Date(task.dueDate) < today,
    ).length

    const byCategoryId = {}
    categories.forEach((category) => {
      byCategoryId[category.id] = tasks.filter(
        (task) => task.categoryId === category.id,
      ).length
    })

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      byCategoryId,
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        getTask,
        addCategory,
        updateCategory,
        deleteCategory,
        filterTasks,
        sortTasks,
        exportData,
        importData,
        getTaskStatistics,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}