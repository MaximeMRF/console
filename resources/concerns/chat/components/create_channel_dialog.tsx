import * as React from 'react'
import useSuccessToast from '@/hooks/use_success_toast'
import { useForm } from '@inertiajs/react'
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogFooter } from '@/components/dialog'
import Label from '@/components/label'
import Input from '@/components/input'
import Button from '@/components/button'
import useParams from '@/hooks/use_params'
import slugify from '@/lib/slugify'

interface CreateChannelDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const CreateChannelDialog: React.FunctionComponent<CreateChannelDialogProps> = ({
  open,
  setOpen,
}) => {
  const params = useParams()
  const form = useForm({
    name: '',
  })
  const successToast = useSuccessToast()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    form.post(`/organizations/${params.organizationSlug}/channels`, {
      onSuccess: () => successToast(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] gap-0">
        <DialogHeader>
          <DialogTitle className="items-center space-x-2">
            <span>Create Channel</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-1 pb-4 px-6">
            <Label>Name</Label>
            <Input
              id="name"
              className="!col-span-3 w-full"
              placeholder="Name"
              value={form.data.name}
              onChange={(e) => form.setData('name', slugify(e.target.value))}
            />
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between space-x-2">
              <Button type="submit" loading={form.processing}>
                Create Channel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannelDialog
