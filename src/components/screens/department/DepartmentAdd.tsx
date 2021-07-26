import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export const DepartmentAdd = (props) => {
  return (
    <Form>
      <FormGroup>
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
        <FormGroup>
          <Label for="exampleNumberPerson">Number Person</Label>
          <Input
            type="number"
            name="Number_person"
            id="exampleNumber Person"
            placeholder="NumberPerson"
          />
        </FormGroup>
        <FormGroup>
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
        <FormGroup>
          <Label for="exampleMainManager">Main Manager</Label>
          <Input
            type="text"
            name="Main_manager"
            id="exampleMainManager"
            placeholder="Name  Main_manager"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleOtherManagers">Other Managers</Label>
          <Input
            type="text"
            name="Other_managers"
            id="exampleOtherManagers"
            placeholder="Name Other_Managers"
          />
        </FormGroup>
      </div>
    </Form>
  )
}
