// src/contexts/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample initial tasks
const sampleTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Write and review the Q3 project proposal for the client',
    priority: 'high',
    dueDate: '2025-05-20',
    category: 'Work',
    categoryColor: '#6366f1',
    completed: false,
    createdAt: '2025-05-01'
  },
  {
    id: 2,
    title: 'Review team presentations',
    description: 'Review and provide feedback on team presentations for the quarterly meeting',
    priority: 'medium',
    dueDate: '2025-05-18',
    category: 'Work',
    categoryColor: '#6366f1',
    completed: false,
    createdAt: '2025-05-02'
  },
  {
    id: 3,
    title: 'Order anniversary gift',
    description: 'Find and order anniversary gift for next month',
    priority: 'high',
    dueDate: '2025-05-25',
    category: 'Personal',
    categoryColor: '#ec4899',
    completed: false,
    createdAt: '2025-05-03'
  },
  {
    id: 4,
    title: 'Schedule dentist appointment',
    description: 'Call dentist to schedule regular checkup',
    priority: 'low',
    dueDate: '2025-05-30',
    category: 'Health',
    categoryColor: '#22c55e',
    completed: false,
    createdAt: '2025-05-05'
  },
  {
    id: 5,
    title: 'Update portfolio website',
    description: 'Add recent projects to portfolio and update resume',
    priority: 'medium',
    dueDate: '2025-06-05',
    category: 'Career',
    categoryColor: '#f59e0b',
    completed: true,
    createdAt: '2025-04-28'
  },
  {
    id: 6,
    title: 'Research new tech stack',
    description: 'Research and evaluate new technologies for upcoming project',
    priority: 'low',
    dueDate: '2025-06-10',
    category: 'Learning',
    categoryColor: '#3b82f6',
    completed: true,
    createdAt: '2025-04-25'
  }
];

// Sample initial categories
const sampleCategories = [
  { id: 1, name: 'Work', color: '#6366f1' },
  { id: 2, name: 'Personal', color: '#ec4899' },
  { id: 3, name: 'Health', color: '#22c55e' },
  { id: 4, name: 'Career', color: '#f59e0b' },
  { id: 5, name: 'Learning', color: '#3b82f6' }
];

// Create context
const TaskContext = createContext();

// Custom hook to use the task context
export const useTaskContext = () => useContext(TaskContext);

// Provider component
export const TaskProvider = ({ children }) => {
  // Initialize tasks from localStorage or use sample data
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : sampleTasks;
  });
  
  // Initialize categories from localStorage or use sample data
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : sampleCategories;
  });
  
  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Update localStorage when categories change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  // Get task by ID
  const getTask = (id) => {
    return tasks.find(task => task.id === Number(id));
  };
  
  // Add new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(), // Simple way to generate unique ID
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTasks([...tasks, newTask]);
    return newTask;
  };
  
  // Update task
  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === Number(id) ? { ...task, ...updatedTask } : task
    );
    
    setTasks(updatedTasks);
  };
  
  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== Number(id));
    setTasks(updatedTasks);
  };
  
  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === Number(id) ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
  };
  
  // Add category
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now() // Simple way to generate unique ID
    };
    
    setCategories([...categories, newCategory]);
    return newCategory;
  };
  
  // Update category
  const updateCategory = (id, updatedCategory) => {
    const updatedCategories = categories.map(category => 
      category.id === Number(id) ? { ...category, ...updatedCategory } : category
    );
    
    setCategories(updatedCategories);
    
    // Update tasks with this category
    const updatedTasks = tasks.map(task => {
      if (task.category === categories.find(c => c.id === Number(id)).name) {
        return { 
          ...task, 
          category: updatedCategory.name,
          categoryColor: updatedCategory.color
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };
  
  // Delete category
  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(category => category.id !== Number(id));
    setCategories(updatedCategories);
    
    // Update tasks with this category
    const categoryToDelete = categories.find(c => c.id === Number(id));
    const updatedTasks = tasks.map(task => {
      if (task.category === categoryToDelete.name) {
        return { 
          ...task, 
          category: 'Uncategorized',
          categoryColor: '#9ca3af'
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };
  
  // Get task stats
  const getTaskStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const overdueTasks = tasks.filter(task => 
      !task.completed && new Date(task.dueDate) < new Date()
    ).length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      progress
    };
  };
  
  // Get tasks for today
  const getTodayTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === today && !task.completed);
  };
  
  // Get upcoming tasks
  const getUpcomingTasks = (limit = 5) => {
    const today = new Date().toISOString().split('T')[0];
    return tasks
      .filter(task => 
        !task.completed && 
        task.dueDate > today
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, limit);
  };
  
  // Get overdue tasks
  const getOverdueTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks
      .filter(task => 
        !task.completed && 
        task.dueDate < today
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };
  
  // Get completed tasks
  const getCompletedTasks = (limit = 10) => {
    return tasks
      .filter(task => task.completed)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  };
  
  // Provide context value
  const contextValue = {
    tasks,
    categories,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
    updateCategory,
    deleteCategory,
    getTaskStats,
    getTodayTasks,
    getUpcomingTasks,
    getOverdueTasks,
    getCompletedTasks
  };
  
  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};