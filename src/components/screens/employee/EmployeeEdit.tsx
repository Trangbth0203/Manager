import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

export const EmployeeEdit = () => {
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
      <FormGroup className="mt-3">
        <Label for="exampleSelect">Email</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>huyentrang123@</option>
          <option>thuhoai123@</option>
          <option>thenhat123@</option>
        </Input>
      </FormGroup>
      <FormGroup className="mt-3">
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>
      <div className="d-flex justify-content-between">
        <FormGroup className="mt-3">
          <Label  className="mb-1" for="exampleFirstName">First Name</Label>
          <Input
            type="text"
            name="Fist_name"
            id="exampleFistName"
            placeholder="write  Firstname"
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Label  className="mb-1" for="exampleLastName">Last Name</Label>
          <Input
            type="text"
            name="Lastname"
            id="exampleLastName"
            placeholder="write Lastname"
          />
        </FormGroup>
      </div>
      <div className="d-flex justify-content-between mt-3" >
        <Label  for="exampleEmail">Gender: </Label>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> 0
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> 1
          </Label>
        </FormGroup>
      </div>
    </Form>
  )
}
