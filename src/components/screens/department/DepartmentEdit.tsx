import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

export const DepartmentEdit = () => {
  return (
    <Form>
      <FormGroup className="mt-3">
        <Label for="exampleSelect">DepartmentName</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>Division1</option>
          <option>Division2</option>
          <option>Division3</option>
          <option>Division4</option>
          <option>Division5</option>
        </Input>
      </FormGroup>
      <div className="d-flex justify-content-between">
        <FormGroup className="mt-3">
          <Label for="exampleNumberPerson">Number Person</Label>
          <Input
            type="number"
            name="Numberperson"
            id="exampleNumber Person"
            placeholder="NumberPerson"
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Label for="exampleOtherPhone">Phone</Label>
          <Input
            type="text"
            name="Phone"
            id="exampleOtherPhone"
            placeholder="Phone"
          />
        </FormGroup>
      </div>
      <div className="d-flex justify-content-between">
        <FormGroup className="mt-3">
          <Label for="exampleMainManager">Main Manager</Label>
          <Input
            type="text"
            name="Mainmanager"
            id="exampleMainManager"
            placeholder="Name  Mainmanager"
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Label for="exampleOtherManagers">Other Managers</Label>
          <Input
            type="text"
            name="Othermanagers"
            id="exampleOtherManagers"
            placeholder="Name OtherManagers"
          />
        </FormGroup>
      </div>
    </Form>
  )
}