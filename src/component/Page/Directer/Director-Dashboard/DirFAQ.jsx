import React, { useState, useEffect } from "react";

const DirFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqData, setFilteredFaqData] = useState([]);

  // Data for Director-specific FAQs
  const directorFaqData = [
    {
      question: "How do I access the latest financial reports and dashboards?",
      answer: "Financial reports and interactive dashboards are available on the secure 'Finance Portal'. You can log in using your corporate credentials. New reports are updated weekly."
    },
    {
      question: "What is the process for approving a new budget proposal?",
      answer: "Budget proposals are submitted via the 'Budget Management System'. You will receive a notification for review and can approve or request revisions directly within the system. The approval workflow is outlined in the 'Financial Governance Policy' document."
    },
    {
      question: "How can I schedule or reschedule a board meeting?",
      answer: "Board meetings can be scheduled through the 'Board Meeting Scheduler' tool, accessible from the Quick Links section. For rescheduling, please notify the Board Secretary at least 48 hours in advance."
    },
    {
      question: "Where can I find the company's strategic plan and performance metrics?",
      answer: "The current strategic plan and key performance indicators (KPIs) are detailed in the 'Strategic Overview' section of the 'Director's Hub'. Performance metrics are updated quarterly."
    },
    {
      question: "What are the protocols for handling confidential company data?",
      answer: "All confidential data must be accessed and handled in accordance with the 'Data Security Policy'. This includes using secure networks, encrypting sensitive documents, and adhering to strict access controls. Training modules are available on the 'Compliance Portal'."
    },
    {
      question: "How do I delegate tasks or projects to my team members?",
      answer: "Tasks and projects can be assigned and tracked using the 'Project Management Suite'. You can create new tasks, set deadlines, and monitor progress for your direct reports and their teams."
    },
    {
      question: "What is the policy on director's expenses and reimbursement?",
      answer: "The 'Director Expense Policy' outlines all guidelines for business-related expenses and the reimbursement process. Submissions are made via the 'Expense Management System' and require relevant receipts."
    },
    {
      question: "How can I provide feedback on company-wide initiatives?",
      answer: "Your feedback is highly valued. You can submit feedback through the 'Initiative Feedback Form' or directly to the relevant project lead. Anonymous feedback channels are also available."
    }
  ];

  // Filter FAQ data based on search term
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = directorFaqData.filter(faq =>
      faq.question.toLowerCase().includes(lowerCaseSearchTerm) ||
      faq.answer.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredFaqData(filtered);
  }, [searchTerm, directorFaqData]);

  // Toggle FAQ answer visibility
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4">
            Director's FAQ & Resources
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your comprehensive guide to common questions and essential tools for effective leadership.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-md flex items-center">
          <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            className="flex-1 p-2 border-none focus:ring-0 text-lg text-gray-800 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {filteredFaqData.length > 0 ? (
                filteredFaqData.map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <button
                      className="flex justify-between items-center w-full p-5 text-left focus:outline-none bg-gray-50 hover:bg-gray-100"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={activeIndex === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                      <svg 
                        className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${
                          activeIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 9l-7 7-7-7" 
                        />
                      </svg>
                    </button>
                    
                    <div 
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeIndex === index 
                          ? 'max-h-96 opacity-100 py-4' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 text-gray-700 bg-white">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No matching questions found. Try a different search term.</p>
              )}
            </div>
          </div>

          {/* Side Panel: Quick Links & Contact Support */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Links */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-3">
                Quick Links
              </h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    Finance Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    Budget Management System
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    Board Meeting Scheduler
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    Director's Hub
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    Compliance Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    Project Management Suite
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-3">
                Contact Support
              </h2>
              <p className="text-gray-700 mb-4">
                Can't find what you're looking for? Reach out to our dedicated support teams.
              </p>
              <ul className="space-y-3">
                <li>
                  <strong className="text-gray-800">General IT Support:</strong> <a href="mailto:it-support@example.com" className="text-indigo-600 hover:underline">it-support@example.com</a>
                </li>
                <li>
                  <strong className="text-gray-800">Finance & Budget:</strong> <a href="mailto:finance@example.com" className="text-indigo-600 hover:underline">finance@example.com</a>
                </li>
                <li>
                  <strong className="text-gray-800">Board & Governance:</strong> <a href="mailto:board-secretary@example.com" className="text-indigo-600 hover:underline">board-secretary@example.com</a>
                </li>
                <li>
                  <strong className="text-gray-800">HR & Personnel:</strong> <a href="mailto:hr@example.com" className="text-indigo-600 hover:underline">hr@example.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirFAQ;
