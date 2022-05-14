import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useLoginMutation } from "../generated/graphql";
import { useCookies } from "react-cookie"

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [cookie, setCookie] = useCookies(["token"])
    const { mutate } = useLoginMutation({
      onSuccess: (data) => {
        console.log('logged?', data)
        if(data.login)
          setCookie("token", data.login, {
              path: "/",
              maxAge: 360000, // Expires after 1hr
              sameSite: true,
          })
      }
    })

    const loginUser = (e:any) => {
        e.preventDefault();
        mutate({email , password })
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => loginUser(e)}>
                Login
            </Button>
        </Form>
    )
}

export default LoginForm