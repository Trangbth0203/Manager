import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

export const UserAdd = (props) => {
  return (
    <>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">RoleName</Label>
          <Input
            type="text"
            name="roleName"
            id="exampleRoleName"
            placeholder="With a Role_name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password "
          />
        </FormGroup>
      </Form>
    </>
  )
}
