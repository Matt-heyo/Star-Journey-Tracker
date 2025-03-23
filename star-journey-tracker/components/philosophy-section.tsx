"use client"

import { useState } from "react"
import { Card, Button, Form } from "react-bootstrap"

interface PhilosophySectionProps {
  philosophy: string
  updatePhilosophy: (philosophy: string) => void
}

const PhilosophySection = ({ philosophy, updatePhilosophy }: PhilosophySectionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPhilosophy, setEditedPhilosophy] = useState(philosophy)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSave = () => {
    updatePhilosophy(editedPhilosophy)
    setIsEditing(false)
  }

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">STAR Philosophy</h2>
        <Button variant="link" onClick={() => setIsCollapsed(!isCollapsed)} aria-expanded={!isCollapsed}>
          {isCollapsed ? "Show" : "Hide"}
        </Button>
      </Card.Header>

      {!isCollapsed && (
        <Card.Body>
          {isEditing ? (
            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editedPhilosophy}
                  onChange={(e) => setEditedPhilosophy(e.target.value)}
                />
              </Form.Group>
              <div className="mt-3">
                <Button variant="primary" onClick={handleSave} className="me-2">
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <>
              <Card.Text>{philosophy}</Card.Text>
              <Button variant="outline-secondary" size="sm" onClick={() => setIsEditing(true)}>
                Edit Philosophy
              </Button>
            </>
          )}
        </Card.Body>
      )}
    </Card>
  )
}

export default PhilosophySection

