// UserManagementSection.jsx
import React, { useState } from 'react';
import { FaUserPlus, FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle, FaSearch, FaFilter, FaUserShield, FaSignInAlt, FaUserClock, FaEnvelope, FaBuilding, FaPhoneAlt, FaCalendarAlt, FaHistory } from 'react-icons/fa';

// Modal for adding/editing a user
const UserModal = ({ onClose, onSave, initialUser = null, adminUser }) => {
  const [name, setName] = useState(initialUser ? initialUser.name : '');
  const [email, setEmail] = useState(initialUser ? initialUser.email : '');
  const [role, setRole] = useState(initialUser ? initialUser.role : 'User');
  const [department, setDepartment] = useState(initialUser ? initialUser.department : '');
  const [phone, setPhone] = useState(initialUser ? initialUser.phone : '');
  const [loginRequestStatus, setLoginRequestStatus] = useState(initialUser ? initialUser.loginRequestStatus : 'Pending');
  const [status, setStatus] = useState(initialUser ? initialUser.status : 'Pending'); // User's active/inactive status

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !role || !department) {
      console.error("Please fill in all required fields: Name, Email, Role, Department.");
      return;
    }

    const userData = {
      name,
      email,
      role,
      department,
      phone,
      loginRequestStatus,
      status: loginRequestStatus === 'Accepted' ? 'Active' : 'Pending', // Automatically set status based on login request
      lastLogin: initialUser ? initialUser.lastLogin : 'N/A',
      createdAt: initialUser ? initialUser.createdAt : new Date().toISOString().slice(0, 10),
      requestsApprovedCount: initialUser ? initialUser.requestsApprovedCount : 0,
      requestsRejectedCount: initialUser ? initialUser.requestsRejectedCount : 0,
      requestsCreatedCount: initialUser ? initialUser.requestsCreatedCount : 0,
      editedBy: adminUser, // Log who edited the user
    };

    onSave(initialUser ? { ...initialUser, ...userData } : { id: Date.now(), ...userData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          title="Close"
        >
          <FaTimesCircle className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{initialUser ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              id="department"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              id="phone"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {initialUser && ( // Only show login request status for existing users
            <div>
              <label htmlFor="loginRequestStatus" className="block text-sm font-medium text-gray-700 mb-1">Login Request Status</label>
              <select
                id="loginRequestStatus"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={loginRequestStatus}
                onChange={(e) => {
                  setLoginRequestStatus(e.target.value);
                  setStatus(e.target.value === 'Accepted' ? 'Active' : 'Pending');
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {initialUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ onClose, onConfirm, message, title }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const UserManagementSection = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-11-01 10:30 AM",
      department: "IT",
      phone: "+1 (555) 123-4567",
      createdAt: "2022-01-15",
      loginRequestStatus: "Accepted",
      requestsApprovedCount: 15,
      requestsRejectedCount: 3,
      requestsCreatedCount: 20,
      editedBy: null,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-11-02 09:15 AM",
      department: "Marketing",
      phone: "+1 (555) 987-6543",
      createdAt: "2022-03-20",
      loginRequestStatus: "Accepted",
      requestsApprovedCount: 0,
      requestsRejectedCount: 0,
      requestsCreatedCount: 12,
      editedBy: null,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.j@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-10-28 02:00 PM",
      department: "HR",
      phone: "+1 (555) 111-2222",
      createdAt: "2022-05-10",
      loginRequestStatus: "Pending",
      requestsApprovedCount: 0,
      requestsRejectedCount: 0,
      requestsCreatedCount: 5,
      editedBy: null,
    },
    {
      id: 4,
      name: "Robert Brown",
      email: "robert.b@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2023-11-01 04:45 PM",
      department: "Content",
      phone: "+1 (555) 333-4444",
      createdAt: "2022-07-01",
      loginRequestStatus: "Accepted",
      requestsApprovedCount: 8,
      requestsRejectedCount: 1,
      requestsCreatedCount: 18,
      editedBy: null,
    },
    {
      id: 5,
      name: "Emily White",
      email: "emily.w@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-11-02 11:00 AM",
      department: "Sales",
      phone: "+1 (555) 555-6666",
      createdAt: "2022-09-12",
      loginRequestStatus: "Accepted",
      requestsApprovedCount: 0,
      requestsRejectedCount: 0,
      requestsCreatedCount: 7,
      editedBy: null,
    },
    {
      id: 6,
      name: "David Green",
      email: "david.g@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-11-01 08:00 AM",
      department: "IT",
      phone: "+1 (555) 777-8888",
      createdAt: "2022-11-25",
      loginRequestStatus: "Accepted",
      requestsApprovedCount: 20,
      requestsRejectedCount: 5,
      requestsCreatedCount: 30,
      editedBy: null,
    },
    {
      id: 7,
      name: "Olivia Black",
      email: "olivia.b@example.com",
      role: "User",
      status: "Pending",
      lastLogin: "N/A",
      department: "Customer Support",
      phone: "+1 (555) 999-0000",
      createdAt: "2023-01-05",
      loginRequestStatus: "Pending",
      requestsApprovedCount: 0,
      requestsRejectedCount: 0,
      requestsCreatedCount: 0,
      editedBy: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLoginStatus, setFilterLoginStatus] = useState('All'); // New filter for login request status

  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // For editing user

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // Function to execute on confirm
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');

  const [adminActionUser, setAdminActionUser] = useState('Admin User'); // Default admin user for logging actions

  // Helper functions for Tailwind classes
  const getRoleClass = (role) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800";
      case "Editor": return "bg-yellow-100 text-yellow-800";
      case "User": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLoginRequestStatusClass = (status) => {
    switch (status) {
      case "Accepted": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Handle adding or updating a user
  const handleSaveUser = (newOrUpdatedUser) => {
    setUsers(prevUsers => {
      if (newOrUpdatedUser.id) { // Existing user (update)
        return prevUsers.map(user =>
          user.id === newOrUpdatedUser.id ? { ...newOrUpdatedUser, editedBy: adminActionUser } : user
        );
      } else { // New user (add)
        return [...prevUsers, { ...newOrUpdatedUser, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10) }];
      }
    });
  };

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    setConfirmTitle("Delete User");
    setConfirmMessage("Are you sure you want to delete this user? This action cannot be undone.");
    setConfirmAction(() => () => setUsers(users.filter(user => user.id !== id)));
    setShowConfirmModal(true);
  };

  // Handle accepting a login request
  const handleAcceptLoginRequest = (id) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? { ...user, status: 'Active', loginRequestStatus: 'Accepted', approvedBy: adminActionUser, rejectedBy: null }
          : user
      )
    );
  };

  // Handle rejecting a login request
  const handleRejectLoginRequest = (id) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? { ...user, status: 'Inactive', loginRequestStatus: 'Rejected', rejectedBy: adminActionUser, approvedBy: null }
          : user
      )
    );
  };

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    const matchesLoginStatus = filterLoginStatus === 'All' || user.loginRequestStatus === filterLoginStatus;

    return matchesSearch && matchesRole && matchesStatus && matchesLoginStatus;
  });

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        User Management Dashboard
      </h1>

      {/* Admin Controls: Search, Filters, Add User, Admin Role Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner items-center">
        <div className="relative flex-1 min-w-[200px] w-full md:w-auto">
          <input
            type="text"
            placeholder="Search users by name, email, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaFilter className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaFilter className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All User Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaSignInAlt className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterLoginStatus}
            onChange={(e) => setFilterLoginStatus(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Login Requests</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="relative flex items-center w-full md:w-auto">
          <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
          <input
            type="text"
            placeholder="Your Admin Role (e.g., Group Director)"
            value={adminActionUser}
            onChange={(e) => setAdminActionUser(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
            title="Enter your name or role for logging actions"
          />
        </div>

        <button
          onClick={() => {
            setSelectedUser(null); // Clear selection for new user
            setShowUserModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:py-3 rounded-lg shadow-md flex items-center justify-center transition duration-200 text-sm sm:text-base w-full md:w-auto"
        >
          <FaUserPlus className="mr-2" /> Add New User
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-md relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{user.name}</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-1 flex items-center"><FaEnvelope className="mr-2 text-gray-500" /><strong>Email:</strong> {user.email}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-1 flex items-center"><FaBuilding className="mr-2 text-gray-500" /><strong>Department:</strong> {user.department}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-1 flex items-center"><FaPhoneAlt className="mr-2 text-gray-500" /><strong>Phone:</strong> {user.phone}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-1 flex items-center"><FaUserClock className="mr-2 text-gray-500" /><strong>Last Login:</strong> {user.lastLogin}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-3 flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /><strong>Member Since:</strong> {user.createdAt}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`font-semibold px-3 py-1 rounded-full text-xs sm:text-sm ${getRoleClass(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`font-semibold px-3 py-1 rounded-full text-xs sm:text-sm ${getStatusClass(user.status)}`}>
                    Status: {user.status}
                  </span>
                  <span className={`font-semibold px-3 py-1 rounded-full text-xs sm:text-sm ${getLoginRequestStatusClass(user.loginRequestStatus)}`}>
                    Login: {user.loginRequestStatus}
                  </span>
                </div>

                {/* User Activity Metrics */}
                <div className="bg-gray-50 p-3 rounded-md text-sm mt-3 border-l-4 border-purple-400">
                  <strong className="flex items-center mb-2 text-gray-800"><FaHistory className="mr-2 text-purple-500" />Activity Summary:</strong>
                  <p className="text-gray-700">Approved Requests: <span className="font-bold text-green-700">{user.requestsApprovedCount}</span></p>
                  <p className="text-gray-700">Rejected Requests: <span className="font-bold text-red-700">{user.requestsRejectedCount}</span></p>
                  <p className="text-gray-700">Created Requests: <span className="font-bold text-blue-700">{user.requestsCreatedCount}</span></p>
                </div>

                {/* Admin Action Logs */}
                {user.approvedBy && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 flex items-center">
                    <FaCheckCircle className="mr-1 text-green-500" /> Approved by: {user.approvedBy}
                  </p>
                )}
                {user.rejectedBy && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center">
                    <FaTimesCircle className="mr-1 text-red-500" /> Rejected by: {user.rejectedBy}
                  </p>
                )}
                {user.editedBy && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center">
                    <FaEdit className="mr-1 text-blue-500" /> Last Edited by: {user.editedBy}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-2 sm:gap-3 mt-4">
                {user.loginRequestStatus === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleAcceptLoginRequest(user.id)}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg text-xs sm:text-sm flex-grow md:flex-grow-0"
                      title="Accept Login Request"
                    >
                      <FaCheckCircle /> Accept Login
                    </button>
                    <button
                      onClick={() => handleRejectLoginRequest(user.id)}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg text-xs sm:text-sm flex-grow md:flex-grow-0"
                      title="Reject Login Request"
                    >
                      <FaTimesCircle /> Reject Login
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                  className="p-2 rounded-full text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition text-sm sm:text-base"
                  title="Edit User"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition text-sm sm:text-base"
                  title="Delete User"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-4 p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
            No users found matching your criteria.
          </div>
        )}
      </div>

      {/* User Modal (Add/Edit) */}
      {showUserModal && (
        <UserModal
          onClose={() => setShowUserModal(false)}
          onSave={handleSaveUser}
          initialUser={selectedUser}
          adminUser={adminActionUser}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmAction}
          message={confirmMessage}
          title={confirmTitle}
        />
      )}
    </div>
  );
};

export default UserManagementSection;
