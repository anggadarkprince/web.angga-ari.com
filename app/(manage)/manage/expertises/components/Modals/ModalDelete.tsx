import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";

interface ModalDeleteProps {
  show: boolean;
  isDeleting: boolean;
  title: string;
  label: string;
  onClose: () => void;
  onDelete: () => void;
}
export const ModalDelete = ({show, title, label, onClose, onDelete, isDeleting = false}: ModalDeleteProps) => {
  return (
    <Modal show={show}>
      <ModalHeader title={`Delete ${title}`} icon={"uil-trash"} onClose={onClose}/>
      <ModalBody>
        <p>Are you sure want to delete <strong>{label}</strong>?</p>
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
