// SystemSettingsSection.jsx
import React, { useState } from 'react';
import { FaCog, FaGlobe, FaBell, FaShieldAlt, FaUserCog, FaUsers, FaChartBar, FaSave, FaTimesCircle, FaCheckCircle, FaLock, FaExclamationTriangle, FaClock, FaDollarSign, FaUserTie, FaEnvelopeOpenText, FaDatabase, FaKey, FaPalette, FaFont, FaTextHeight } from 'react-icons/fa'; // Added FaPalette, FaFont, FaTextHeight

// Confirmation Modal (reused from other components)
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const SystemSettingsSection = () => {
  const [systemSettings, setSystemSettings] = useState({
    // General System Settings
    defaultLanguage: 'English',
    defaultTimezone: 'UTC+5:30 (India Standard Time)',
    systemNotificationsEnabled: true,
    defaultRequestPriority: 'Medium',
    autoApproveLowPriorityRequests: false,

    // User Account Management
    allowNewUserRegistrations: true,
    defaultUserRole: 'User',
    forceAllUserPasswordReset: false,

    // Email Templates & Notifications
    defaultEmailSender: 'noreply@yourcompany.com',
    emailNotificationNewRequest: true,
    emailNotificationApproval: true,
    emailNotificationRejection: true,

    // Director/Admin Specific Privileges & Settings
    directorApprovalThreshold: 50000,
    directorNotificationCriticalEvents: true,
    directorCanOverridePolicies: false,
    groupDirectorCanManageAdmins: false,

    // Security & Audit Settings
    passwordMinLength: 8,
    sessionTimeoutMinutes: 60,
    enableAuditLogging: true,
    twoFactorAuthRequired: false,

    // Data Retention Policies
    activityLogRetentionDays: 365,
    archivedRequestRetentionYears: 5,

    // Integration Settings (Placeholder)
    enableThirdPartyIntegration: false,
    integrationAPIKey: '********************',

    // Appearance Settings (New Section)
    defaultTheme: 'Light', // 'Light', 'Dark', 'System'
    defaultFontStyle: 'Inter', // 'Inter', 'Roboto', 'Open Sans', 'Lato'
    defaultFontSize: 'Medium', // 'Small', 'Medium', 'Large'
  });

  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Basic validation for numerical inputs
    if (isNaN(systemSettings.directorApprovalThreshold) || systemSettings.directorApprovalThreshold < 0) {
      setMessage("❌ Director Approval Threshold must be a non-negative number.");
      return;
    }
    if (isNaN(systemSettings.passwordMinLength) || systemSettings.passwordMinLength < 6) {
      setMessage("❌ Password Minimum Length must be a number of at least 6.");
      return;
    }
    if (isNaN(systemSettings.sessionTimeoutMinutes) || systemSettings.sessionTimeoutMinutes < 1) {
      setMessage("❌ Session Timeout must be a positive number of minutes.");
      return;
    }
    if (isNaN(systemSettings.activityLogRetentionDays) || systemSettings.activityLogRetentionDays < 0) {
      setMessage("❌ Activity Log Retention Days must be a non-negative number.");
      return;
    }
    if (isNaN(systemSettings.archivedRequestRetentionYears) || systemSettings.archivedRequestRetentionYears < 0) {
      setMessage("❌ Archived Request Retention Years must be a non-negative number.");
      return;
    }

    setConfirmAction(() => () => {
      // In a real application, you would send these settings to a backend API
      console.log("Saving System Settings:", systemSettings);
      setMessage("✅ System settings updated successfully!");

      // Reset forceAllUserPasswordReset after action
      if (systemSettings.forceAllUserPasswordReset) {
        setSystemSettings(prevSettings => ({
          ...prevSettings,
          forceAllUserPasswordReset: false,
        }));
      }
    });
    setShowConfirmModal(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        System Settings
      </h1>

      {message && (
        <div className={`p-3 mb-4 rounded-lg text-center font-semibold flex items-center justify-center gap-2 ${message.startsWith("❌") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {message.startsWith("❌") ? <FaTimesCircle /> : <FaCheckCircle />}
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General System Settings */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaCog className="text-blue-500" /> General System Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
              <select
                id="defaultLanguage"
                name="defaultLanguage"
                value={systemSettings.defaultLanguage}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div>
              <label htmlFor="defaultTimezone" className="block text-sm font-medium text-gray-700 mb-1">Default Timezone</label>
              <select
                id="defaultTimezone"
                name="defaultTimezone"
                value={systemSettings.defaultTimezone}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="UTC-12:00">UTC-12:00 (Baker Island)</option>
                <option value="UTC-11:00">UTC-11:00 (Samoa Standard Time)</option>
                <option value="UTC-10:00">UTC-10:00 (Hawaii Standard Time)</option>
                <option value="UTC-09:00">UTC-09:00 (Alaska Standard Time)</option>
                <option value="UTC-08:00">UTC-08:00 (Pacific Standard Time)</option>
                <option value="UTC-07:00">UTC-07:00 (Mountain Standard Time)</option>
                <option value="UTC-06:00">UTC-06:00 (Central Standard Time)</option>
                <option value="UTC-05:00">UTC-05:00 (Eastern Standard Time)</option>
                <option value="UTC-04:00">UTC-04:00 (Atlantic Standard Time)</option>
                <option value="UTC-03:00">UTC-03:00 (Argentina Standard Time)</option>
                <option value="UTC-02:00">UTC-02:00 (South Georgia)</option>
                <option value="UTC-01:00">UTC-01:00 (Azores Standard Time)</option>
                <option value="UTC+00:00">UTC+00:00 (Greenwich Mean Time)</option>
                <option value="UTC+01:00">UTC+01:00 (Central European Time)</option>
                <option value="UTC+02:00">UTC+02:00 (Eastern European Time)</option>
                <option value="UTC+03:00">UTC+03:00 (Moscow Standard Time)</option>
                <option value="UTC+03:30">UTC+03:30 (Iran Standard Time)</option>
                <option value="UTC+04:00">UTC+04:00 (Gulf Standard Time)</option>
                <option value="UTC+04:30">UTC+04:30 (Afghanistan Standard Time)</option>
                <option value="UTC+05:00">UTC+05:00 (Pakistan Standard Time)</option>
                <option value="UTC+5:30 (India Standard Time)">UTC+5:30 (India Standard Time)</option>
                <option value="UTC+05:45">UTC+05:45 (Nepal Standard Time)</option>
                <option value="UTC+06:00">UTC+06:00 (Bangladesh Standard Time)</option>
                <option value="UTC+06:30">UTC+06:30 (Myanmar Standard Time)</option>
                <option value="UTC+07:00">UTC+07:00 (Indochina Time)</option>
                <option value="UTC+08:00">UTC+08:00 (China Standard Time)</option>
                <option value="UTC+08:45">UTC+08:45 (Australian Central Western Standard Time)</option>
                <option value="UTC+09:00">UTC+09:00 (Japan Standard Time)</option>
                <option value="UTC+09:30">UTC+09:30 (Australian Central Standard Time)</option>
                <option value="UTC+10:00">UTC+10:00 (Australian Eastern Standard Time)</option>
                <option value="UTC+10:30">UTC+10:30 (Lord Howe Standard Time)</option>
                <option value="UTC+11:00">UTC+11:00 (Solomon Islands Time)</option>
                <option value="UTC+12:00">UTC+12:00 (New Zealand Standard Time)</option>
                <option value="UTC+12:45">UTC+12:45 (Chatham Standard Time)</option>
                <option value="UTC+13:00">UTC+13:00 (Phoenix Islands Time)</option>
                <option value="UTC+14:00">UTC+14:00 (Line Islands Time)</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="systemNotificationsEnabled"
                  checked={systemSettings.systemNotificationsEnabled}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Enable system-wide notifications</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="defaultRequestPriority" className="block text-sm font-medium text-gray-700 mb-1">Default Request Priority</label>
              <select
                id="defaultRequestPriority"
                name="defaultRequestPriority"
                value={systemSettings.defaultRequestPriority}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="autoApproveLowPriorityRequests"
                  checked={systemSettings.autoApproveLowPriorityRequests}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Automatically approve low priority requests</span>
              </label>
            </div>
          </div>
        </div>

        {/* User Account Management */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaUsers className="text-green-500" /> User Account Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="allowNewUserRegistrations"
                  checked={systemSettings.allowNewUserRegistrations}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Allow new user registrations</span>
              </label>
            </div>
            <div>
              <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700 mb-1">Default New User Role</label>
              <select
                id="defaultUserRole"
                name="defaultUserRole"
                value={systemSettings.defaultUserRole}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="User">User</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="forceAllUserPasswordReset"
                  checked={systemSettings.forceAllUserPasswordReset}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-red-600 rounded-md"
                />
                <span className="ml-2 text-gray-700 font-semibold">Force all users to reset their password on next login</span>
              </label>
            </div>
          </div>
        </div>

        {/* Email Templates & Notifications */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaEnvelopeOpenText className="text-orange-500" /> Email Templates & Notifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="defaultEmailSender" className="block text-sm font-medium text-gray-700 mb-1">Default Email Sender Address</label>
              <input
                type="email"
                id="defaultEmailSender"
                name="defaultEmailSender"
                value={systemSettings.defaultEmailSender}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., noreply@yourcompany.com"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="emailNotificationNewRequest"
                  checked={systemSettings.emailNotificationNewRequest}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Send email for new request submissions</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="emailNotificationApproval"
                  checked={systemSettings.emailNotificationApproval}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Send email for request approvals</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="emailNotificationRejection"
                  checked={systemSettings.emailNotificationRejection}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Send email for request rejections</span>
              </label>
            </div>
          </div>
        </div>

        {/* Director/Admin Privileges & Settings */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaUserTie className="text-purple-500" /> Director & Admin Privileges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="directorApprovalThreshold" className="block text-sm font-medium text-gray-700 mb-1">Director Approval Threshold ($)</label>
              <input
                type="number"
                id="directorApprovalThreshold"
                name="directorApprovalThreshold"
                value={systemSettings.directorApprovalThreshold}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="directorNotificationCriticalEvents"
                  checked={systemSettings.directorNotificationCriticalEvents}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Directors receive notifications for critical events</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="directorCanOverridePolicies"
                  checked={systemSettings.directorCanOverridePolicies}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Directors can override certain system policies</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="groupDirectorCanManageAdmins"
                  checked={systemSettings.groupDirectorCanManageAdmins}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Group Directors can manage other Admin accounts</span>
              </label>
            </div>
          </div>
        </div>

        {/* Security & Audit Settings */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaShieldAlt className="text-red-500" /> Security & Audit Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700 mb-1">Password Minimum Length</label>
              <input
                type="number"
                id="passwordMinLength"
                name="passwordMinLength"
                value={systemSettings.passwordMinLength}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="6"
              />
            </div>
            <div>
              <label htmlFor="sessionTimeoutMinutes" className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <input
                type="number"
                id="sessionTimeoutMinutes"
                name="sessionTimeoutMinutes"
                value={systemSettings.sessionTimeoutMinutes}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="enableAuditLogging"
                  checked={systemSettings.enableAuditLogging}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Enable comprehensive audit logging</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="twoFactorAuthRequired"
                  checked={systemSettings.twoFactorAuthRequired}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Require Two-Factor Authentication for all users</span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Retention Policies */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaDatabase className="text-teal-500" /> Data Retention Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="activityLogRetentionDays" className="block text-sm font-medium text-gray-700 mb-1">Activity Log Retention (Days)</label>
              <input
                type="number"
                id="activityLogRetentionDays"
                name="activityLogRetentionDays"
                value={systemSettings.activityLogRetentionDays}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="archivedRequestRetentionYears" className="block text-sm font-medium text-gray-700 mb-1">Archived Request Retention (Years)</label>
              <input
                type="number"
                id="archivedRequestRetentionYears"
                name="archivedRequestRetentionYears"
                value={systemSettings.archivedRequestRetentionYears}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaKey className="text-yellow-500" /> Integration Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  name="enableThirdPartyIntegration"
                  checked={systemSettings.enableThirdPartyIntegration}
                  onChange={handleSettingChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className="ml-2 text-gray-700">Enable Third-Party Integrations</span>
              </label>
            </div>
            {systemSettings.enableThirdPartyIntegration && (
              <div>
                <label htmlFor="integrationAPIKey" className="block text-sm font-medium text-gray-700 mb-1">Integration API Key</label>
                <input
                  type="text"
                  id="integrationAPIKey"
                  name="integrationAPIKey"
                  value={systemSettings.integrationAPIKey}
                  onChange={handleSettingChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter API Key"
                />
              </div>
            )}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <FaPalette className="text-pink-500" /> Appearance Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="defaultTheme" className="block text-sm font-medium text-gray-700 mb-1">Default Theme</label>
              <select
                id="defaultTheme"
                name="defaultTheme"
                value={systemSettings.defaultTheme}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="System">System</option>
              </select>
            </div>
            <div>
              <label htmlFor="defaultFontStyle" className="block text-sm font-medium text-gray-700 mb-1">Default Font Style</label>
              <select
                id="defaultFontStyle"
                name="defaultFontStyle"
                value={systemSettings.defaultFontStyle}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
            <div>
              <label htmlFor="defaultFontSize" className="block text-sm font-medium text-gray-700 mb-1">Default Font Size</label>
              <select
                id="defaultFontSize"
                name="defaultFontSize"
                value={systemSettings.defaultFontSize}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
            </div>
          </div>
        </div>


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center transition duration-200 text-lg font-semibold"
        >
          <FaSave className="mr-3" /> Save All Settings
        </button>
      </form>

      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmAction}
          message="Are you sure you want to save these system-wide settings? These changes will affect all users."
          title="Confirm System Settings Update"
        />
      )}
    </div>
  );
};

export default SystemSettingsSection;
