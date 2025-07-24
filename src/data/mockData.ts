import type { Lead, LeadChatHistory } from '@/types/lead'

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    status: 'qualified',
    source: 'Website',
    value: 25000,
    lastContact: '2024-01-23',
    assignedAgent: 'Alex Chen',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'mike.r@innovate.io',
    phone: '+1 (555) 987-6543',
    company: 'Innovate Digital',
    status: 'proposal',
    source: 'LinkedIn',
    value: 45000,
    lastContact: '2024-01-22',
    assignedAgent: 'Emma Wilson',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    email: 'j.kim@globalventures.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Ventures Inc',
    status: 'new',
    source: 'Referral',
    value: 75000,
    lastContact: '2024-01-24',
    assignedAgent: 'David Park',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'Robert Thompson',
    email: 'robert.t@startupco.com',
    phone: '+1 (555) 321-0987',
    company: 'StartupCo',
    status: 'contacted',
    source: 'Google Ads',
    value: 15000,
    lastContact: '2024-01-21',
    assignedAgent: 'Alex Chen',
    createdAt: '2024-01-18'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@enterprise.net',
    phone: '+1 (555) 654-3210',
    company: 'Enterprise Networks',
    status: 'won',
    source: 'Cold Email',
    value: 120000,
    lastContact: '2024-01-19',
    assignedAgent: 'Emma Wilson',
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'James Miller',
    email: 'james.m@techstart.com',
    phone: '+1 (555) 789-0123',
    company: 'TechStart Ltd',
    status: 'lost',
    source: 'Trade Show',
    value: 30000,
    lastContact: '2024-01-20',
    assignedAgent: 'David Park',
    createdAt: '2024-01-12'
  }
]

export const mockChatHistories: LeadChatHistory[] = [
  {
    leadId: '1',
    messages: [
      {
        id: '1',
        sender: 'lead',
        message: 'Hi, I\'m interested in your enterprise software solutions. Can you tell me more about pricing?',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'email'
      },
      {
        id: '2',
        sender: 'agent',
        message: 'Hello Sarah! Thank you for your interest. I\'d be happy to discuss our enterprise solutions. Our packages start at $15,000 annually. Would you like to schedule a demo call to see how it fits your needs?',
        timestamp: '2024-01-15T14:20:00Z',
        type: 'email'
      },
      {
        id: '3',
        sender: 'lead',
        message: 'Yes, that sounds great. I\'m available next Tuesday or Wednesday afternoon.',
        timestamp: '2024-01-16T09:15:00Z',
        type: 'email'
      },
      {
        id: '4',
        sender: 'agent',
        message: 'Perfect! I\'ve scheduled us for Wednesday at 2 PM. I\'ll send you a calendar invite with the meeting details.',
        timestamp: '2024-01-16T11:30:00Z',
        type: 'email'
      },
      {
        id: '5',
        sender: 'agent',
        message: 'Had a great demo call with Sarah. She\'s very interested and wants to see custom integration options. Following up with technical specifications.',
        timestamp: '2024-01-17T15:00:00Z',
        type: 'call'
      },
      {
        id: '6',
        sender: 'lead',
        message: 'The demo was impressive! Our tech team reviewed the specs. We\'re ready to move forward with the Professional plan. What are the next steps?',
        timestamp: '2024-01-23T08:45:00Z',
        type: 'email'
      }
    ]
  },
  {
    leadId: '2',
    messages: [
      {
        id: '7',
        sender: 'agent',
        message: 'Hi Michael, I saw your LinkedIn post about scaling your digital marketing operations. Our platform might be exactly what you need. Would love to chat!',
        timestamp: '2024-01-10T12:00:00Z',
        type: 'text'
      },
      {
        id: '8',
        sender: 'lead',
        message: 'Thanks for reaching out! We are indeed looking for better solutions. Can you send me some information about your platform?',
        timestamp: '2024-01-11T16:30:00Z',
        type: 'text'
      },
      {
        id: '9',
        sender: 'agent',
        message: 'Absolutely! I\'ve sent you a detailed brochure and case studies. Our platform has helped similar companies increase efficiency by 40%. Would you be open to a 30-minute discovery call?',
        timestamp: '2024-01-12T10:15:00Z',
        type: 'email'
      },
      {
        id: '10',
        sender: 'agent',
        message: 'Discovery call completed. Michael is very interested in our analytics features. Preparing custom proposal for $45K annual license.',
        timestamp: '2024-01-18T14:00:00Z',
        type: 'call'
      },
      {
        id: '11',
        sender: 'lead',
        message: 'Thanks for the comprehensive proposal! Our team is reviewing it. We should have feedback by early next week.',
        timestamp: '2024-01-22T11:20:00Z',
        type: 'email'
      }
    ]
  },
  {
    leadId: '3',
    messages: [
      {
        id: '12',
        sender: 'lead',
        message: 'I was referred to your company by Tom Wilson. He mentioned you helped him streamline his operations significantly.',
        timestamp: '2024-01-20T13:45:00Z',
        type: 'email'
      },
      {
        id: '13',
        sender: 'agent',
        message: 'Hi Jennifer! Tom is a great client of ours. I\'d love to learn more about Global Ventures and see how we can help you achieve similar results. Are you available for a brief call this week?',
        timestamp: '2024-01-21T09:30:00Z',
        type: 'email'
      },
      {
        id: '14',
        sender: 'lead',
        message: 'I\'m quite busy this week, but I\'m definitely interested. Could we schedule something for next week instead?',
        timestamp: '2024-01-24T15:10:00Z',
        type: 'email'
      }
    ]
  }
]