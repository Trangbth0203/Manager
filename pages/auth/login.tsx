import React from 'react';
import { Card, Form, FormGroup, Label, Input, Button,CardTitle } from 'reactstrap';
import styles from '~/styles/components/widgets/login.module.scss'


const Login = () => {

return (
    <Card className={styles.CardLogin}>
    <CardTitle  className={styles.TitleLogin}>LOGIN FORM</CardTitle>
    <Form className={styles.FormLogin}>
    <FormGroup>
      <Label  className="mb-1" for="exampleEmail">Email</Label>
      <Input   type="email" name="email" id="exampleEmail" placeholder="Email" />
    </FormGroup>
    <FormGroup className="mt-3">
      <Label className="mb-1" for="examplePassword">Password</Label>
      <Input type="password" name="password" id="examplePassword" placeholder="Password " />
    </FormGroup>
    <Button className={styles.ButtonLogin} active>Log In</Button>
    <Label className="mb-4"  >Or continue with social account?</Label>
    </Form>
    </Card>

);
}

export default Login
