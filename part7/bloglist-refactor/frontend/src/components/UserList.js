import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListOfUsers = () => {
  const users = useSelector((state) => state.users);
  if (!users) {
    return null;
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <b>user</b>
            </td>
            <td>
              <b>blogs</b>
            </td>
          </tr>
          {users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => {
              return (
                <tr key={user.username}>
                  <td>
                    <Link to={`/user/${user.id}`}>{user.username}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfUsers;
