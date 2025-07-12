import { useState, useEffect, useRef } from "react";
import { FaBell, FaBars, FaTimes, FaSearch, FaHeadset, FaUser , FaCaretDown } from "react-icons/fa";

// Simple Modal Component for Profile/Settings
const InfoModal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 from-blue-700 to-blue-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative rounded-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="from-blue-700 mb-6 space-y-2">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function ITNavbar({ sidebarOpen, setSidebarOpen, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Admin User details
  const adminName = "IT Specialist";
  const adminEmail = "it.specialist@example.com";
  const adminRole = "IT Admin";
  const lastLogin = "2024-07-11 15:00 IST";
  const memberSince = "2022-01-01";

  const pages = [
    { key: "requests", label: "📋 Requests", sectionId: "requests-section" },
    { key: "history", label: "📜 History", sectionId: "history-section" },
    { key: "feedback", label: "💬 Feedback", sectionId: "feedback-section" },
    { key: "remarks", label: "📝 Remarks", sectionId: "remarks-section" },
    { key: "contact", label: "📞 Contact", sectionId: "contact-section" },
    { key: "faq", label: "❓ FAQ", sectionId: "faq-section" },
    { key: "reports", label: "📊 Reports", sectionId: "reports-section" },
    { key: "users", label: "👥 User Management", sectionId: "users-section" },
    { key: "settings", label: "⚙️ System Settings", sectionId: "settings-section" },
  ];

  const filtered = pages.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (key, sectionId) => {
    setActiveTab(key);
    setSearchTerm("");
    setShowResults(false);
    setHighlightIndex(-1);

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (!showResults || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && highlightIndex !== -1) {
      e.preventDefault();
      const selected = filtered[highlightIndex];
      handleSelect(selected.key, selected.sectionId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
        setHighlightIndex(-1);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Profile Menu Action Handlers
  const handleMyProfile = () => {
    setModalContent({
      title: "My Profile",
      content: (
        <>
          <p><strong>Name:</strong> {adminName}</p>
          <p><strong>Email:</strong> {adminEmail}</p>
          <p><strong>Role:</strong> {adminRole}</p>
          <p><strong>Last Login:</strong> {lastLogin}</p>
          <p><strong>Member Since:</strong> {memberSince}</p>
          <p className="mt-4 text-sm from-blue-700">
            (In a real application, this would be a dedicated profile page.)
          </p>
        </>
      ),
    });
    setShowInfoModal(true);
    setShowProfileMenu(false);
  };

  const handleAccountSettings = () => {
    setModalContent({
      title: "Account Settings",
      content: (
        <>
          <p>Here you can update your password, change your display name, or manage security preferences.</p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
            <li>Change Password</li>
            <li>Update Email Address</li>
            <li>Two-Factor Authentication</li>
            <li>Linked Accounts</li>
          </ul>
          <p className="mt-4 text-sm from-blue-700">
            (In a real application, this would be a dedicated settings page with interactive forms.)
          </p>
        </>
      ),
    });
    setShowInfoModal(true);
    setShowProfileMenu(false);
  };

  const handleNotificationSettings = () => {
    setModalContent({
      title: "Notification Settings",
      content: (
        <>
          <p>Manage how you receive notifications for new requests, feedback, and system alerts.</p>
          <ul className="list-disc list-inside mt-2 text-sm from-blue-700">
            <li>Email Notifications: <span className="font-semibold">On</span></li>
            <li>Desktop Alerts: <span className="font-semibold">On</span></li>
            <li>SMS Notifications: <span className="font-semibold">Off</span></li>
            <li>Digest Frequency: <span className="font-semibold">Daily</span></li>
          </ul>
          <p className="mt-4 text-sm from-blue-700">
            (In a real application, this would be a dedicated page with toggles and options.)
          </p>
        </>
      ),
    });
    setShowInfoModal(true);
    setShowProfileMenu(false);
  };

  const handleSignOut = () => {
    console.log("Signing out and redirecting to /login/it...");
    // In a real app, you would perform actual logout logic (e.g., clear authentication tokens)
    // Then, redirect the user to the specified dashboard path.
    window.location.href = '/login/it'; // Redirect to the /login/it page
    setShowProfileMenu(false);
  };

  return (
    <header className="w-full backdrop-blur-sm bg-white/95 shadow-sm px-4 md:px-6 transition-all duration-300 flex justify-between items-center py-3 sticky top-0 z-50 border-b border-gray-100">
      {/* Left: Toggle + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? (
            <FaTimes size={20} className="text-gray-700" />
          ) : (
            <FaBars size={20} className="text-gray-700" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center shadow">
            <span className="text-white font-bold text-lg">VB</span> {/* Replace with your logo */}
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block">
            VenueBooking
          </h1>
        </div>
      </div>

      {/* Center: Search Bar (only when sidebar is closed) */}
      {!sidebarOpen && (
        <div className="flex-grow max-w-2xl mx-4">
          <div ref={searchRef} className="relative">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 from-blue-700 text-sm" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search sections..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => searchTerm && setShowResults(true)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm w-full bg-white shadow transition-all placeholder-gray-400"
              />
            </div>

            {showResults && searchTerm && (
              <div className="absolute z-50 mt-1.5 w-full bg-white shadow-lg rounded-xl border border-gray-100 max-h-60 overflow-y-auto animate-fadeIn">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">
                  QUICK NAVIGATION
                </div>
                {filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <button
                      key={item.key}
                      onMouseDown={() => handleSelect(item.key, item.sectionId)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all ${
                        highlightIndex === idx
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="bg-blue-50 p-1.5 rounded-lg text-blue-700">
                        {item.label.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{item.label.slice(2)}</div>
                        <div className="text-xs text-gray-500 capitalize">{item.key}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 flex flex-col items-center justify-center">
                    <div className="bg-gray-100 p-3 rounded-full mb-2">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">No matches found</p>
                    <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right Side: Actions */}
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <button
            className="text-gray-500 hover:text-green-600 transition p-2.5 rounded-lg hover:bg-green-50 relative group"
            title="Customer Support"
            aria-label="Support"
          >
            <FaHeadset size={18} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </button>

          <button
            className="text-gray-500 hover:text-blue-600 transition p-2.5 rounded-lg hover:bg-blue-50 relative group"
            aria-label="Notifications"
          >
            <FaBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div
          ref={profileRef}
          className="flex items-center gap-2 cursor-pointer group pl-2 relative"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center text-white shadow">
              <FaUser size={14} />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="text-right mr-1">
              <p className="text-sm font-medium text-gray-800">{adminName}</p>
              <p className="text-xs text-gray-500">IT Admin</p>
            </div>
            <FaCaretDown className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fadeIn z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{adminName}</p>
                <p className="text-xs text-gray-500 truncate">{adminEmail}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleMyProfile}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  My Profile
                </button>
                <button
                  onClick={handleAccountSettings}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Account Settings
                </button>
                <button
                  onClick={handleNotificationSettings}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Notification Settings
                </button>
              </div>
              <div className="py-1 border-t border-gray-100">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showInfoModal && <InfoModal {...modalContent} onClose={() => setShowInfoModal(false)} />}
    </header>
  );
}

export default ITNavbar;
