import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IntegrationFormProps {
  onSubmit: (integration: { title: string; body: Record<string, unknown> }) => void
}

export default function IntegrationForm({ onSubmit }: IntegrationFormProps) {
  const [title, setTitle] = useState('')
  const [jsonBody, setJsonBody] = useState('')
  const [isValidJson, setIsValidJson] = useState(true)

  const validateJson = (jsonString: string) => {
    try {
      JSON.parse(jsonString)
      return true
    } catch {
      return false
    }
  }

  const handleJsonChange = (value: string) => {
    setJsonBody(value)
    setIsValidJson(value === '' || validateJson(value))
  }

  const formatJson = () => {
    if (!jsonBody.trim()) return
    
    try {
      const parsed = JSON.parse(jsonBody)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonBody(formatted)
      setIsValidJson(true)
    } catch {
      alert('Invalid JSON - cannot format')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a title')
      return
    }

    if (!isValidJson) {
      alert('Please enter valid JSON')
      return
    }

    onSubmit({
      title: title.trim(),
      body: JSON.parse(jsonBody || '{}')
    })
    
    // Reset form
    setTitle('')
    setJsonBody('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Integração</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Título da integração
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da integração"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="jsonBody" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                JSON Body da integração
              </label>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={formatJson}
              >
                Formatar JSON
              </Button>
            </div>
            <textarea
              id="jsonBody"
              value={jsonBody}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleJsonChange(e.target.value)}
              className={`flex min-h-[200px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono ${
                jsonBody && !isValidJson 
                  ? 'border-destructive focus-visible:ring-destructive' 
                  : 'border-input'
              }`}
              placeholder='{"key": "value", "config": {"setting": true}}'
            />
            {jsonBody && !isValidJson && (
              <p className="text-destructive text-sm">Formato JSON inválido</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!title.trim() || (jsonBody !== '' && !isValidJson)}
            >
              Criar integração
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 