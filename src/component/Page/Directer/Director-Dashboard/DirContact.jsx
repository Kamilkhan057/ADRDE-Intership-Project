import { useState } from 'react';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeadset, FaPaperPlane, 
  FaLinkedin, FaTwitter, FaWhatsapp, FaBuilding, FaCalendarAlt,
  FaUserCircle, FaQuestionCircle
} from 'react-icons/fa';
import { MdSupportAgent, MdEmail } from 'react-icons/md';

function DirectorContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [activeTab, setActiveTab] = useState('methods');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-blue-600 text-xl" />,
      title: "Direct Line",
      description: "+1 (555) 123-4567",
      subtitle: "Available Mon-Fri 8AM-6PM",
      action: "Call Director"
    },
    {
      icon: <FaWhatsapp className="text-blue-600 text-xl" />,
      title: "WhatsApp",
      description: "+1 (555) 987-6543",
      subtitle: "Fast response via messaging",
      action: "Message Now"
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-xl" />,
      title: "Executive Email",
      description: "director@company.com",
      subtitle: "Response within 2 business days",
      action: "Compose Email"
    },
    {
      icon: <MdSupportAgent className="text-blue-600 text-xl" />,
      title: "Executive Assistant",
      description: "ea@company.com",
      subtitle: "For scheduling and urgent matters",
      action: "Contact EA"
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Director Contact Portal</h1>
          <p className="text-xl text-blue-100">Direct access to executive communications</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('methods')}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'methods' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              <FaHeadset className="mr-2" />
              Contact Methods
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              <FaPaperPlane className="mr-2" />
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'locations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              <FaMapMarkerAlt className="mr-2" />
              Office Locations
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Methods */} 
        {activeTab === 'methods' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Executive Contact Channels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
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
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {activeTab === 'form' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Direct Message to Director</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  Your message has been sent successfully. We'll respond within 2 business days.
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Office Locations */}
        {activeTab === 'locations' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Executive Offices</h2>
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">{location.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{location.title}</h3>
                        <p className="text-gray-700 mt-2 flex items-start">
                          <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" />
                          {location.address}
                        </p>
                        <p className="text-gray-700 mt-2 flex items-start">
                          <FaClock className="mr-2 mt-1 flex-shrink-0" />
                          {location.hours}
                        </p>
                        <p className="text-gray-700 mt-2 flex items-start">
                          <FaPhone className="mr-2 mt-1 flex-shrink-0" />
                          {location.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Support Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Support Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="bg-blue-50 p-3 rounded-full mr-4">
                  <FaQuestionCircle className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">FAQs</h3>
                  <p className="text-gray-600 text-sm">Common questions answered</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="bg-blue-50 p-3 rounded-full mr-4">
                  <MdEmail className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email Templates</h3>
                  <p className="text-gray-600 text-sm">Professional communication formats</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="bg-blue-50 p-3 rounded-full mr-4">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Schedule Meeting</h3>
                  <p className="text-gray-600 text-sm">Book time with executive team</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
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
      </div>
    </div>
  );
}

export default DirectorContact;
