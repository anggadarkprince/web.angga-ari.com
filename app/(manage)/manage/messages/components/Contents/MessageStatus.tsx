import {Label} from "@/app/components/Label";

enum StatusClass {
  'PENDING' = 'white',
  'REPLIED' = 'success',
  'REJECTED' = 'error',
  'HOLD' = 'warning',
}

export const MessageStatus = ({status}: {status: string}) => {
  return (
    <Label variant={StatusClass[status as keyof typeof StatusClass]}>
      {status.toString()}
    </Label>
  )
}