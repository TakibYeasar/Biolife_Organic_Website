import React from "react";
import {
    useManageUsersQuery,
    useChangeUserRoleMutation,
    useRemoveUserMutation,
} from "../../../../redux/features/user/userApi";

const ManageUsers = () => {
    const { data: users, error, isLoading } = useManageUsersQuery();
    const [changeUserRole] = useChangeUserRoleMutation();
    const [removeUser] = useRemoveUserMutation();

    const handleRoleChange = (id, newRole) => {
        // Call mutation to change user role
        changeUserRole({ userId: id, role: newRole });
    };

    const handleDeleteUser = (id) => {
        // Call mutation to delete the user
        removeUser(id);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Manage Users</h1>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">
                                    {user.is_approved ? "Approved" : "Pending"}
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    {/* Role Change */}
                                    <select
                                        className="border px-2 py-1"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="farmer">Farmer</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                    {/* Delete User */}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No users available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
