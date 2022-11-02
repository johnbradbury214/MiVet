import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";

const ReadServiceTypeTable = ({ posts, deleteServiceType }) => {
  return (
    <>
      {posts.map((post) => (
        <tr key={post.id}>
          <td>{post.name}</td>
          <td>
            <Dropdown.Item onClick={(e) => deleteServiceType(post.id, e)}>
              <FiTrash2 size="18px" className="dropdown-item-icon" /> Remove
            </Dropdown.Item>
          </td>
        </tr>
      ))}
    </>
  );
};
ReadServiceTypeTable.propTypes = {
  posts: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  handleEditFormPost: PropTypes.func.isRequired,
  handleEditPostForm: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  deleteServiceType: PropTypes.func.isRequired,
};

export default ReadServiceTypeTable;
