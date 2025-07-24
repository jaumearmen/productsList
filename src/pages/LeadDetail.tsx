import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, Building, Calendar, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { mockLeads, mockChatHistories } from '@/data/mockData'
import type { ChatMessage } from '@/types/lead'

const statusColors = {
  new: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  qualified: 'bg-green-100 text-green-800 hover:bg-green-200',
  proposal: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  won: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  lost: 'bg-red-100 text-red-800 hover:bg-red-200'
}

const messageTypeIcons = {
  email: Mail,
  call: Phone,
  text: Mail,
  meeting: Calendar
}

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const lead = mockLeads.find(l => l.id === id)
  const chatHistory = mockChatHistories.find(ch => ch.leadId === id)

  if (!lead) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Lead not found</p>
        <Button onClick={() => navigate('/leads')} className="mt-4">
          Back to Leads
        </Button>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const MessageIcon = ({ type }: { type: ChatMessage['type'] }) => {
    const Icon = messageTypeIcons[type]
    return <Icon className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/leads')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Leads</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lead Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {lead.name}
                <Badge className={statusColors[lead.status]}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{lead.company}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.email}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.phone}</span>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deal Value</span>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatCurrency(lead.value)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Source</span>
                <span className="font-medium">{lead.source}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Assigned Agent</span>
                <span className="font-medium">{lead.assignedAgent}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="font-medium">{formatDate(lead.createdAt)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Contact</span>
                <span className="font-medium">{formatDate(lead.lastContact)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversation History</CardTitle>
            </CardHeader>
            <CardContent>
              {chatHistory && chatHistory.messages.length > 0 ? (
                <div className="space-y-4">
                  {chatHistory.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'agent'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageIcon type={message.type} />
                          <span className="text-xs font-medium">
                            {message.sender === 'agent' ? lead.assignedAgent : lead.name}
                          </span>
                          <span className="text-xs opacity-70">
                            {formatDateTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No conversation history available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}