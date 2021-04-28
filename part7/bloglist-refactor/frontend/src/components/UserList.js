import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const ListOfUsers = () => {
  const users = useSelector((state) => state.users);
  if (!users) {
    return null;
  }
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>user</b>
            </TableCell>
            <TableCell>
              <b>blogs</b>
            </TableCell>
          </TableRow>
          {users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => {
              return (
                <TableRow key={user.username}>
                  <TableCell>
                    <RouterLink to={`/user/${user.id}`}>
                      {user.username}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOfUsers;
