"use client"

import {DropdownItem} from "@/app/components/Dropdowns";
import {useMessagePage} from "@/app/(manage)/manage/messages/context/MessageContext";
import {ContactType} from "@/app/services/messages";

export const ButtonDelete = ({message}: {message: ContactType}) => {
  const {setShowDelete, setSelectedMessage} = useMessagePage();

  const onShowDeleteModal = () => {
    setSelectedMessage(message);
    setShowDelete(true);
  }

  return (
    <DropdownItem icon="uil-trash" title="Delete" onClick={onShowDeleteModal}/>
  )
}