import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { FiTrash2, FiEdit } from "react-icons/fi";

const ReadServiceTypeTable = ({ posts, handleEditPostForm, handleDelete }) => {
	return (
		<>
			{posts.map((post) => (
				<tr key={post.id}>
					<td>{post.name}</td>
					<td>
						<Dropdown>
							<Dropdown.Toggle size="sm" />
							<Dropdown.Menu align="end">
								<Dropdown.Item onClick={(e) => handleEditPostForm(e, post)}>
									<FiEdit size="18px" className="dropdown-item-icon" /> Edit
								</Dropdown.Item>
								<Dropdown.Item onClick={handleDelete}>
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
ReadServiceTypeTable.propTypes = {
	posts: PropTypes.func,
	handleEditPost: PropTypes.func,
	handleEditFormPost: PropTypes.func,
	handleEditPostForm: PropTypes.func,
	handleShow: PropTypes.func,
	handleDelete: PropTypes.func,
};

export default ReadServiceTypeTable;
