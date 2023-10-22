"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { useApi } from "@/hooks/useApi";

const DashboardPage = () => {  
  const [title, setTitle] = useState("");
  const { getAuthTokenCookie } = useAuthContext();
  const authTokenCookie = getAuthTokenCookie();
  const { loading, data: todosData, error, fetchData } = useApi();

  console.log("data: ", todosData);

  useEffect(() => {
    if (authTokenCookie) {
      fetchData("get", authTokenCookie);
    }
  }, [authTokenCookie]);

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      const requestData: any = {
        title: title,
        completed: false,
      };

      await fetchData("post", authTokenCookie, requestData);
      fetchData("get", authTokenCookie);
      setTitle("");
    } catch (err) {
      handleError(err);
    }
  };

  const deleteTodo = async (uid: string) => {
    try {      
      await fetchData("delete", authTokenCookie, { id: uid });
      fetchData("get", authTokenCookie);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = (uid: string) => {
    deleteTodo(uid);
  };

  return (
    <>
      <h1>Todo List {todosData.total}</h1>
      <form onSubmit={handleCreate}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Create</button>
      </form>
      <ul>
        {todosData.todos?.map((todo: any) => (
          <ul key={todo.uid}>
            <div>
              <h6>{todo.title}</h6>
              <button onClick={() => handleDelete(todo.uid)}>Delete</button>
            </div>
          </ul>
        ))}
      </ul>
    </>
  );
};

export default DashboardPage;
