import { useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaUserSlash } from 'react-icons/fa';

const ManageUsers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Customer',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'Producer',
            status: 'Suspended',
        },
        // Add more users here...
    ]);

    // Search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter by role or status
    const filteredUsers = users.filter(
        (user) =>
            (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedRole === '' || user.role === selectedRole) &&
            (selectedStatus === '' || user.status === selectedStatus)
    );

    // Handle delete user
    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    // Handle suspend user
    const handleSuspendUser = (userId) => {
        setUsers(
            users.map((user) =>
                user.id === userId ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' } : user
            )
        );
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>

            {/* Search and Filter */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="form-control w-full max-w-xs">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            className="input input-bordered"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <span className="btn btn-square">
                            <FaSearch />
                        </span>
                    </div>
                </div>

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="">Filter by Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Producer">Producer</option>
                    <option value="Admin">Admin</option>
                </select>

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                </select>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span
                                        className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-error'}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => console.log(`Edit user ${user.id}`)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => handleSuspendUser(user.id)}
                                    >
                                        <FaUserSlash /> {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <div className="btn-group">
                    <button className="btn">«</button>
                    <button className="btn">1</button>
                    <button className="btn btn-active">2</button>
                    <button className="btn">3</button>
                    <button className="btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
