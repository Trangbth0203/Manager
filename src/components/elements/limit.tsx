
import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

export const Limit = () => {
  return (
    <Form className="mt-4">
      <FormGroup className="d-flex justify-content-between" >
        <Label style={{ marginTop:'5px'}} for="exampleSelect">Hiển thị</Label>
        <Input style={{height:'35px',width:'45px',margin:'0 10px'}}type="select" name="select" id="exampleSelect">
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
        </Input>
        <Label style={{ marginTop:'5px'}}for="exampleSelect">Kết quả</Label>
      </FormGroup>

    </Form>
  )
}
