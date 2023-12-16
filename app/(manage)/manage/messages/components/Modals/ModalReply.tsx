"use client"

import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";
import {Input, TextArea} from "@/app/components/Inputs";
import React from "react";
import {useRouter} from "next/navigation";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";
import {useMessagePage} from "@/app/(manage)/manage/messages/context/MessageContext";
import {replyMessage} from "@/app/services/messages";

export const ModalReply = () => {
  const {showReply, setShowReply, selectedMessage} = useMessagePage();
  const {refresh} = useRouter();
  const defaultValues = {
    subject: `Reply: ${selectedMessage?.name} project ${selectedMessage?.project}`,
    message: '',
  };

  const onSubmit: FormSubmitHandler<typeof defaultValues> = async (data) => {
    await replyMessage(selectedMessage?.id || 0, data);
    onClose();
    refresh();
  }

  const onClose = () => {
    setShowReply(false);
  }

  return (
    <Modal show={showReply}>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <ModalHeader title="Submit Reply" icon={"uil-envelope-upload"} onClose={onClose}/>
        <ModalBody>
          <Input
              label={"Subject"}
              placeholder={"Message title"}
              name={"subject"}
          />
          <TextArea
              label={"Message"}
              placeholder={"Message content..."}
              name={"message"}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant={"white"} onClick={onClose}>Close</Button>
          <Button type={"submit"} variant={"success"}>
            Send Reply
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}
