export interface Milestone {
    id: string
    title: string
    description: string
  }
  
  export interface Task {
    id: string
    milestoneId: string
    title: string
    completed: boolean
    date: string
    notes: string
  }
  
  