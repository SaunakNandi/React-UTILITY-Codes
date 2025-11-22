export function createResource(promise) {
   
 let status = "pending";
  let result;

  promise.then(
    res => {
      status = "success";
      result = res;
    },
    err => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") throw promise;
      if (status === "error") throw result;
      return result;
    }
  };
}

export const userResource = createResource(
  fetch("https://jsonplaceholder.typicode.com/users").then(res =>
    res.json() // this is a promise
  )
);

