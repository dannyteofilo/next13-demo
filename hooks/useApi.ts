import { useState } from "react";

const API_URL = "http://34.201.69.243/api/todo";
type TodoData = {
  todos: any[];
  total: number;
};

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TodoData>({ todos: [], total: 0 });
  const [error, setError] = useState(null);

  const fetchData = async (
    method: string,
    authToken: string,
    requestData: any = null
  ) => {
    let url = API_URL;

    if (method === "delete" || method === "put") {
      url = `${API_URL}/${requestData.id}`;
    }

    try {
      setLoading(true);
      setError(null);
      const headers = {
        Authorization: authToken && JSON.parse(authToken),
        "Content-Type": "application/json",
      };

      let response;

      if (method === "get" || method === "delete") {
        response = await fetch(url, { method, headers });
      } else {
        response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(requestData),
        });
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (method === "get") {
        const responseData = await response.json();
        setData(responseData);
      } else if (method === "delete") {
        setData((prevData) => ({
          ...prevData,
          todos: prevData.todos.filter((todo) => todo.id !== requestData.id),
        }));
      } else if (method === "put") {
        setData((prevData) => ({
          ...prevData,
          todos: prevData.todos.map((todo) =>
            todo.id === requestData.id ? { ...todo, ...requestData } : todo
          ),
        }));
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
}
