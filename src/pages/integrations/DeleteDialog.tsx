import { MessageModal } from '../../components/MessageModal'
import { Button } from '../../components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface DeleteDialogProps {
  title: string
  onDelete: () => void
  trigger?: React.ReactNode
}

export default function DeleteDialog({ title, onDelete, trigger }: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    onDelete()
    setIsOpen(false)
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <MessageModal
        variant="error"
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir a integração "${title}"? Esta ação não pode ser desfeita.`}
        open={isOpen}
        onOpenChange={setIsOpen}
        showCloseButton={false}
        actions={{
          cancel: {
            label: "Cancelar",
            variant: "outline"
          },
          confirm: {
            label: "Excluir",
            variant: "destructive",
            onClick: handleDelete
          }
        }}
      />
    </>
  )
} 