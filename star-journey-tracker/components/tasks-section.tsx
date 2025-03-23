"use client"

import { useState } from "react"
import { Card, Button, Form, ListGroup, Modal, Badge } from "react-bootstrap"
import type { Task, Milestone } from "@/lib/types"

interface TasksSectionProps {
  tasks: Task[]
  milestones: Milestone[]
  addTask: (task: Omit<Task, "id">) => void
  toggleTaskCompletion: (taskId: string) => void
}

const TasksSection = ({ tasks, milestones, addTask, toggleTaskCompletion }: TasksSectionProps) => {
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    milestoneId: "",
    completed: false,
    date: "",
    notes: "",
  })
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | "all">("all")

  const handleSubmit = () => {
    if (newTask.title.trim() && newTask.milestoneId) {
      addTask(newTask)
      setNewTask({
        title: "",
        milestoneId: "",
        completed: false,
        date: "",
        notes: "",
      })
      setShowModal(false)
    }
  }

  const filteredTasks =
    selectedMilestoneId === "all" ? tasks : tasks.filter((task) => task.milestoneId === selectedMilestoneId)

  const getMilestoneName = (milestoneId: string) => {
    const milestone = milestones.find((m) => m.id === milestoneId)
    return milestone ? milestone.title : "Unknown Milestone"
  }

  return (
    <>
      <Card className="h-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">Tasks</h2>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            Add Task
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="p-3 border-bottom">
            <Form.Select
              value={selectedMilestoneId}
              onChange={(e) => setSelectedMilestoneId(e.target.value)}
              aria-label="Filter tasks by milestone"
            >
              <option value="all">All Milestones</option>
              {milestones.map((milestone) => (
                <option key={milestone.id} value={milestone.id}>
                  {milestone.title}
                </option>
              ))}
            </Form.Select>
          </div>
          <ListGroup variant="flush">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <ListGroup.Item key={task.id} className="d-flex align-items-start py-3">
                  <Form.Check
                    className="me-2 mt-1"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className={`mb-0 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
                          {task.title}
                        </p>
                        <small className="text-muted d-block">{task.notes}</small>
                      </div>
                      <Badge bg="info" className="ms-2">
                        {getMilestoneName(task.milestoneId)}
                      </Badge>
                    </div>
                    <small className="text-muted">{task.date}</small>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center py-4 text-muted">
                {selectedMilestoneId === "all"
                  ? "No tasks yet. Add your first task!"
                  : "No tasks for this milestone yet."}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Milestone</Form.Label>
              <Form.Select
                value={newTask.milestoneId}
                onChange={(e) => setNewTask({ ...newTask, milestoneId: e.target.value })}
              >
                <option value="">Select a milestone</option>
                {milestones.map((milestone) => (
                  <option key={milestone.id} value={milestone.id}>
                    {milestone.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Add any notes about this task"
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!newTask.title || !newTask.milestoneId}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TasksSection

