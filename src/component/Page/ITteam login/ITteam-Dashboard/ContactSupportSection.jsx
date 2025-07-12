// ContactSupportSection.jsx
import React, { useState, useMemo } from 'react';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeadset, FaPaperPlane,
  FaBuilding, FaCalendarAlt, FaUserCircle, FaQuestionCircle,
  FaSearch, FaFilter, FaSortAmountDown, FaCheckCircle, FaTimesCircle,
  FaReply, FaTrashAlt, FaFileExport, FaChartPie, FaExclamationTriangle, FaUserTie, FaUsers, FaClipboardList, FaBullhorn
} from 'react-icons/fa';
import { MdSupportAgent, MdEmail } from 'react-icons/md';

// Confirmation Modal (reused from other components)
const ConfirmationModal = ({ onClose, onConfirm, message, title }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative rounded-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Message Modal for individual or broadcast messages
const MessageModal = ({ onClose, onSend, recipientName, isBroadcast = false }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      onSend(message);
      setIsSending(false);
      setSendSuccess(true);
      setMessage('');
      setTimeout(() => {
        setSendSuccess(false);
        onClose();
      }, 1500); // Close after showing success
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative rounded-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isBroadcast ? 'Send Broadcast Message' : `Send Message to ${recipientName}`}
        </h2>
        {sendSuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center gap-2">
            <FaCheckCircle className="text-lg" /> Message sent successfully!
          </div>
        )}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isBroadcast ? "Type your broadcast message here..." : "Type your message here..."}
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 resize-y mb-4"
          disabled={isSending}
        ></textarea>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
            disabled={isSending}
          >
            Cancel
          </button>
          <button
            onClick={handleSendMessage}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 ${isSending ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : (isBroadcast ? <><FaPaperPlane /> Send Broadcast</> : <><FaPaperPlane /> Send Message</>)}
          </button>
        </div>
      </div>
    </div>
  );
};


