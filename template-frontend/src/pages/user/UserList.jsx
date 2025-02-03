import useSWR from "swr";
import User from "../../components/user/User"
import AsyncData from "../../components/AsyncData";
import * as api from '../../api/index';

export default function UserList() {
   const { data: users = [], error, isLoading: loading } = useSWR("users", api.getAll);
  return (
    <>
      <h1>All of this template&apos;s users:</h1>
      <AsyncData error={error} loading={loading}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 3fr))",
            gap: "1rem",
          }}
        >
          {Array.isArray(users) ? (
            users?.map((user) => (
              <div
                key={user?.userId}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <User key={user.userId} user={user} />
              </div>
            ))
          ) : (
            <p>No users found.</p> 
          )}
        </div>
      </AsyncData>
    </>
  );
}
