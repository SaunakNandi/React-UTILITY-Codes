import { Suspense, useState } from "react";
import "./App.css";
import { UsersList } from "./UserList";

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading Users...</p>}>
        <UsersList />
      </Suspense>
    </>
  );
}

export default App;
