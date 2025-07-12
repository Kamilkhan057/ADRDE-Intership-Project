// KnowledgeBaseSection.jsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  FaSearch, FaFilter, FaSortAmountDown, FaPlusCircle, FaEdit,
  FaTrashAlt, FaFileExport, FaChartPie, FaEye, FaBook,
  FaTag, FaUser, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaArchive, FaLightbulb,
  FaThumbsUp, FaThumbsDown, FaStar, FaRegStar, FaEllipsisV, FaDownload, FaPrint, FaShare
} from 'react-icons/fa';

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

// Article Form Modal for adding/editing articles
const ArticleFormModal = ({ onClose, onSave, article = null }) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    category: article?.category || 'General',
    content: article?.content || '',
    status: article?.status || 'Draft',
    author: article?.author || 'Admin User',
    tags: article?.tags?.join(', ') || '',
    priority: article?.priority || 'Medium',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.content.trim()) errors.content = 'Content is required';
    if (formData.content.length < 50) errors.content = 'Content should be at least 50 characters';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setTimeout(() => {
      onSave({
        ...formData,
        id: article?.id || Date.now(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        lastUpdated: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        views: article?.views || 0,
        helpful: article?.helpful || 0,
        unhelpful: article?.unhelpful || 0,
        rating: article?.rating || 0,
        ratingCount: article?.ratingCount || 0,
      });
      setIsSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{article ? 'Edit Article' : 'Add New Article'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none ${
                validationErrors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {validationErrors.title && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
              >
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Policy">Policy</option>
                <option value="Troubleshooting">Troubleshooting</option>
                <option value="FAQ">FAQ</option>
                <option value="How-to">How-to</option>
                <option value="Announcement">Announcement</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Comma separated tags (e.g., login, security, setup)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none resize-y ${
                validationErrors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            ></textarea>
            {validationErrors.content && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.content}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.content.length} characters (minimum 50 required)
            </p>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 ${
                isSaving ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Article Detail Modal for viewing full content
const ArticleDetailModal = ({ onClose, article, onRateArticle }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  if (!article) return null;

  const handleRatingSubmit = (value) => {
    setIsSubmittingRating(true);
    setRating(value);
    setTimeout(() => {
      onRateArticle(article.id, value);
      setIsSubmittingRating(false);
    }, 500);
  };

  const averageRating = article.ratingCount > 0 
    ? (article.rating / article.ratingCount).toFixed(1) 
    : 'Not rated yet';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimesCircle size={24} />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaTag className="mr-1 text-gray-500" /> {article.category}
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaUser className="mr-1 text-gray-500" /> By {article.author}
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaCalendarAlt className="mr-1 text-gray-500" /> {article.lastUpdated}
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaEye className="mr-1 text-gray-500" /> {article.views.toLocaleString()} views
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {article.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-xl focus:outline-none"
                  onClick={() => handleRatingSubmit(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  disabled={isSubmittingRating || rating > 0}
                >
                  {star <= (hoverRating || rating) ? (
                    <FaStar className="text-yellow-400" />
                  ) : (
                    <FaRegStar className="text-yellow-400" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating > 0 ? 'Thanks for rating!' : averageRating} ({article.ratingCount} ratings)
            </span>
          </div>
          <div className="flex items-center text-green-600">
            <FaThumbsUp className="mr-1" /> {article.helpful} found this helpful
          </div>
          <div className="flex items-center text-red-600">
            <FaThumbsDown className="mr-1" /> {article.unhelpful} found this unhelpful
          </div>
        </div>

        <div className="prose max-w-none text-gray-800 leading-relaxed mb-6 border-t border-b border-gray-200 py-6">
          {article.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onRateArticle(article.id, 'helpful')}
              className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
            >
              <FaThumbsUp className="mr-1" /> Helpful
            </button>
            <button 
              onClick={() => onRateArticle(article.id, 'unhelpful')}
              className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              <FaThumbsDown className="mr-1" /> Unhelpful
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">
              <FaShare className="mr-1" /> Share
            </button>
            <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
              <FaPrint className="mr-1" /> Print
            </button>
            <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
              <FaDownload className="mr-1" /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Message Box component
const MessageBox = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const icon = type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-3 ${bgColor} ${textColor}`}>
      {icon}
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-current opacity-75 hover:opacity-100">
        <FaTimesCircle />
      </button>
    </div>
  );
};

// Knowledge Base Main Component
const KnowledgeBaseSection = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Getting Started with Our Platform',
      category: 'General',
      content: 'This article provides a comprehensive guide for new users to quickly get acquainted with our platform features and functionalities. It covers account setup, dashboard navigation, and basic operations.\n\nIt includes tips on setting up your profile, connecting with other users, and utilizing the search function efficiently. We also provide a brief overview of our security measures to ensure your data is safe and private.\n\nFor advanced features, please refer to our "Advanced Usage" articles.',
      status: 'Published',
      author: 'Admin User',
      tags: ['onboarding', 'setup', 'guide'],
      priority: 'High',
      lastUpdated: 'Jun 20, 2024, 10:30 AM',
      views: 1250,
      helpful: 1200,
      unhelpful: 50,
      rating: 45,
      ratingCount: 10,
    },
    {
      id: 2,
      title: 'Troubleshooting Login Issues',
      category: 'Troubleshooting',
      content: 'Experiencing problems logging in? This guide will walk you through common login issues and their solutions, including forgotten passwords, account lockouts, and browser compatibility problems.\n\nWe recommend clearing your browser cache and cookies as a first step. If the issue persists, try resetting your password through the "Forgot Password" link. For persistent issues, contact our support team with your username and a description of the error message.\n\nCommon issues:\n1. Incorrect password (try resetting)\n2. Browser cache issues (clear cache)\n3. Account locked (contact support)\n4. Two-factor authentication problems',
      status: 'Published',
      author: 'Support Team',
      tags: ['login', 'authentication', 'security'],
      priority: 'Critical',
      lastUpdated: 'Jun 15, 2024, 2:00 PM',
      views: 890,
      helpful: 800,
      unhelpful: 90,
      rating: 38,
      ratingCount: 8,
    },
    {
      id: 3,
      title: 'Understanding Our Data Privacy Policy',
      category: 'Policy',
      content: 'Our data privacy policy outlines how we collect, use, and protect your personal information. This article provides a simplified explanation of key clauses and your rights.\n\nWe are committed to transparency and ensuring you have control over your data. Learn about data retention periods, third-party sharing, and how to request access or deletion of your personal information.\n\nKey points:\n- We only collect necessary data\n- Your data is encrypted in transit and at rest\n- You can request data deletion at any time\n- We don\'t sell your data to third parties\n\nRegular updates to this policy will be communicated through official channels.',
      status: 'Published',
      author: 'Legal Department',
      tags: ['privacy', 'legal', 'gdpr'],
      priority: 'Medium',
      lastUpdated: 'Jun 1, 2024, 9:15 AM',
      views: 520,
      helpful: 480,
      unhelpful: 40,
      rating: 42,
      ratingCount: 9,
    },
    {
      id: 4,
      title: 'How to Integrate with Third-Party APIs',
      category: 'Technical',
      content: 'A step-by-step tutorial on integrating our platform with external APIs. Includes code examples for popular programming languages and common use cases.\n\nThis guide assumes basic knowledge of API concepts and programming. We cover authentication methods, data formatting (JSON/XML), and error handling.\n\nCode examples available for:\n- JavaScript/Node.js\n- Python\n- Java\n- PHP\n- Ruby\n\nFor specific API endpoints and detailed documentation, please refer to our developer portal.',
      status: 'Draft',
      author: 'Development Team',
      tags: ['api', 'integration', 'developer'],
      priority: 'High',
      lastUpdated: 'Jul 1, 2024, 11:00 AM',
      views: 150,
      helpful: 140,
      unhelpful: 10,
      rating: 20,
      ratingCount: 4,
    },
    {
      id: 5,
      title: 'FAQ: Billing and Subscriptions',
      category: 'FAQ',
      content: 'Answers to frequently asked questions regarding billing cycles, subscription plans, payment methods, and cancellation policies.\n\nThis section addresses common queries about upgrading or downgrading your subscription, understanding your invoice, and resolving payment failures.\n\nCommon questions:\n1. How do I change my payment method?\n2. Can I get a refund for unused time?\n3. What payment methods do you accept?\n4. How do I cancel my subscription?\n5. Why was my payment declined?\n\nFor personalized billing support, please contact our finance team directly with your account details.',
      status: 'Published',
      author: 'Finance Department',
      tags: ['billing', 'payment', 'subscription'],
      priority: 'Medium',
      lastUpdated: 'May 10, 2024, 4:45 PM',
      views: 780,
      helpful: 750,
      unhelpful: 30,
      rating: 35,
      ratingCount: 7,
    },
    {
      id: 6,
      title: 'Optimizing Performance for Large Datasets',
      category: 'Technical',
      content: 'Tips and best practices for optimizing the performance of your applications when dealing with large datasets on our platform.\n\nThis includes strategies for efficient data querying, indexing, and caching. We also discuss the benefits of asynchronous operations and how to minimize network latency for improved user experience.\n\nPerformance tips:\n1. Use pagination for large result sets\n2. Implement client-side caching\n3. Optimize your queries with proper indexing\n4. Use batch operations instead of individual requests\n5. Consider using our premium tier for enhanced performance capabilities\n\nFor specific performance benchmarks, contact our support team.',
      status: 'Published',
      author: 'Development Team',
      tags: ['performance', 'optimization', 'database'],
      priority: 'High',
      lastUpdated: 'Jul 5, 2024, 9:00 AM',
      views: 300,
      helpful: 280,
      unhelpful: 20,
      rating: 28,
      ratingCount: 6,
    },
    {
      id: 7,
      title: 'Security Best Practices for Your Account',
      category: 'General',
      content: 'Learn how to enhance the security of your account with our recommended best practices.\n\nThis article covers strong password creation, two-factor authentication (2FA) setup, and identifying phishing attempts. We also advise on regularly reviewing your account activity and reporting any suspicious behavior immediately to our security team.\n\nSecurity recommendations:\n1. Use a unique, complex password\n2. Enable two-factor authentication\n3. Be wary of phishing emails\n4. Regularly review connected devices\n5. Keep your recovery information up to date\n\nYour account security is our top priority. Contact us immediately if you notice any suspicious activity.',
      status: 'Published',
      author: 'Security Team',
      tags: ['security', 'authentication', '2fa'],
      priority: 'Critical',
      lastUpdated: 'Jul 8, 2024, 11:30 AM',
      views: 950,
      helpful: 900,
      unhelpful: 50,
      rating: 48,
      ratingCount: 10,
    },
    {
      id: 8,
      title: 'New Feature Release: Advanced Analytics Dashboard',
      category: 'Announcement',
      content: 'We\'re excited to announce the release of our new Advanced Analytics Dashboard!\n\nThis powerful new feature provides:\n- Real-time data visualization\n- Custom report generation\n- Export capabilities in multiple formats\n- Team collaboration features\n\nTo access the new dashboard:\n1. Navigate to the Analytics section\n2. Click "Upgrade to Advanced"\n3. Follow the setup wizard\n\nFor a limited time, all premium subscribers get early access to these features at no additional cost.',
      status: 'Published',
      author: 'Product Team',
      tags: ['announcement', 'new feature', 'analytics'],
      priority: 'Medium',
      lastUpdated: 'Jul 10, 2024, 3:15 PM',
      views: 420,
      helpful: 400,
      unhelpful: 20,
      rating: 30,
      ratingCount: 6,
    },
    {
      id: 9,
      title: 'How to Create Custom Reports',
      category: 'How-to',
      content: 'Step-by-step instructions for creating custom reports in our platform.\n\nThis guide walks you through:\n1. Selecting data sources\n2. Choosing visualization types\n3. Applying filters\n4. Saving and sharing reports\n5. Scheduling automated report generation\n\nAdvanced tips:\n- Use templates to save time\n- Combine multiple data sources\n- Create calculated fields\n- Set up conditional formatting\n\nFor complex reporting needs, consider our Business Intelligence add-on.',
      status: 'Draft',
      author: 'Support Team',
      tags: ['reports', 'how-to', 'data'],
      priority: 'Low',
      lastUpdated: 'Jul 3, 2024, 2:30 PM',
      views: 180,
      helpful: 170,
      unhelpful: 10,
      rating: 15,
      ratingCount: 3,
    },
    {
      id: 10,
      title: 'Mobile App Troubleshooting Guide',
      category: 'Troubleshooting',
      content: 'Having issues with our mobile app? This comprehensive guide covers all known issues and their solutions.\n\nCommon problems and fixes:\n1. App crashes on launch (update to latest version)\n2. Sync issues (check internet connection)\n3. Notification problems (check app permissions)\n4. Performance lag (clear app cache)\n5. Login failures (ensure correct credentials)\n\nIf your issue isn\'t listed here, please contact our support team with:\n- Your device model\n- OS version\n- App version\n- Detailed description of the problem',
      status: 'Pending Review',
      author: 'Mobile Team',
      tags: ['mobile', 'troubleshooting', 'app'],
      priority: 'High',
      lastUpdated: 'Jul 9, 2024, 10:45 AM',
      views: 210,
      helpful: 190,
      unhelpful: 20,
      rating: 25,
      ratingCount: 5,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdatedDesc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [showArticleFormModal, setShowArticleFormModal] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [showArticleDetailModal, setShowArticleDetailModal] = useState(false);
  const [selectedArticleForDetail, setSelectedArticleForDetail] = useState(null);
  const [messageBox, setMessageBox] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // For dashboard tabs
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    return ['All', ...uniqueCategories].sort();
  }, [articles]);

  const statuses = ['All', 'Published', 'Draft', 'Archived', 'Pending Review'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  // Filter and Sort Articles
  const filteredAndSortedArticles = useMemo(() => {
    return articles
      .filter(article => {
        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        const matchesCategory = filterCategory === 'All' || article.category === filterCategory;
        const matchesStatus = filterStatus === 'All' || article.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || article.priority === filterPriority;
        const matchesTab = 
          activeTab === 'all' || 
          (activeTab === 'published' && article.status === 'Published') ||
          (activeTab === 'drafts' && article.status === 'Draft') ||
          (activeTab === 'archived' && article.status === 'Archived') ||
          (activeTab === 'pending' && article.status === 'Pending Review');
        
        return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesTab;
      })
      .sort((a, b) => {
        if (sortBy === 'lastUpdatedDesc') {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        } else if (sortBy === 'lastUpdatedAsc') {
          return new Date(a.lastUpdated) - new Date(b.lastUpdated);
        } else if (sortBy === 'titleAsc') {
          return a.title.localeCompare(b.title);
        } else if (sortBy === 'viewsDesc') {
          return b.views - a.views;
        } else if (sortBy === 'helpfulDesc') {
          return b.helpful - a.helpful;
        } else if (sortBy === 'priorityDesc') {
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return 0;
      });
  }, [articles, searchTerm, filterCategory, filterStatus, filterPriority, sortBy, activeTab]);

  // Analytics data
  const totalArticles = articles.length;
  const publishedArticles = articles.filter(a => a.status === 'Published').length;
  const draftArticles = articles.filter(a => a.status === 'Draft').length;
  const archivedArticles = articles.filter(a => a.status === 'Archived').length;
  const pendingArticles = articles.filter(a => a.status === 'Pending Review').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalHelpful = articles.reduce((sum, a) => sum + a.helpful, 0);
  const totalUnhelpful = articles.reduce((sum, a) => sum + a.unhelpful, 0);
  const totalRatings = articles.reduce((sum, a) => sum + (a.ratingCount || 0), 0);
  const averageRating = totalRatings > 0 
    ? (articles.reduce((sum, a) => sum + (a.rating || 0), 0) / totalRatings).toFixed(1)
    : 0;

  // Category distribution
  const categoryDistribution = useMemo(() => {
    const distribution = {};
    articles.forEach(article => {
      distribution[article.category] = (distribution[article.category] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, count]) => ({ name, count }));
  }, [articles]);

  // Status distribution
  const statusDistribution = useMemo(() => {
    const distribution = {};
    articles.forEach(article => {
      distribution[article.status] = (distribution[article.status] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, count]) => ({ name, count }));
  }, [articles]);

  // Most viewed articles
  const mostViewedArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  }, [articles]);

  // Most helpful articles
  const mostHelpfulArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.helpful - a.helpful).slice(0, 5);
  }, [articles]);

  // Handle adding/saving an article
  const handleSaveArticle = (newArticleData) => {
    if (newArticleData.id && articles.some(a => a.id === newArticleData.id)) {
      // Update existing article
      setArticles(prevArticles => prevArticles.map(art =>
        art.id === newArticleData.id ? newArticleData : art
      ));
      setMessageBox({ message: 'Article updated successfully!', type: 'success' });
    } else {
      // Add new article
      setArticles(prevArticles => [newArticleData, ...prevArticles]);
      setMessageBox({ message: 'Article added successfully!', type: 'success' });
    }
    setArticleToEdit(null);
    setShowArticleFormModal(false);
  };

  // Handle deleting an article
  const handleDeleteArticle = (idToDelete) => {
    setArticleToDelete(idToDelete);
    setConfirmAction(() => () => {
      setArticles(prevArticles => prevArticles.filter(article => article.id !== idToDelete));
      setArticleToDelete(null);
      setSelectedArticleIds(prev => prev.filter(id => id !== idToDelete));
      setMessageBox({ message: 'Article deleted successfully!', type: 'success' });
    });
    setShowConfirmationModal(true);
  };

  // Handle toggling article status
  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Archived' : 'Published';
    setArticles(prevArticles => prevArticles.map(article =>
      article.id === id ? { ...article, status: newStatus } : article
    ));
    setMessageBox({ message: `Article status changed to ${newStatus}!`, type: 'success' });
  };

  // Handle feedback (helpful/unhelpful)
  const handleFeedback = (id, type) => {
    setArticles(prevArticles => prevArticles.map(article => {
      if (article.id === id) {
        return {
          ...article,
          helpful: type === 'helpful' ? article.helpful + 1 : article.helpful,
          unhelpful: type === 'unhelpful' ? article.unhelpful + 1 : article.unhelpful,
        };
      }
      return article;
    }));
    setMessageBox({ message: `Feedback recorded for article!`, type: 'success' });
  };

  // Handle rating an article
  const handleRateArticle = (id, rating) => {
    setArticles(prevArticles => prevArticles.map(article => {
      if (article.id === id) {
        return {
          ...article,
          rating: (article.rating || 0) + rating,
          ratingCount: (article.ratingCount || 0) + 1,
        };
      }
      return article;
    }));
    setMessageBox({ message: `Thank you for rating this article!`, type: 'success' });
  };

  // Handle checkbox change for individual articles
  const handleCheckboxChange = (id) => {
    setSelectedArticleIds(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  // Handle select all/deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedArticleIds(filteredAndSortedArticles.map(item => item.id));
    } else {
      setSelectedArticleIds([]);
    }
  };

  // Batch actions
  const handleBatchUpdateStatus = (newStatus) => {
    if (selectedArticleIds.length === 0) return;
    setConfirmAction(() => () => {
      setArticles(prevArticles =>
        prevArticles.map(article =>
          selectedArticleIds.includes(article.id) ? { ...article, status: newStatus } : article
        )
      );
      setSelectedArticleIds([]);
      setMessageBox({ message: `Selected articles updated to ${newStatus}!`, type: 'success' });
    });
    setShowConfirmationModal(true);
  };

  const handleBatchDelete = () => {
    if (selectedArticleIds.length === 0) return;
    setConfirmAction(() => () => {
      setArticles(prevArticles =>
        prevArticles.filter(article => !selectedArticleIds.includes(article.id))
      );
      setSelectedArticleIds([]);
      setMessageBox({ message: 'Selected articles deleted successfully!', type: 'success' });
    });
    setShowConfirmationModal(true);
  };

  // Export Data
  const handleExportData = () => {
    const dataToExport = filteredAndSortedArticles.map(item => ({
      ID: item.id,
      Title: item.title.replace(/"/g, '""'),
      Category: item.category,
      Content: item.content.replace(/"/g, '""'),
      Status: item.status,
      Priority: item.priority,
      Author: item.author,
      Tags: item.tags?.join(', ') || '',
      LastUpdated: item.lastUpdated,
      Views: item.views,
      Helpful: item.helpful,
      Unhelpful: item.unhelpful,
      Rating: item.rating || 0,
      RatingCount: item.ratingCount || 0,
    }));

    const csvHeader = Object.keys(dataToExport[0]).join(',');
    const csvRows = dataToExport.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    const csvContent = [csvHeader, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'knowledge_base_articles.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessageBox({ message: 'Knowledge Base data exported successfully as CSV!', type: 'success' });
  };

  // Print current view
  const handlePrint = () => {
    window.print();
  };

  // View article details
  const handleViewArticle = (article) => {
    // Increment view count when viewing article
    setArticles(prevArticles => prevArticles.map(a => 
      a.id === article.id ? { ...a, views: a.views + 1 } : a
    ));
    setSelectedArticleForDetail(article);
    setShowArticleDetailModal(true);
  };

  // Close message box after 5 seconds
  useEffect(() => {
    if (messageBox) {
      const timer = setTimeout(() => {
        setMessageBox(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageBox]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-blue-200 bg-blue-800 hover:bg-blue-700 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Knowledge Base Management
              </h1>
              <p className="text-lg sm:text-xl text-blue-200">
                Manage and organize your support articles and documentation.
              </p>
            </div>
            <button
              onClick={() => { setArticleToEdit(null); setShowArticleFormModal(true); }}
              className="px-6 py-3 bg-white text-blue-800 rounded-lg font-semibold shadow-md hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <FaPlusCircle /> Add New Article
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Articles ({totalArticles})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-2 font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'published' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Published ({publishedArticles})
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'drafts' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Drafts ({draftArticles})
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-4 py-2 font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'archived' ? 'text-gray-600 border-b-2 border-gray-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Archived ({archivedArticles})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'pending' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending Review ({pendingArticles})
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Articles</p>
              <p className="text-2xl font-bold">{totalArticles}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaBook size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaEye size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold">{averageRating}/5</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaStar size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Helpful Ratio</p>
              <p className="text-2xl font-bold">
                {totalHelpful + totalUnhelpful > 0 
                  ? `${Math.round((totalHelpful / (totalHelpful + totalUnhelpful)) * 100)}%` 
                  : 'N/A'}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaThumbsUp size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter, Sort Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Mobile Filters Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
          >
            <FaFilter /> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Search Input - always visible */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by title, content, author or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filters - visible on desktop or when mobile filters are toggled */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} md:flex flex-col md:flex-row gap-4 w-full md:w-auto`}>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <FaTag className="text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <FaCheckCircle className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <FaSortAmountDown className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
              >
                <option value="lastUpdatedDesc">Last Updated (Newest)</option>
                <option value="lastUpdatedAsc">Last Updated (Oldest)</option>
                <option value="titleAsc">Title (A-Z)</option>
                <option value="viewsDesc">Views (High-Low)</option>
                <option value="helpfulDesc">Helpful (High-Low)</option>
                <option value="priorityDesc">Priority (High-Low)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <FaEllipsisV className="text-gray-500" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Actions */}
      {filteredAndSortedArticles.length > 0 && (
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200 items-center justify-between">
          <label className="inline-flex items-center cursor-pointer text-gray-700 text-sm sm:text-base">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
              onChange={handleSelectAll}
              checked={selectedArticleIds.length === filteredAndSortedArticles.length && filteredAndSortedArticles.length > 0}
            />
            <span className="ml-2">Select All ({selectedArticleIds.length})</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBatchUpdateStatus('Published')}
              disabled={selectedArticleIds.length === 0}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-green-500 text-white hover:bg-green-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCheckCircle /> Publish
            </button>
            <button
              onClick={() => handleBatchUpdateStatus('Archived')}
              disabled={selectedArticleIds.length === 0}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-gray-500 text-white hover:bg-gray-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArchive /> Archive
            </button>
            <button
              onClick={handleBatchDelete}
              disabled={selectedArticleIds.length === 0}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrashAlt /> Delete
            </button>
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md text-sm"
            >
              <FaFileExport /> Export
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md text-sm"
            >
              <FaPrint /> Print
            </button>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAndSortedArticles.length > 0 ? (
          filteredAndSortedArticles.map((article) => (
            <div 
              key={article.id} 
              className={`border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-sm relative transition-all duration-300 hover:shadow-md flex flex-col justify-between
                ${article.status === 'Published' ? 'border-l-4 border-green-500' :
                  article.status === 'Draft' ? 'border-l-4 border-yellow-500' :
                  article.status === 'Pending Review' ? 'border-l-4 border-purple-500' :
                  'border-l-4 border-gray-500'
                }`}
            >
              <div className="absolute top-3 left-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                  checked={selectedArticleIds.includes(article.id)}
                  onChange={() => handleCheckboxChange(article.id)}
                />
              </div>
              
              <div className="pl-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="text-lg sm:text-xl font-bold text-gray-800 mb-1 hover:text-blue-600 cursor-pointer"
                    onClick={() => handleViewArticle(article)}
                  >
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      article.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      article.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      article.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {article.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      article.status === 'Published' ? 'bg-green-100 text-green-800' :
                      article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      article.status === 'Pending Review' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-700 mb-2 flex items-center">
                  <FaTag className="mr-2 text-gray-500" />
                  <span className="font-medium">{article.category}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-center">
                  <FaUser className="mr-2 text-gray-500" />
                  By <span className="font-semibold ml-1">{article.author}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  {article.lastUpdated}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-800 mb-3 line-clamp-3">
                  <p>{article.content}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mt-2">
                  <span className="flex items-center">
                    <FaEye className="mr-1" /> {article.views.toLocaleString()} views
                  </span>
                  <div className="flex gap-2">
                    <span className="flex items-center text-green-600">
                      <FaThumbsUp className="mr-1" /> {article.helpful}
                    </span>
                    <span className="flex items-center text-red-600">
                      <FaThumbsDown className="mr-1" /> {article.unhelpful}
                    </span>
                    <span className="flex items-center text-yellow-600">
                      <FaStar className="mr-1" /> {article.ratingCount > 0 
                        ? (article.rating / article.ratingCount).toFixed(1) 
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mt-4 flex flex-wrap justify-end gap-2">
                <button
                  onClick={() => handleViewArticle(article)}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-sm bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md text-xs sm:text-sm"
                  title="View Article"
                >
                  <FaEye /> <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={() => { setArticleToEdit(article); setShowArticleFormModal(true); }}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-sm bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-md text-xs sm:text-sm"
                  title="Edit Article"
                >
                  <FaEdit /> <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => handleToggleStatus(article.id, article.status)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-sm ${
                    article.status === 'Published' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white hover:shadow-md text-xs sm:text-sm`}
                  title={article.status === 'Published' ? 'Archive Article' : 'Publish Article'}
                >
                  {article.status === 'Published' ? <FaArchive /> : <FaCheckCircle />}
                  <span className="hidden sm:inline">
                    {article.status === 'Published' ? 'Archive' : 'Publish'}
                  </span>
                </button>
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-md text-xs sm:text-sm"
                  title="Delete Article"
                >
                  <FaTrashAlt /> <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 p-8 text-center text-gray-500 text-lg italic bg-white rounded-xl shadow-sm border border-gray-200">
            No articles found matching your criteria. Try adjusting your filters or create a new article.
          </div>
        )}
      </div>

      {/* Stats Section */}
      {filteredAndSortedArticles.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaTag /> Articles by Category
            </h3>
            <div className="space-y-3">
              {categoryDistribution.map(({ name, count }) => (
                <div key={name} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600">{name}</div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(count / Math.max(...categoryDistribution.map(c => c.count)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-right text-sm font-semibold">{count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCheckCircle /> Articles by Status
            </h3>
            <div className="space-y-3">
              {statusDistribution.map(({ name, count }) => (
                <div key={name} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600">{name}</div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          name === 'Published' ? 'bg-green-500' :
                          name === 'Draft' ? 'bg-yellow-500' :
                          name === 'Pending Review' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`} 
                        style={{ width: `${(count / Math.max(...statusDistribution.map(s => s.count)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-right text-sm font-semibold">{count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Articles */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaChartPie /> Top Performing Articles
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Most Viewed</h4>
                <div className="space-y-2">
                  {mostViewedArticles.map(article => (
                    <div key={article.id} className="flex justify-between items-center text-sm">
                      <span className="truncate pr-2">{article.title}</span>
                      <span className="font-medium">{article.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Most Helpful</h4>
                <div className="space-y-2">
                  {mostHelpfulArticles.map(article => (
                    <div key={article.id} className="flex justify-between items-center text-sm">
                      <span className="truncate pr-2">{article.title}</span>
                      <span className="font-medium text-green-600">{article.helpful}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showConfirmationModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={confirmAction}
          message={articleToDelete ? `Are you sure you want to delete "${articles.find(a => a.id === articleToDelete)?.title}"? This action cannot be undone.` : `Are you sure you want to perform this batch action on ${selectedArticleIds.length} articles? This action cannot be undone.`}
          title={articleToDelete ? "Confirm Delete Article" : "Confirm Batch Action"}
        />
      )}

      {showArticleFormModal && (
        <ArticleFormModal
          onClose={() => setShowArticleFormModal(false)}
          onSave={handleSaveArticle}
          article={articleToEdit}
        />
      )}

      {showArticleDetailModal && (
        <ArticleDetailModal
          onClose={() => setShowArticleDetailModal(false)}
          article={selectedArticleForDetail}
          onRateArticle={handleRateArticle}
        />
      )}

      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
    </div>
  );
};

export default KnowledgeBaseSection;