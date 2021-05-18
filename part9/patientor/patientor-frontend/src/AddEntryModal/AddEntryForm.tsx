import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { NewEntry } from "../types";
import { useStateValue } from "../state";

/*Only supports entry for Occupational currently
 */
export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  initialValues: NewEntry;
}

export const AddEntryForm = ({ onSubmit, onCancel, initialValues }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="yyyy-mm-dd"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="employer"
              placeholder="employer"
              name="employerName"
              component={TextField}
            />
            <Header size="small">Sick Leave</Header>
            <Field
              label="start date"
              placeholder="yyyy-mm-dd"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="end date"
              placeholder="yyyy-mm-dd"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
