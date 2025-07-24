import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockLeads } from '@/data/mockData'
import type { Lead } from '@/types/lead'

const statusColors = {
  new: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  qualified: 'bg-green-100 text-green-800 hover:bg-green-200',
  proposal: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  won: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  lost: 'bg-red-100 text-red-800 hover:bg-red-200'
}

export default function Leads() {
  const [leads] = useState<Lead[]>(mockLeads)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRowClick = (leadId: string) => {
    navigate(`/leads/${leadId}`)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage your sales leads and track conversations
          </p>
        </div>
        <Button>Add New Lead</Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Last Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(lead.id)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.company}</div>
                    <div className="text-sm text-muted-foreground">{lead.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status]}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(lead.value)}
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.assignedAgent}</TableCell>
                <TableCell>{formatDate(lead.lastContact)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No leads found matching your search.</p>
        </div>
      )}
    </div>
  )
}