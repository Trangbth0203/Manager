import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

export const UserEdit = () => {
  return (
    <Form>
      <FormGroup className="mt-3">
      <Label className="mb-1" for="exampleEmail">RoleName</Label>
      <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1"for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password "
        />
      </FormGroup>
    </Form>
  )
}
