"use client"

import { useState } from "react"
import { Card, Button, Form, ListGroup, Modal } from "react-bootstrap"
import type { Milestone } from "@/lib/types"

interface MilestonesSectionProps {
  milestones: Milestone[]
  addMilestone: (milestone: Omit<Milestone, "id">) => void
}

const MilestonesSection = ({ milestones, addMilestone }: MilestonesSectionProps) => {
  const [showModal, setShowModal] = useState(false)
  const [newMilestone, setNewMilestone] = useState({ title: "", description: "" })

  const handleSubmit = () => {
    if (newMilestone.title.trim()) {
      addMilestone(newMilestone)
      setNewMilestone({ title: "", description: "" })
      setShowModal(false)
    }
  }

  return (
    <>
      <Card className="h-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">Milestones</h2>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            Add Milestone
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          {milestones.length > 0 ? (
            milestones.map((milestone) => (
              <ListGroup.Item key={milestone.id}>
                <h3 className="h6 mb-1">{milestone.title}</h3>
                <p className="text-muted small mb-0">{milestone.description}</p>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center py-4 text-muted">
              No milestones yet. Add your first milestone!
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter milestone title"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter a short description"
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Milestone
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MilestonesSection

