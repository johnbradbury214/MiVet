import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { FiTrash2, FiEdit } from "react-icons/fi";

const ReadTable = ({ posts, handleEditPostForm, handleDelete }) => {
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
ReadTable.propTypes = {
	posts: PropTypes.func,
	handleEditPost: PropTypes.func,
	handleEditFormPost: PropTypes.func,
	handleEditPostForm: PropTypes.func,
	handleShow: PropTypes.func,
	handleDelete: PropTypes.func,
};

export default ReadTable;
