import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from '@/components/dialog'
import Button from '@/components/button'
import { useForm } from '@inertiajs/react'
import Label from '@/components/label'
import Input from '@/components/input'

export type CreateOrganizationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CreateOrganizationDialog({ open, setOpen }: CreateOrganizationDialogProps) {
  const form = useForm({
    name: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/organizations', {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] gap-0">
        <DialogHeader>
          <DialogTitle>New Organization</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 px-6 pt-0">
            <div className="grid gap-1">
              <Label>Organization Name</Label>

              <Input
                id="name"
                className="!col-span-3 w-full"
                value={form.data.name}
                placeholder="manhattan-project"
                onChange={(e) => form.setData('name', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" loading={form.processing}>
              <span>Create new Organization</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
