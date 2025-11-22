import { userResource } from "./utility-func";

export function UsersList() {
  const users = userResource.read(); // Suspense pauses here until resolved

  return (
    <ul>
      {users?.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
