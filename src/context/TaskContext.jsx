import React, { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// Create the context
export const TaskContext = createContext()

export const TaskContextProvider = ({ children }) => {
  // Initialize state from localStorage or with empty arrays
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks")
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories")
    return storedCategories
      ? JSON.parse(storedCategories)
      : [
          { id: "work", name: "Work", color: "#3f51b5" },
          { id: "personal", name: "Personal", color: "#f50057" },
          { id: "study", name: "Study", color: "#4caf50" },
        ]
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
