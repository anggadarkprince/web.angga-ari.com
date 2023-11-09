import {Input, InputProps} from "@/app/components/Inputs/Input";

export const TextArea = ({...rest}: InputProps) => {
  return <Input as="textarea" {...rest} />
}
