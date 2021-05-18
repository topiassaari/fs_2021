import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { Type } from "../types";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Occupational health care entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm
        initialValues={{
          type: Type.OccupationalHealthCare,
          description: "",
          date: "",
          specialist: "",
          employerName: "",
          sickLeave: { startDate: "", endDate: "" },
        }}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
