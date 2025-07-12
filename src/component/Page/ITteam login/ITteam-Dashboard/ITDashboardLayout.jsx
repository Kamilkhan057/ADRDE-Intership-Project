import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ITNavbar from "./ITNavbar";
import ReportsSection from './ReportsSection';
import RequestsSection from './RequestsSection';
import UserManagementSection from './UserManagementSection';
import SystemSettingsSection from './SystemSettingsSection';
import ActivityHistorySection from './ActivityHistorySection';
import TicketReviewSection from './UserReviewSection';
import ContactSupportSection from './ContactSupportSection';
import KnowledgeBaseSection from './KnowledgeBaseSection';

import {
  FaFileAlt,
  FaClipboardCheck,
  FaUsersCog,
  FaCogs,
  FaHistory,
  FaTicketAlt,
  FaEnvelopeOpenText,
  FaBook,
  FaSignOutAlt,
  FaTimes,
  FaUserCog,
  FaPlus,
  FaUserPlus,
  FaFileExport,
  FaCog,
  FaChartLine,
  FaExclamationTriangle,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaChevronRight,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaDesktop,
  FaMobileAlt,
  FaCloud,
  FaShieldVirus,
  FaSync,
  FaRegBell,
  FaRegCalendarAlt,
  FaRegChartBar
} from "react-icons/fa";

function ITTeamDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMetrics, setExpandedMetrics] = useState(false);

  // Mock data for overview metrics
  const overviewMetrics = {
    resolvedTicketsToday: 12,
    averageResolutionTime: "2h 30m",
    highPriorityTickets: 5,
    activeUsers: 124,
    newUsersToday: 3,
    systemHealth: 93,
    criticalAlerts: 2,
    knowledgeBaseArticles: 75,
    serverStatus: {
      web: "online",
      database: "online",
      network: "degraded",
      backup: "offline"
    },
    recentActivities: [
      { id: 1, type: "resolved", description: "Network connectivity restored", time: "15 minutes ago", read: false },
      { id: 2, type: "new_ticket", description: "User 'John Doe' reported printer issue", time: "1 hour ago", read: false },
      { id: 3, type: "user_added", description: "New user 'Jane Smith' registered", time: "3 hours ago", read: true },
      { id: 4, type: "alert", description: "Server load high on DB-01", time: "5 hours ago", read: true },
    ],
    resourceUsage: {
      cpu: 65,
      memory: 78,
      storage: 42,
      network: 85
    }
  };

  // Mock notifications
  useEffect(() => {
    setNotifications([
      { id: 1, type: "alert", message: "High CPU usage on server-02", time: "5 min ago", priority: "high" },
      { id: 2, type: "ticket", message: "New high priority ticket #4567", time: "12 min ago", priority: "high" },
      { id: 3, type: "user", message: "3 new user registrations pending approval", time: "25 min ago", priority: "medium" },
      { id: 4, type: "backup", message: "Nightly backup completed successfully", time: "2 hours ago", priority: "low" },
    ]);
  }, []);

  // Effect to scroll to the active section
  useEffect(() => {
    const sectionId = `${activeTab}-section`;
    const section = document.getElementById(sectionId);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [activeTab]);

  // Effect to control body overflow based on sidebar state
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  // Toggle notification read status
  const toggleNotificationRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  // Logout function
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('itAdminToken');
    sessionStorage.removeItem('itAdminSession');
    
    // Redirect to IT login page
    navigate('/login/it');
  };

  // Function to render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div id="overview-section" className="content-section active p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">IT Team Dashboard Overview</h3>
                  <p className="text-gray-600 mt-2 max-w-2xl">
                    Welcome back! Here's your daily snapshot of IT operations and support metrics.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <input
                      type="text"
                      placeholder="Search dashboard..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 relative"
                    >
                      <FaBell />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                      )}
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-xl shadow-xl z-50 border border-gray-200">
                        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                          <h4 className="font-semibold text-gray-800">Notifications</h4>
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark all as read
                          </button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map(notification => (
                              <div 
                                key={notification.id} 
                                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                onClick={() => toggleNotificationRead(notification.id)}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                                    notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-blue-100 text-blue-600'
                                  }`}>
                                    {notification.type === 'alert' && <FaExclamationTriangle />}
                                    {notification.type === 'ticket' && <FaTicketAlt />}
                                    {notification.type === 'user' && <FaUserPlus />}
                                    {notification.type === 'backup' && <FaDatabase />}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                  </div>
                                  {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              No new notifications
                            </div>
                          )}
                        </div>
                        <div className="p-2 border-t border-gray-200 text-center">
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Metrics Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col items-start shadow-sm">
                  <FaCheckCircle className="text-blue-600 text-3xl mb-3" />
                  <h4 className="font-semibold text-gray-800 text-lg">Resolved Today</h4>
                  <p className="text-4xl font-bold text-blue-800 mt-1">{overviewMetrics.resolvedTicketsToday}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="text-red-600 font-medium">{overviewMetrics.highPriorityTickets}</span> High Priority
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex flex-col items-start shadow-sm">
                  <FaClock className="text-yellow-600 text-3xl mb-3" />
                  <h4 className="font-semibold text-gray-800 text-lg">Avg. Resolution Time</h4>
                  <p className="text-4xl font-bold text-yellow-800 mt-1">{overviewMetrics.averageResolutionTime}</p>
                  <p className="text-sm text-gray-600 mt-2">Across all tickets</p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex flex-col items-start shadow-sm">
                  <FaUsersCog className="text-green-600 text-3xl mb-3" />
                  <h4 className="font-semibold text-gray-800 text-lg">Active Users</h4>
                  <p className="text-4xl font-bold text-green-800 mt-1">{overviewMetrics.activeUsers}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="text-blue-600 font-medium">{overviewMetrics.newUsersToday}</span> New Today
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 flex flex-col items-start shadow-sm">
                  <FaCogs className="text-purple-600 text-3xl mb-3" />
                  <h4 className="font-semibold text-gray-800 text-lg">System Health</h4>
                  <p className="text-4xl font-bold text-purple-800 mt-1">{overviewMetrics.systemHealth}%</p>
                  <div className="w-full bg-purple-200 rounded-full h-2.5 mt-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${overviewMetrics.systemHealth}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Expanded Metrics Toggle */}
              <button 
                onClick={() => setExpandedMetrics(!expandedMetrics)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
              >
                {expandedMetrics ? (
                  <>
                    <FaChevronDown className="mr-1" /> Hide additional metrics
                  </>
                ) : (
                  <>
                    <FaChevronRight className="mr-1" /> Show additional metrics
                  </>
                )}
              </button>

              {/* Expanded Metrics Section */}
              {expandedMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Server Status */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h4 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                      <FaServer className="mr-3 text-gray-600" /> Server Status
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(overviewMetrics.serverStatus).map(([server, status]) => (
                        <div key={server} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              status === 'online' ? 'bg-green-500' :
                              status === 'degraded' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></div>
                            <span className="capitalize font-medium">{server}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            status === 'online' ? 'bg-green-100 text-green-800' :
                            status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resource Usage */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h4 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                      <FaChartLine className="mr-3 text-gray-600" /> Resource Usage
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(overviewMetrics.resourceUsage).map(([resource, percent]) => (
                        <div key={resource} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize font-medium">{resource}</span>
                            <span className="font-semibold">{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                percent > 80 ? 'bg-red-500' :
                                percent > 60 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activities & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm lg:col-span-2">
                  <h4 className="font-semibold text-gray-800 text-xl mb-4 flex items-center">
                    <FaHistory className="mr-3 text-gray-600" /> Recent Activities
                  </h4>
                  <div className="space-y-4">
                    {overviewMetrics.recentActivities.length > 0 ? (
                      overviewMetrics.recentActivities.map(activity => (
                        <div key={activity.id} className={`flex items-start space-x-4 p-3 rounded-lg border ${
                          !activity.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'
                        }`}>
                          <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                            activity.type === "resolved" ? 'bg-green-100 text-green-600' :
                            activity.type === "new_ticket" ? 'bg-blue-100 text-blue-600' :
                            activity.type === "user_added" ? 'bg-purple-100 text-purple-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {activity.type === "resolved" && <FaCheckCircle />}
                            {activity.type === "new_ticket" && <FaPlus />}
                            {activity.type === "user_added" && <FaUserPlus />}
                            {activity.type === "alert" && <FaExclamationTriangle />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                          </div>
                          {!activity.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No recent activities to display.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold text-gray-800 text-xl mb-4 flex items-center">
                    <FaCogs className="mr-3 text-gray-600" /> Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setActiveTab("requests")}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaTicketAlt className="mb-2 text-2xl" />
                      <span className="text-sm font-medium">View Tickets</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("userManagement")}
                      className="bg-green-100 hover:bg-green-200 text-green-700 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaUserPlus className="mb-2 text-2xl" />
                      <span className="text-sm font-medium">Add User</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("reports")}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaFileExport className="mb-2 text-2xl" />
                      <span className="text-sm font-medium">Generate Report</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("systemSettings")}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaCog className="mb-2 text-2xl" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("knowledgeBase")}
                      className="bg-teal-100 hover:bg-teal-200 text-teal-700 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaBook className="mb-2 text-2xl" />
                      <span className="text-sm font-medium">Manage KB</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("contactSupport")}
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaEnvelopeOpenText className="mb-2 text-2xl" />
                      <span className="text-sm font-medium">Contact Log</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "reports":
        return <div id="reports-section"><ReportsSection /></div>;
      case "requests":
        return <div id="requests-section"><RequestsSection /></div>;
      case "userManagement":
        return <div id="userManagement-section"><UserManagementSection /></div>;
      case "systemSettings":
        return <div id="systemSettings-section"><SystemSettingsSection /></div>;
      case "activityHistory":
        return <div id="activityHistory-section"><ActivityHistorySection /></div>;
      case "ticketReview":
        return <div id="ticketReview-section"><TicketReviewSection /></div>;
      case "contactSupport":
        return <div id="contactSupport-section"><ContactSupportSection /></div>;
      case "knowledgeBase":
        return <div id="knowledgeBase-section"><KnowledgeBaseSection /></div>;
      default:
        return <div>Select an option</div>;
    }
  };

  // Navigation items for the sidebar
  const navItems = [
    { key: "overview", label: "Overview", icon: <FaFileAlt className="mr-3" /> },
    { key: "reports", label: "Reports", icon: <FaRegChartBar className="mr-3" /> },
    { key: "requests", label: "Requests", icon: <FaClipboardCheck className="mr-3" /> },
    { key: "userManagement", label: "User Management", icon: <FaUsersCog className="mr-3" /> },
    { key: "systemSettings", label: "System Settings", icon: <FaCogs className="mr-3" /> },
    { key: "activityHistory", label: "Activity History", icon: <FaHistory className="mr-3" /> },
    { key: "ticketReview", label: "Ticket Review", icon: <FaTicketAlt className="mr-3" /> },
    { key: "contactSupport", label: "Contact Support", icon: <FaEnvelopeOpenText className="mr-3" /> },
    { key: "knowledgeBase", label: "Knowledge Base", icon: <FaBook className="mr-3" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Navbar component */}
      <ITNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setActiveTab={setActiveTab}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="relative w-64 bg-gradient-to-b from-blue-700 to-blue-900 shadow-2xl z-30 md:static fixed h-full overflow-y-auto transition-all duration-300">
            <div className="p-6 pb-2 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white tracking-wide">IT Team Dashboard Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-white hover:text-gray-300 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="mt-4 px-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    activeTab === item.key
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-blue-100 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* User profile and logout */}
            <div className="mt-16 pt-6 border-t border-blue-500 mx-4 px-4 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <FaUserCog className="from-blue-700 text-xl" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 from-blue-800"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">IT Specialist</p>
                  <p className="text-xs text-blue-200">it.specialist@example.com</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 text-sm text-blue-200 bg-blue-800 hover:bg-blue-700 rounded-lg transition"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-0 md:p-1">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-3 h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ITTeamDashboard;