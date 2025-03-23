"use client"

import { useState } from "react"
import Header from "@/components/header"
import PhilosophySection from "@/components/philosophy-section"
import MilestonesSection from "@/components/milestones-section"
import TasksSection from "@/components/tasks-section"
import ProgressSummary from "@/components/progress-summary"
import type { Milestone, Task } from "@/lib/types"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Home() {
  const [philosophy, setPhilosophy] = useState<string>(
    "The STAR philosophy is about Setting goals, Taking action, Assessing progress, and Reflecting on growth. This journey is about continuous improvement and celebrating each step forward.",
  )

  const [milestones, setMilestones] = useState<Milestone[]>([
    
  ])

  const [tasks, setTasks] = useState<Task[]>([
    
  ])

  const addMilestone = (milestone: Omit<Milestone, "id">) => {
    const newMilestone = {
      ...milestone,
      id: Date.now().toString(),
    }
    setMilestones([...milestones, newMilestone])
  }

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const updatePhilosophy = (newPhilosophy: string) => {
    setPhilosophy(newPhilosophy)
  }

  return (
    <div className="container py-4">
      <Header />
      <div className="row g-4">
        <div className="col-12">
          <PhilosophySection philosophy={philosophy} updatePhilosophy={updatePhilosophy} />
        </div>
        <div className="col-md-6">
          <MilestonesSection milestones={milestones} addMilestone={addMilestone} />
        </div>
        <div className="col-md-6">
          <TasksSection
            tasks={tasks}
            milestones={milestones}
            addTask={addTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </div>
        <div className="col-12">
          <ProgressSummary tasks={tasks} milestones={milestones} />
        </div>
      </div>
    </div>
  )
}

