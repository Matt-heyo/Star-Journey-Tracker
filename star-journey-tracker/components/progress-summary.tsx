import { Card, ProgressBar } from "react-bootstrap"
import type { Task, Milestone } from "@/lib/types"

interface ProgressSummaryProps {
  tasks: Task[]
  milestones: Milestone[]
}

const ProgressSummary = ({ tasks, milestones }: ProgressSummaryProps) => {
  
  const tasksByMilestone = milestones
    .map((milestone) => {
      const milestoneTasks = tasks.filter((task) => task.milestoneId === milestone.id)
      const completedTasks = milestoneTasks.filter((task) => task.completed)
      const progressPercentage =
        milestoneTasks.length > 0 ? Math.round((completedTasks.length / milestoneTasks.length) * 100) : 0

      return {
        milestone,
        totalTasks: milestoneTasks.length,
        completedTasks: completedTasks.length,
        progressPercentage,
      }
    })
    .filter((item) => item.totalTasks > 0)

 
  const totalTasks = tasks.length
  const totalCompletedTasks = tasks.filter((task) => task.completed).length
  const overallProgress = totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0

  return (
    <Card>
      <Card.Header>
        <h2 className="h5 mb-0">Progress Summary</h2>
      </Card.Header>
      <Card.Body>
        {tasksByMilestone.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-1">
                <span>Overall Progress</span>
                <span>
                  {totalCompletedTasks} of {totalTasks} tasks completed ({overallProgress}%)
                </span>
              </div>
              <ProgressBar now={overallProgress} label={`${overallProgress}%`} />
            </div>

            <h3 className="h6 mb-3">Progress by Milestone</h3>
            {tasksByMilestone.map(({ milestone, totalTasks, completedTasks, progressPercentage }) => (
              <div key={milestone.id} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>{milestone.title}</span>
                  <span>
                    {completedTasks} of {totalTasks} tasks ({progressPercentage}%)
                  </span>
                </div>
                <ProgressBar now={progressPercentage} variant={progressPercentage === 100 ? "success" : "primary"} />
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-muted">No tasks added yet. Add tasks to see your progress!</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProgressSummary

