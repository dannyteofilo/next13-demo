"use client";
import { useState } from "react";
import {
  LoginContainer,
  Title,
  FormGroup,
  Label,
  Input,
  Button,
} from "./styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";

const FormLogin = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    name == "email" ? setEmail(value) : setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(
        "http://34.201.69.243/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("response: ", response);
      const { token } = response.data;
      login(token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
    console.log("Data: ", { email, password });
  };

  return (
    <>
      <LoginContainer>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="">Email</Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="">Password</Label>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={handleOnChange}
            />
          </FormGroup>
          <Button type="submit">Sign in</Button>
        </form>
      </LoginContainer>
    </>
  );
};

export default FormLogin;
