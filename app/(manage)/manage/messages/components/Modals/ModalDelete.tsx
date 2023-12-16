"use client"

import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";
import {useMessagePage} from "@/app/(manage)/manage/messages/context/MessageContext";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {deleteMessage} from "@/app/services/messages";

export const ModalDelete = () => {
  const {showDelete, setShowDelete, selectedMessage} = useMessagePage();
  const [isDeleting, setIsDeleting] = useState(false);
  const {refresh} = useRouter();

  if (showDelete && !selectedMessage) {
    throw new Error('Selected message is not defined');
  }

  const onClose = () => {
    setShowDelete(false);
  }

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteMessage(selectedMessage?.id || 0);
    setIsDeleting(false);
    onClose();
    refresh();
  }

  return (
    <Modal show={showDelete}>
      <ModalHeader title={`Delete Experience`} icon={"uil-trash"} onClose={onClose} disabled={isDeleting}/>
      <ModalBody>
        <p>Are you sure want to delete Message {<strong>{selectedMessage?.name}</strong>}?</p>
        <small className="text-fade">
          <i className="uil-exclamation-circle mr-0-5"></i>Your action may be irreversible
        </small>
      </ModalBody>
      <ModalFooter>
        <Button variant={"white"} onClick={onClose} disabled={isDeleting}>Cancel</Button>
        <Button variant={"danger"} onClick={onDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