const ContactSupportSection = () => {
  const [userRole, setUserRole] = useState('Admin'); // Set to 'Admin' by default and remove toggle

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [activeTab, setActiveTab] = useState('requests'); // Default to requests for Admin view
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Admin-specific states for Contact Requests
  const [contactRequests, setContactRequests] = useState([
    {
      id: 1,
      from: 'Alice Smith',
      role: 'User',
      date: '2024-06-01 10:00',
      subject: 'Issue with login',
      message: 'I cannot log in to my account after the recent update. My username is alice.smith.',
      status: 'Pending', // Pending, In Progress, Resolved
      priority: 'High', // Low, Medium, High
      adminNotes: [],
    },
    {
      id: 2,
      from: 'Bob Johnson',
      role: 'Director Secretary',
      date: '2024-05-28 15:30',
      subject: 'Request for new feature',
      message: 'We need a new reporting feature for the Q3 budget analysis.',
      status: 'In Progress',
      priority: 'Medium',
      adminNotes: [{ id: 1, admin: 'Admin User', date: '2024-05-29 09:00', note: 'Forwarded to development team.' }],
    },
    {
      id: 3,
      from: 'Charlie Brown',
      role: 'User',
      date: '2024-05-20 09:00',
      subject: 'General inquiry about services',
      message: 'Can you provide more details about your premium service tier?',
      status: 'Resolved',
      priority: 'Low',
      adminNotes: [{ id: 1, admin: 'Admin User', date: '2024-05-21 11:00', note: 'Sent link to premium service page.' }],
    },
    {
      id: 4,
      from: 'Diana Prince',
      role: 'Group Director',
      date: '2024-06-05 11:45',
      subject: 'Urgent policy clarification',
      message: 'Need immediate clarification on the new data privacy policy for our department.',
      status: 'Pending',
      priority: 'High',
      adminNotes: [],
    },
    {
      id: 5,
      from: 'Eve Adams',
      role: 'User',
      date: '2024-06-03 08:10',
      subject: 'Feedback on UI design',
      message: 'The new dashboard layout is a bit confusing. Suggesting a more intuitive navigation.',
      status: 'Pending',
      priority: 'Medium',
      adminNotes: [],
    },
  ]);
  const [adminReplyMessage, setAdminReplyMessage] = useState('');
  const [activeContactRequestReply, setActiveContactRequestReply] = useState(null);
  const [contactRequestSearchTerm, setContactRequestSearchTerm] = useState('');
  const [filterRequestStatus, setFilterRequestStatus] = useState('All');
  const [filterRequestPriority, setFilterRequestPriority] = useState('All');
  const [sortRequestsBy, setSortRequestsBy] = useState('dateDesc');
  const [selectedRequestIds, setSelectedRequestIds] = useState([]); // For batch actions

  // Admin-specific states for User/Director Directory
  const [userDirectory, setUserDirectory] = useState([
    { id: 1, name: 'John Doe', role: 'User', email: 'john.doe@company.com', phone: '+1-111-222-3333' },
    { id: 2, name: 'Jane Smith', role: 'Director Secretary', email: 'jane.smith@company.com', phone: '+1-111-222-4444' },
    { id: 3, name: 'Robert Johnson', role: 'Group Director', email: 'robert.j@company.com', phone: '+1-111-222-5555' },
    { id: 4, name: 'Emily White', role: 'User', email: 'emily.w@company.com', phone: '+1-111-222-6666' },
  ]);
  const [directorySearchTerm, setDirectorySearchTerm] = useState('');
  const [filterDirectoryRole, setFilterDirectoryRole] = useState('All');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null); // { name, email, phone }
  const [isBroadcastMessage, setIsBroadcastMessage] = useState(false);


  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // For single item deletion confirmation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // In a real app, you'd add this to contactRequests state for admin to see
      const newRequest = {
        id: Date.now(),
        from: formData.name,
        role: 'User', // Assuming user submits this form
        date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        subject: formData.subject,
        message: formData.message,
        status: 'Pending',
        priority: 'Medium', // Default priority for new requests
        adminNotes: [],
      };
      setContactRequests(prev => [newRequest, ...prev]); // Add to the list for admin view

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-blue-600 text-xl" />,
      title: "Support Hotline",
      description: "+1 (555) 123-4567",
      subtitle: "Available Mon-Fri 8AM-6PM",
      action: "Call Support"
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-xl" />,
      title: "General Inquiries",
      description: "support@company.com",
      subtitle: "Response within 2 business days",
      action: "Compose Email"
    },
    {
      icon: <MdSupportAgent className="text-blue-600 text-xl" />,
      title: "Live Chat",
      description: "Connect instantly with an agent",
      subtitle: "Available during business hours",
      action: "Start Chat"
    },
    {
      icon: <FaQuestionCircle className="text-blue-600 text-xl" />,
      title: "Knowledge Base",
      description: "Find answers to common questions",
      subtitle: "Self-service articles",
      action: "Browse FAQs"
    }
  ];

  const directorContactMethods = [
    {
      icon: <FaPhone className="text-purple-600 text-xl" />,
      title: "Director's Direct Line",
      description: "+1 (555) 999-8888",
      subtitle: "For urgent executive matters",
      action: "Call Director"
    },
    {
      icon: <FaEnvelope className="text-purple-600 text-xl" />,
      title: "Executive Office Email",
      description: "director.office@company.com",
      subtitle: "For official correspondence",
      action: "Compose Email"
    },
    {
      icon: <FaCalendarAlt className="text-purple-600 text-xl" />,
      title: "Schedule Meeting",
      description: "Book time with executive team",
      subtitle: "Via executive assistant",
      action: "Request Meeting"
    }
  ];


  const locations = [
    {
      icon: <FaBuilding className="text-blue-600" />,
      title: "Corporate Headquarters",
      address: "123 Executive Blvd, Suite 1000, New York, NY 10001",
      hours: "Mon-Fri: 8AM-6PM",
      contact: "Reception: (212) 555-1000"
    },
    {
      icon: <FaBuilding className="text-blue-600" />,
      title: "Regional Office",
      address: "456 Management Tower, Chicago, IL 60601",
      hours: "Mon-Fri: 9AM-5PM",
      contact: "Reception: (312) 555-2000"
    }
  ];

  // Admin: Filter and Sort Contact Requests
  const filteredAndSortedRequests = useMemo(() => {
    return contactRequests
      .filter(request => {
        const matchesSearch =
          request.from.toLowerCase().includes(contactRequestSearchTerm.toLowerCase()) ||
          request.subject.toLowerCase().includes(contactRequestSearchTerm.toLowerCase()) ||
          request.message.toLowerCase().includes(contactRequestSearchTerm.toLowerCase());
        const matchesStatus = filterRequestStatus === 'All' || request.status === filterRequestStatus;
        const matchesPriority = filterRequestPriority === 'All' || request.priority === filterRequestPriority;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        if (sortRequestsBy === 'dateDesc') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortRequestsBy === 'dateAsc') {
          return new Date(a.date) - new Date(b.date);
        } else if (sortRequestsBy === 'priorityHigh') {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (sortRequestsBy === 'priorityLow') {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
      });
  }, [contactRequests, contactRequestSearchTerm, filterRequestStatus, filterRequestPriority, sortRequestsBy]);

  // Admin: Handle admin reply to contact request
  const handleAdminReplySubmit = (requestId) => {
    if (!adminReplyMessage.trim()) return;

    const newNote = {
      id: Date.now(),
      admin: 'Admin User',
      date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      note: adminReplyMessage
    };

    setContactRequests(prevRequests => prevRequests.map(req =>
      req.id === requestId
        ? { ...req, adminNotes: [...req.adminNotes, newNote], status: 'In Progress' } // Mark as In Progress when replied
        : req
    ));
    setAdminReplyMessage('');
    setActiveContactRequestReply(null);
  };

  // Admin: Handle updating request status
  const handleUpdateRequestStatus = (requestId, newStatus) => {
    setContactRequests(prevRequests => prevRequests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
  };

  // Admin: Handle checkbox for batch actions
  const handleRequestCheckboxChange = (id) => {
    setSelectedRequestIds(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  // Admin: Handle select all/deselect all requests
  const handleSelectAllRequests = (e) => {
    if (e.target.checked) {
      setSelectedRequestIds(filteredAndSortedRequests.map(item => item.id));
    } else {
      setSelectedRequestIds([]);
    }
  };

  // Admin: Batch actions for requests
  const handleBatchUpdateStatus = (newStatus) => {
    if (selectedRequestIds.length === 0) return;
    setConfirmAction(() => () => {
      setContactRequests(prevRequests =>
        prevRequests.map(req =>
          selectedRequestIds.includes(req.id) ? { ...req, status: newStatus } : req
        )
      );
      setSelectedRequestIds([]);
    });
    setShowConfirmModal(true);
  };

  const handleBatchDeleteRequests = () => {
    if (selectedRequestIds.length === 0) return;
    setConfirmAction(() => () => {
      setContactRequests(prevRequests =>
        prevRequests.filter(req => !selectedRequestIds.includes(req.id))
      );
      setSelectedRequestIds([]);
    });
    setShowConfirmModal(true);
  };

  // Admin: Export Contact Request Data
  const handleExportRequests = () => {
    const dataToExport = filteredAndSortedRequests.map(item => ({
      ID: item.id,
      From: item.from,
      Role: item.role,
      Date: item.date,
      Subject: item.subject.replace(/"/g, '""'),
      Message: item.message.replace(/"/g, '""'),
      Status: item.status,
      Priority: item.priority,
      AdminNotes: item.adminNotes.map(note => `${note.admin} (${note.date}): ${note.note.replace(/"/g, '""')}`).join('; '),
    }));

    const csvHeader = Object.keys(dataToExport[0]).join(',');
    const csvRows = dataToExport.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    const csvContent = [csvHeader, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'contact_requests.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Contact request data exported successfully as CSV!");
  };

  // Admin: Filter and Sort User Directory
  const filteredAndSortedDirectory = useMemo(() => {
    return userDirectory
      .filter(user => {
        const matchesSearch =
          user.name.toLowerCase().includes(directorySearchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(directorySearchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(directorySearchTerm.toLowerCase());
        const matchesRole = filterDirectoryRole === 'All' || user.role === filterDirectoryRole;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
  }, [userDirectory, directorySearchTerm, filterDirectoryRole]);

  // Handle individual message send
  const handleIndividualMessageSend = (messageContent) => {
    console.log(`Sending message to ${messageRecipient.name} (${messageRecipient.email}): "${messageContent}"`);
    // In a real application, integrate with a messaging API here.
    // For demo, we just log it.
  };

  // Handle broadcast message send
  const handleBroadcastMessageSend = (messageContent) => {
    console.log(`Sending broadcast message to all users: "${messageContent}"`);
    // In a real application, integrate with a broadcast messaging API here.
    // For demo, we just log it.
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Support & User Management
          </h1>
          <p className="text-xl text-blue-100">
            Oversee user interactions and manage support operations.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8">
        <div className="max-w-full mx-auto">
          <div className="flex overflow-x-auto border-b border-gray-200">
            <button
              onClick={() => setActiveTab('methods')}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'methods' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <FaHeadset className="mr-2" />
              Contact Methods
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <FaPaperPlane className="mr-2" />
              Submit Request
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'locations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <FaMapMarkerAlt className="mr-2" />
              Office Locations
            </button>
              <>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                    activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  <FaClipboardList className="mr-2" />
                  Contact Requests
                </button>
                <button
                  onClick={() => setActiveTab('directory')}
                  className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                    activeTab === 'directory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  <FaUsers className="mr-2" />
                  User/Director Directory
                </button>
              </>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto">
        {/* Contact Methods (User/Admin) */}
        {activeTab === 'methods' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Support & Executive Contact Channels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors duration-200">
                  <div className="flex items-start mb-3">
                    <div className="mr-4 mt-1">{method.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{method.title}</h3>
                      <p className="text-gray-700 font-medium">{method.description}</p>
                      <p className="text-gray-500 text-sm">{method.subtitle}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                    {method.action} →
                  </button>
                </div>
              ))}
              {directorContactMethods.map((method, index) => (
                <div key={`director-${index}`} className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-colors duration-200">
                  <div className="flex items-start mb-3">
                    <div className="mr-4 mt-1">{method.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{method.title}</h3>
                      <p className="text-gray-700 font-medium">{method.description}</p>
                      <p className="text-gray-500 text-sm">{method.subtitle}</p>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center">
                    {method.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form (User/Admin) */}
        {activeTab === 'form' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send a General Message
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center gap-2">
                <FaCheckCircle className="text-lg" /> Your message has been sent successfully. We'll respond within 2 business days.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 resize-y"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Office Locations (User/Admin) */}
        {activeTab === 'locations' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Office Locations</h2>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors duration-200">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">{location.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{location.title}</h3>
                      <p className="text-gray-700 mt-2 flex items-start">
                        <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                        {location.address}
                      </p>
                      <p className="text-gray-700 mt-2 flex items-start">
                        <FaCalendarAlt className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                        {location.hours}
                      </p>
                      <p className="text-gray-700 mt-2 flex items-start">
                        <FaPhone className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                        {location.contact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Requests (Admin Only) */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Contact Requests</h2>

            {/* Analytics Section for Requests */}
            <div className="bg-purple-50 p-4 rounded-xl shadow-inner mb-6 flex flex-wrap justify-around items-center gap-4 text-center">
              <div className="flex flex-col items-center">
                <FaChartPie className="text-purple-600 text-3xl mb-2" />
                <span className="text-gray-700 text-sm">Total Requests</span>
                <span className="text-xl font-bold text-gray-900">{contactRequests.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-600 text-3xl mb-2" />
                <span className="text-gray-700 text-sm">Resolved</span>
                <span className="text-xl font-bold text-gray-900">{contactRequests.filter(r => r.status === 'Resolved').length}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaExclamationTriangle className="text-orange-600 text-3xl mb-2" />
                <span className="text-gray-700 text-sm">Pending</span>
                <span className="text-xl font-bold text-gray-900">{contactRequests.filter(r => r.status === 'Pending').length}</span>
              </div>
            </div>

            {/* Search and Filter Bar for Requests */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-100 rounded-xl shadow-inner items-center">
              <div className="relative flex-1 min-w-[200px] w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search by sender, subject, or message..."
                  value={contactRequestSearchTerm}
                  onChange={(e) => setContactRequestSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <FaFilter className="text-gray-500 text-base sm:text-lg" />
                <select
                  value={filterRequestStatus}
                  onChange={(e) => setFilterRequestStatus(e.target.value)}
                  className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <FaExclamationTriangle className="text-gray-500 text-base sm:text-lg" />
                <select
                  value={filterRequestPriority}
                  onChange={(e) => setFilterRequestPriority(e.target.value)}
                  className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <FaSortAmountDown className="text-gray-500 text-base sm:text-lg" />
                <select
                  value={sortRequestsBy}
                  onChange={(e) => setSortRequestsBy(e.target.value)}
                  className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
                >
                  <option value="dateDesc">Date (Newest First)</option>
                  <option value="dateAsc">Date (Oldest First)</option>
                  <option value="priorityHigh">Priority (High to Low)</option>
                  <option value="priorityLow">Priority (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Batch Actions for Requests */}
            {filteredAndSortedRequests.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-100 rounded-xl shadow-inner items-center justify-between">
                <label className="inline-flex items-center cursor-pointer text-gray-700 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                    onChange={handleSelectAllRequests}
                    checked={selectedRequestIds.length === filteredAndSortedRequests.length && filteredAndSortedRequests.length > 0}
                  />
                  <span className="ml-2">Select All ({selectedRequestIds.length})</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleBatchUpdateStatus('Resolved')}
                    disabled={selectedRequestIds.length === 0}
                    className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-green-500 text-white hover:bg-green-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCheckCircle /> Mark Resolved
                  </button>
                  <button
                    onClick={() => handleBatchUpdateStatus('Pending')}
                    disabled={selectedRequestIds.length === 0}
                    className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaExclamationTriangle /> Mark Pending
                  </button>
                  <button
                    onClick={handleBatchDeleteRequests}
                    disabled={selectedRequestIds.length === 0}
                    className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrashAlt /> Delete Selected
                  </button>
                  <button
                    onClick={handleExportRequests}
                    className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md text-sm"
                  >
                    <FaFileExport /> Export Data
                  </button>
                </div>
              </div>
            )}

            {/* Contact Request List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredAndSortedRequests.length > 0 ? (
                filteredAndSortedRequests.map(request => (
                  <div key={request.id} className={`border border-gray-200 rounded-xl p-4 bg-white shadow-sm relative ${request.status === 'Resolved' ? 'border-l-4 border-green-500' : request.status === 'Pending' ? 'border-l-4 border-orange-500' : 'border-l-4 border-blue-500'}`}>
                    <div className="absolute top-3 left-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                        checked={selectedRequestIds.includes(request.id)}
                        onChange={() => handleRequestCheckboxChange(request.id)}
                      />
                    </div>
                    <div className="pl-8">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{request.subject}</h3>
                          <p className="text-sm text-gray-600">From: <span className="font-semibold">{request.from}</span> ({request.role})</p>
                          <p className="text-xs text-gray-500">{request.date}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800' :
                          request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.priority} Priority
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 mb-3">
                        <p>{request.message}</p>
                      </div>

                      {request.adminNotes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Admin Notes:</h4>
                          {request.adminNotes.map(note => (
                            <div key={note.id} className="bg-blue-50 p-2 rounded-lg mb-1 text-xs border border-blue-100">
                              <div className="flex justify-between items-center mb-0.5">
                                <strong className="text-blue-700">{note.admin}</strong>
                                <span className="text-gray-500">{note.date}</span>
                              </div>
                              <p className="text-gray-700">{note.note}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap justify-end gap-2 text-sm">
                        {activeContactRequestReply === request.id ? (
                          <div className="w-full">
                            <textarea
                              value={adminReplyMessage}
                              onChange={(e) => setAdminReplyMessage(e.target.value)}
                              placeholder="Add an internal note or reply..."
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm mb-2 resize-y min-h-[80px]"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => { setActiveContactRequestReply(null); setAdminReplyMessage(''); }}
                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAdminReplySubmit(request.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-1"
                              >
                                <FaReply /> Add Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setActiveContactRequestReply(request.id)}
                              className="px-3 py-1 rounded-lg font-semibold cursor-pointer flex items-center gap-1 transition-all duration-300 outline-none shadow-sm bg-blue-500 text-white hover:bg-blue-600"
                            >
                              <FaReply /> Add Note
                            </button>
                            <select
                              value={request.status}
                              onChange={(e) => handleUpdateRequestStatus(request.id, e.target.value)}
                              className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all duration-300 outline-none shadow-sm
                                ${request.status === 'Resolved' ? 'bg-green-500 text-white hover:bg-green-600' :
                                  request.status === 'Pending' ? 'bg-orange-500 text-white hover:bg-orange-600' :
                                  'bg-gray-500 text-white hover:bg-gray-600'
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                            <button
                              onClick={() => setItemToDelete(request.id) || setConfirmAction(() => () => setContactRequests(prev => prev.filter(r => r.id !== request.id))) || setShowConfirmModal(true)}
                              className="px-3 py-1 rounded-lg font-semibold cursor-pointer flex items-center gap-1 transition-all duration-300 outline-none shadow-sm bg-red-500 text-white hover:bg-red-600"
                            >
                              <FaTrashAlt /> Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
                  No contact requests found matching your criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* User/Director Directory (Admin Only) */}
        {activeTab === 'directory' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User & Director Directory</h2>

            {/* Search and Filter Bar for Directory */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-100 rounded-xl shadow-inner items-center">
              <div className="relative flex-1 min-w-[200px] w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={directorySearchTerm}
                  onChange={(e) => setDirectorySearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <FaUser className="text-gray-500 text-base sm:text-lg" />
                <select
                  value={filterDirectoryRole}
                  onChange={(e) => setFilterDirectoryRole(e.target.value)}
                  className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
                >
                  <option value="All">All Roles</option>
                  <option value="User">User</option>
                  <option value="Director Secretary">Director Secretary</option>
                  <option value="Group Director">Group Director</option>
                </select>
              </div>
            </div>

            {/* Broadcast Message Button */}
            <div className="mb-6 text-center">
              <button
                onClick={() => { setIsBroadcastMessage(true); setShowMessageModal(true); }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center mx-auto gap-2"
              >
                <FaBullhorn /> Send Broadcast Message to All
              </button>
            </div>

            {/* Directory List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSortedDirectory.length > 0 ? (
                filteredAndSortedDirectory.map(user => (
                  <div key={user.id} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                      <FaUserCircle className="text-blue-600 text-2xl" />
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600 font-semibold">{user.role}</p>
                      <p className="text-sm text-gray-700 flex items-center justify-center sm:justify-start gap-1"><FaEnvelope className="text-xs text-gray-500" /> {user.email}</p>
                      <p className="text-sm text-gray-700 flex items-center justify-center sm:justify-start gap-1"><FaPhone className="text-xs text-gray-500" /> {user.phone}</p>
                      <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                        <a
                          href={`tel:${user.phone}`}
                          className="px-3 py-1 bg-green-500 text-white rounded-md text-xs font-medium hover:bg-green-600 transition flex items-center gap-1"
                        >
                          <FaPhone /> Call
                        </a>
                        <a
                          href={`mailto:${user.email}`}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-medium hover:bg-blue-600 transition flex items-center gap-1"
                        >
                          <FaEnvelope /> Email
                        </a>
                        <button
                          onClick={() => {
                            setMessageRecipient(user);
                            setIsBroadcastMessage(false);
                            setShowMessageModal(true);
                          }}
                          className="px-3 py-1 bg-purple-500 text-white rounded-md text-xs font-medium hover:bg-purple-600 transition flex items-center gap-1"
                        >
                          <FaPaperPlane /> Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
                  No users or directors found matching your criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Support Resources (User/Admin) */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Support Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center hover:border-blue-300 transition-colors duration-200">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <FaQuestionCircle className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">FAQs</h3>
                <p className="text-gray-600 text-sm">Common questions answered</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center hover:border-blue-300 transition-colors duration-200">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <MdEmail className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email Templates</h3>
                <p className="text-gray-600 text-sm">Professional communication formats</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center hover:border-blue-300 transition-colors duration-200">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Schedule Meeting</h3>
                <p className="text-gray-600 text-sm">Book time with executive team</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center hover:border-blue-300 transition-colors duration-200">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <FaUserCircle className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Directory</h3>
                <p className="text-gray-600 text-sm">Key contacts in the organization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmAction}
          message={itemToDelete ? `Are you sure you want to delete this item? This action cannot be undone.` : `Are you sure you want to perform this batch action? This action cannot be undone.`}
          title={itemToDelete ? "Confirm Deletion" : "Confirm Batch Action"}
        />
      )}

      {showMessageModal && (
        <MessageModal
          onClose={() => setShowMessageModal(false)}
          onSend={isBroadcastMessage ? handleBroadcastMessageSend : handleIndividualMessageSend}
          recipientName={messageRecipient?.name}
          isBroadcast={isBroadcastMessage}
        />
      )}
    </div>
  );
}

export default ContactSupportSection;
