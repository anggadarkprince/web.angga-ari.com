"use client"

import {DropdownItem} from "@/app/components/Dropdowns";
import {useMessagePage} from "@/app/(manage)/manage/messages/context/MessageContext";
import {ContactType} from "@/app/services/messages";

export const ButtonReply = ({message}: {message: ContactType}) => {
  const {setShowReply, setSelectedMessage} = useMessagePage();

  const onShowReplyModal = () => {
    setSelectedMessage(message);
    setShowReply(true);
  }

  return (
    <DropdownItem icon="uil-envelope-upload" title="Reply" onClick={onShowReplyModal}/>
  )
}