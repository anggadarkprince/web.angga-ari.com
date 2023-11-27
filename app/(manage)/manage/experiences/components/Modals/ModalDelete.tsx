import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";

interface ModalDeleteProps {
  show: boolean;
  isDeleting: boolean;
  label?: string | null;
  onClose: () => void;
  onDelete: () => void;
}
export const ModalDelete = ({show, label, onClose, onDelete, isDeleting = false}: ModalDeleteProps) => {
  return (
    <Modal show={show}>
      <ModalHeader title={`Delete Experience`} icon={"uil-trash"} onClose={onClose}/>
      <ModalBody>
        <p>Are you sure want to delete Experience {label && <strong>{label}</strong>}?</p>
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
