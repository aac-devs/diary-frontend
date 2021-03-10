const baseUrl = process.env.PROD_API_URL;

const fetchWithToken = (endpoind, data, method = "GET") => {
  const url = `${baseUrl}/${endpoind}`;
  console.log(url);
  console.log("fetch with token");
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchWithToken };
