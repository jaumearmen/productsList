export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
  source: string
  value: number
  lastContact: string
  assignedAgent: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  sender: 'agent' | 'lead'
  message: string
  timestamp: string
  type: 'text' | 'email' | 'call' | 'meeting'
}

export interface LeadChatHistory {
  leadId: string
  messages: ChatMessage[]
}