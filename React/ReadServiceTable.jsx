import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { FiTrash2, FiEdit } from "react-icons/fi";

const ReadTable = ({ posts, handleEditPostForm, deleteService }) => {
  return (
    <>
      {posts.map((post) => (
        <tr key={post.id}>
          <td>{post.serviceType.name}</td>
          <td>{post.name}</td>
          <td>{post.description}</td>
          <td>
            $
            {post.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </td>
          <td>{post.serviceCode}</td>
          <td>{post.isActive === true ? "Yes" : "No"}</td>
          <td>
            <Dropdown>
              <Dropdown.Toggle size="sm" />
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={(e) => handleEditPostForm(e, post)}>
                  <FiEdit size="18px" className="dropdown-item-icon" /> Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => deleteService(post.id, e)}>
                  <FiTrash2 size="18px" className="dropdown-item-icon" /> Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ))}
    </>
  );
};
ReadTable.propTypes = {
  posts: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  handleEditFormPost: PropTypes.func.isRequired,
  handleEditPostForm: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
};

export default ReadTable;
