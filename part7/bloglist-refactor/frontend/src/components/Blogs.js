import React from "react";

import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <TableContainer style={{ padding: "10px 0" }}>
      <Table>
        <TableBody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow
                key={blog.id}
                style={{
                  padding: 10,
                  border: "solid",
                  borderWidth: 2,
                  marginBottom: 10,
                }}
              >
                <TableCell>
                  <RouterLink to={`/blog/${blog.id}`}>
                    {blog.title} {blog.author}{" "}
                  </RouterLink>
                </TableCell>
                <TableCell>{blog.user.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
