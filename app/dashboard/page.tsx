"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormValues {
  title: string;
}

const DashboardPage = () => {
  const [todos, setTodos] = useState([]);
  const cookie = Cookies.get("authTokens");
  const [title, setTitle] = useState("");

  const initialValues: FormValues = {
    title: "",
  };
  useEffect(() => {
    if (cookie) {
      getTodos();
    }
  }, [cookie]);

  const getTodos = async () => {
    try {
      const config = {
        method: "get",
        url: "http://34.201.69.243/api/todo",
        headers: {
          Authorization: cookie && JSON.parse(cookie),
        },
      };
      const response: any = await axios.request(config);
      const { todos } = response.data;
      setTodos(todos);
      console.log("response: ", response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form: ", title);
    try {
      const data = JSON.stringify({
        title: title,
        completed: false,
      });
      const config = {
        method: "post",
        url: "http://34.201.69.243/api/todo",
        headers: {
          Authorization: cookie && JSON.parse(cookie),
          "Content-Type": "application/json",
        },
        data,
      };
      const response: any = await axios.request(config);
      console.log("response: ", response);
      setTitle("");
      getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    // resetForm()
  }

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (values.title.length < 6) {
      errors.title = "El titulo debe tener al menos 6 caracteres";
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: any) => {
          return <ul key={todo.uid}>{todo.title}</ul>;
        })}
      </ul>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <Form>
          <label htmlFor="">Title</label>
          <Field type="text" name="title" />
          <ErrorMessage
            name="title"
            component="div"
            className="error"
          ></ErrorMessage>
          <button type="submit">Create</button>
        </Form>
      </Formik>

      {/* <form onSubmit={handleCreate}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create</button>
      </form> */}
    </>
  );
};

export default DashboardPage;
