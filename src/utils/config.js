
export const api = "https://localhost:7049/api";

export const requestConfig = (method, data, token = null) => {
  let config;

  if (method === "DELETE" || data === null) {
    config = {
      method: method,     
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
      },
    };
  } else {
    config = {
        method: method, 
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*',
        },
    };
    console.log(data)
    console.log(config)
  }

  if (token) 
    config.headers.Authorization = `Bearer ${token}`;
  
  return config;
};
