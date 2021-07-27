import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

export const UserAdd = () => {
  return (
    <Form>
      <FormGroup className="mt-3">
        <Label className="mb-1" for="exampleEmail">RoleName</Label>
        <Input
          type="text"
          name="roleName"
          id="exampleRoleName"
          placeholder="With a Role_name"
        />
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1" for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="email"
        />
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1" for="examplePassword">Password</Label>
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
