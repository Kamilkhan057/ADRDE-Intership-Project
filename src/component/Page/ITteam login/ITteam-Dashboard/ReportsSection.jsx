// ReportsSection.jsx
import React, { useState, useMemo } from "react";
import { FaSearch, FaSort, FaPlus, FaCalendarAlt, FaCheckCircle, FaEdit, FaTrashAlt, FaStickyNote, FaTimes } from "react-icons/fa";

// Modal for adding/editing a new meeting report
const AddMeetingReportModal = ({ onClose, onSave, initialReport = null }) => {
  const [title, setTitle] = useState(initialReport ? initialReport.title : "");
  const [date, setDate] = useState(initialReport ? initialReport.date : "");
  const [attendees, setAttendees] = useState(initialReport ? initialReport.attendees.join(", ") : "");
  const [summary, setSummary] = useState(initialReport ? initialReport.summary : "");
  const [actionItems, setActionItems] = useState(initialReport ? initialReport.actionItems.join(", ") : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !summary) {
      // Using console.error instead of alert
      console.error("Please fill in all required fields (Title, Date, Summary).");
      return;
    }
    const reportData = {
      title,
      date,
      attendees: attendees.split(",").map(item => item.trim()).filter(item => item !== ""),
      summary,
      actionItems: actionItems.split(",").map(item => item.trim()).filter(item => item !== ""),
    };
    onSave(initialReport ? { ...initialReport, ...reportData } : { id: Date.now(), ...reportData });
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
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{initialReport ? "Edit Meeting Report" : "Add New Meeting Report"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="meetingTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="meetingTitle"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="meetingDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="meetingDate"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="meetingAttendees" className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma-separated)</label>
            <input
              type="text"
              id="meetingAttendees"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="meetingSummary" className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <textarea
              id="meetingSummary"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="meetingActionItems" className="block text-sm font-medium text-gray-700 mb-1">Action Items (comma-separated)</label>
            <textarea
              id="meetingActionItems"
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
            ></textarea>
          </div>
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
              {initialReport ? "Update Report" : "Save Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for adding/editing notes to a report (for "All Reports" section)
const AddNoteModal = ({ report, onClose, onSave }) => {
  const [noteContent, setNoteContent] = useState(report.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(report.id, noteContent);
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
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add/Edit Note for "{report.title}"</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <textarea
              id="noteContent"
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
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
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for adding/editing upcoming report tasks
const AddUpcomingTaskModal = ({ onClose, onSave, initialTask = null }) => {
  const [name, setName] = useState(initialTask ? initialTask.name : "");
  const [dueDate, setDueDate] = useState(initialTask ? initialTask.dueDate : "");
  const [assignedTo, setAssignedTo] = useState(initialTask ? initialTask.assignedTo : "");
  const [status, setStatus] = useState(initialTask ? initialTask.status : "Pending");
  const [notes, setNotes] = useState(initialTask ? initialTask.notes || "" : ""); // Added notes field

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dueDate || !assignedTo) {
      console.error("Please fill in all required fields (Name, Due Date, Assigned To).");
      return;
    }
    const taskData = {
      name,
      dueDate,
      assignedTo,
      status,
      notes, // Include notes in task data
    };
    onSave(initialTask ? { ...initialTask, ...taskData } : { id: Date.now(), ...taskData });
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
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{initialTask ? "Edit Report Task" : "Add New Report Task"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <input
              type="text"
              id="taskName"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              id="taskDueDate"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="taskAssignedTo" className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <input
              type="text"
              id="taskAssignedTo"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="taskStatus"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskNotes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              id="taskNotes"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
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
              {initialTask ? "Update Task" : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for adding/editing main reports (for "All Reports" section)
const EditReportModal = ({ onClose, onSave, initialReport = null }) => {
  const [title, setTitle] = useState(initialReport ? initialReport.title : "");
  const [date, setDate] = useState(initialReport ? initialReport.date : "");
  const [status, setStatus] = useState(initialReport ? initialReport.status : "Pending");
  const [category, setCategory] = useState(initialReport ? initialReport.category : "");
  const [description, setDescription] = useState(initialReport ? initialReport.description : "");
  const [author, setAuthor] = useState(initialReport ? initialReport.author : "");
  const [version, setVersion] = useState(initialReport ? initialReport.version : "");
  const [tags, setTags] = useState(initialReport ? initialReport.tags.join(", ") : "");
  const [notes, setNotes] = useState(initialReport ? initialReport.notes || "" : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !status || !category || !description || !author) {
      console.error("Please fill in all required fields.");
      return;
    }
    const reportData = {
      title,
      date,
      status,
      category,
      description,
      author,
      version,
      tags: tags.split(",").map(item => item.trim()).filter(item => item !== ""),
      notes,
    };
    onSave(initialReport ? { ...initialReport, ...reportData } : { id: Date.now(), ...reportData });
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
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{initialReport ? "Edit Report" : "Add New Report"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="reportTitle"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="reportDate"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reportStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="reportStatus"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="reportCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              id="reportCategory"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reportDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="reportDescription"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="reportAuthor" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              id="reportAuthor"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reportVersion" className="block text-sm font-medium text-gray-700 mb-1">Version</label>
            <input
              type="text"
              id="reportVersion"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="reportTags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              id="reportTags"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="reportNotes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              id="reportNotes"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
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
              {initialReport ? "Update Report" : "Save Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const ReportsSection = () => {
  // Sample data for various reports
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Monthly Sales Performance (Q3 2023)",
      date: "2023-10-01",
      status: "Completed",
      category: "Financial",
      description: "Comprehensive analysis of sales figures for Q3 2023, highlighting key growth areas and challenges.",
      author: "Analytics Team",
      version: "1.2",
      tags: ["sales", "quarterly", "performance"],
      notes: "Reviewed with finance team. Key insights: Q3 growth exceeded expectations by 5%.",
    },
    {
      id: 2,
      title: "User Engagement Metrics (September)",
      date: "2023-09-15",
      status: "In Progress",
      category: "Marketing",
      description: "Detailed report on user activity, retention, and new sign-ups for the month of September.",
      author: "Marketing Department",
      version: "Draft",
      tags: ["users", "engagement", "monthly"],
      notes: "",
    },
    {
      id: 3,
      title: "Annual Company Performance Review (2022)",
      date: "2023-08-20",
      status: "Completed",
      category: "Executive",
      description: "Overview of the company's financial and operational performance throughout the year 2022.",
      author: "CEO Office",
      version: "Final",
      tags: ["annual", "review", "strategy"],
      notes: "Presented to the board. Action items assigned for 2023 strategic planning.",
    },
    {
      id: 4,
      title: "Q4 Product Development Roadmap",
      date: "2023-11-01",
      status: "Pending",
      category: "Product",
      description: "Proposed plan and timeline for new feature development and product enhancements in Q4.",
      author: "Product Team",
      version: "Initial",
      tags: ["roadmap", "development", "features"],
      notes: "Awaiting final approval from product lead. Needs review by engineering.",
    },
    {
      id: 5,
      title: "Customer Feedback Analysis (October)",
      date: "2023-10-25",
      status: "Completed",
      category: "Customer Service",
      description: "Analysis of customer feedback collected through surveys and support tickets in October.",
      author: "Customer Success",
      version: "1.0",
      tags: ["feedback", "customer satisfaction"],
      notes: "Identified recurring issues with login process. Escalated to development.",
    },
    {
      id: 6,
      title: "IT Infrastructure Audit Report",
      date: "2023-09-01",
      status: "Completed",
      category: "IT",
      description: "Audit findings and recommendations for improving the current IT infrastructure security and efficiency.",
      author: "IT Security",
      version: "1.0",
      tags: ["IT", "security", "audit"],
      notes: "All critical vulnerabilities addressed. Minor issues to be resolved by end of month.",
    },
    {
      id: 7,
      title: "Employee Training Program Evaluation",
      date: "2023-10-10",
      status: "In Progress",
      category: "HR",
      description: "Evaluation of the effectiveness of recent employee training programs and future recommendations.",
      author: "HR Department",
      version: "Draft",
      tags: ["HR", "training", "evaluation"],
      notes: "Gathering feedback from participants. Initial results are positive.",
    },
  ]);

  // Sample data for meeting reports
  const [meetingReports, setMeetingReports] = useState([
    {
      id: 1,
      title: "Weekly IT Sync Meeting",
      date: "2024-07-08",
      attendees: ["Alice", "Bob", "Charlie"],
      summary: "Discussed Q3 project progress and upcoming maintenance schedule.",
      actionItems: ["Review server logs", "Update security patches"],
    },
    {
      id: 2,
      title: "New Software Rollout Planning",
      date: "2024-07-05",
      attendees: ["Alice", "David", "Eve"],
      summary: "Planned the phased rollout of the new CRM system.",
      actionItems: ["Prepare user training materials", "Configure test environment"],
    },
  ]);

  // Sample data for upcoming report tasks
  const [upcomingReportTasks, setUpcomingReportTasks] = useState([
    {
      id: 1,
      name: "Generate Q2 Financial Report",
      dueDate: "2024-07-31",
      assignedTo: "Finance Team",
      status: "Pending",
      notes: "Ensure all sales data from July is included.",
    },
    {
      id: 2,
      name: "Prepare Annual Security Audit Report",
      dueDate: "2024-08-15",
      assignedTo: "IT Security",
      status: "Pending",
      notes: "Coordinate with external auditors for August 1st walkthrough.",
    },
    {
      id: 3,
      name: "Compile Monthly Support Ticket Summary",
      dueDate: "2024-07-20",
      assignedTo: "IT Support",
      status: "In Progress",
      notes: "Focus on tickets with 'High' priority and above.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date"); // 'date' or 'title'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  const [activeSubTab, setActiveSubTab] = useState("allReports"); // 'allReports', 'meetingReports', 'upcomingTasks'

  // State for modals
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [selectedMeetingReport, setSelectedMeetingReport] = useState(null); // For editing meeting reports

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [selectedReportForNote, setSelectedReportForNote] = useState(null);

  const [showAddUpcomingTaskModal, setShowAddUpcomingTaskModal] = useState(false);
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState(null); // For editing upcoming tasks

  const [showEditReportModal, setShowEditReportModal] = useState(false); // New state for editing main reports
  const [selectedReportForEdit, setSelectedReportForEdit] = useState(null); // New state for selected main report


  // Function to get status-specific Tailwind classes
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filtered and sorted reports
  const filteredAndSortedReports = useMemo(() => {
    let filtered = reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        filterCategory === "All" || report.category === filterCategory;
      const matchesStatus =
        filterStatus === "All" || report.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort logic
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [reports, searchTerm, filterCategory, filterStatus, sortBy, sortOrder]);

  // Handle task completion
  const toggleTaskStatus = (id) => {
    setUpcomingReportTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
          : task
      )
    );
  };

  // Handle delete task
  const deleteTask = (id) => {
    setUpcomingReportTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Handle adding a new meeting report
  const handleAddMeetingReport = (newReport) => {
    setMeetingReports((prevReports) => [...prevReports, newReport]);
  };

  // Handle editing a meeting report
  const handleEditMeetingReport = (updatedReport) => {
    setMeetingReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  };

  // Handle delete meeting report
  const deleteMeetingReport = (id) => {
    setMeetingReports((prevReports) => prevReports.filter((report) => report.id !== id));
  };

  // Handle saving a note to a report (for 'All Reports' section)
  const handleSaveNote = (reportId, noteContent) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, notes: noteContent } : report
      )
    );
  };

  // Handle adding a new upcoming task
  const handleAddUpcomingTask = (newTask) => {
    setUpcomingReportTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Handle editing an upcoming task
  const handleEditUpcomingTask = (updatedTask) => {
    setUpcomingReportTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Handle editing a main report (from "All Reports" section)
  const handleEditReport = (updatedReport) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  };

  // Handle deleting a main report (from "All Reports" section)
  const handleDeleteReport = (id) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== id));
  };


  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Reports & Analytics Dashboard
      </h1>

      {/* Sub-navigation for different report types */}
      <div className="flex justify-center mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab("allReports")}
          className={`px-6 py-3 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeSubTab === "allReports"
              ? "text-blue-700 border-b-4 border-blue-700 bg-blue-50"
              : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
          }`}
        >
          All Reports
        </button>
        <button
          onClick={() => setActiveSubTab("meetingReports")}
          className={`px-6 py-3 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeSubTab === "meetingReports"
              ? "text-blue-700 border-b-4 border-blue-700 bg-blue-50"
              : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
          }`}
        >
          Meeting Reports
        </button>
        <button
          onClick={() => setActiveSubTab("upcomingTasks")}
          className={`px-6 py-3 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeSubTab === "upcomingTasks"
              ? "text-blue-700 border-b-4 border-blue-700 bg-blue-50"
              : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
          }`}
        >
          Upcoming Tasks
        </button>
      </div>

      {/* Content based on active sub-tab */}
      {activeSubTab === "allReports" && (
        <>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Financial">Financial</option>
              <option value="Marketing">Marketing</option>
              <option value="Executive">Executive</option>
              <option value="Product">Product</option>
              <option value="Customer Service">Customer Service</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
            </select>

            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="flex w-full md:w-auto gap-2">
              <select
                className="w-1/2 md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="w-1/2 md:w-auto p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition duration-150"
                title={`Sort order: ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
              >
                <FaSort className="mr-1" /> {sortOrder === "asc" ? "ASC" : "DESC"}
              </button>
            </div>
          </div>

          {/* Reports Grid */}
          {filteredAndSortedReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-gray-50 border border-gray-100 rounded-xl shadow-md p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{report.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Date:</strong> {report.date}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Category:</strong> {report.category}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Author:</strong> {report.author}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Version:</strong> {report.version}
                    </p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {report.description}
                    </p>
                    {report.notes && (
                      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 mt-3 border-l-4 border-blue-400">
                        <strong className="flex items-center mb-1"><FaStickyNote className="mr-2 text-blue-500" />Notes:</strong> {report.notes}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {report.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => {
                          setSelectedReportForNote(report);
                          setShowAddNoteModal(true);
                        }}
                        className="text-gray-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
                        title="Add/Edit Note"
                      >
                        <FaStickyNote />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReportForEdit(report);
                          setShowEditReportModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
                        title="Edit Report"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                        title="Delete Report"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
              No reports match your criteria.
            </div>
          )}
        </>
      )}

      {activeSubTab === "meetingReports" && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Meeting Reports</h2>
            <button
              onClick={() => {
                setSelectedMeetingReport(null); // Clear selection for new report
                setShowAddMeetingModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition duration-200"
            >
              <FaPlus className="mr-2" /> Add Meeting Report
            </button>
          </div>
          {meetingReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetingReports.map((meeting) => (
                <div key={meeting.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{meeting.title}</h3>
                  <p className="text-sm text-gray-600 mb-1 flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    <strong>Date:</strong> {meeting.date}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Attendees:</strong> {meeting.attendees.join(", ")}
                  </p>
                  <p className="text-gray-700 text-sm mb-3">
                    <strong>Summary:</strong> {meeting.summary}
                  </p>
                  <div className="mb-3">
                    <strong className="text-gray-700 text-sm">Action Items:</strong>
                    <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                      {meeting.actionItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedMeetingReport(meeting);
                        setShowAddMeetingModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
                      title="Edit Meeting Report"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteMeetingReport(meeting.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete Meeting Report"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
              No meeting reports available.
            </div>
          )}
        </div>
      )}

      {activeSubTab === "upcomingTasks" && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Report Tasks</h2>
            <button
              onClick={() => {
                setSelectedTaskForEdit(null); // Clear selection for new task
                setShowAddUpcomingTaskModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition duration-200"
            >
              <FaPlus className="mr-2" /> Add New Task
            </button>
          </div>
          {upcomingReportTasks.length > 0 ? (
            <div className="space-y-4">
              {upcomingReportTasks.map((task) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Due Date:</strong> {task.dueDate} | <strong>Assigned To:</strong>{" "}
                      {task.assignedTo}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getStatusClass(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                    {task.notes && (
                      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 mt-3 border-l-4 border-purple-400">
                        <strong className="flex items-center mb-1"><FaStickyNote className="mr-2 text-purple-500" />Notes:</strong> {task.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`p-2 rounded-full ${
                        task.status === "Completed"
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-500 hover:text-blue-700 hover:bg-blue-50"
                      } transition`}
                      title={task.status === "Completed" ? "Mark as Pending" : "Mark as Completed"}
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTaskForEdit(task);
                        setShowAddUpcomingTaskModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
                      title="Edit Task"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete Task"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
              No upcoming report tasks.
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Meeting Report Modal */}
      {showAddMeetingModal && (
        <AddMeetingReportModal
          onClose={() => setShowAddMeetingModal(false)}
          onSave={selectedMeetingReport ? handleEditMeetingReport : handleAddMeetingReport}
          initialReport={selectedMeetingReport}
        />
      )}

      {/* Add Note Modal (for All Reports) */}
      {showAddNoteModal && selectedReportForNote && (
        <AddNoteModal
          report={selectedReportForNote}
          onClose={() => setShowAddNoteModal(false)}
          onSave={handleSaveNote}
        />
      )}

      {/* Add/Edit Upcoming Task Modal */}
      {showAddUpcomingTaskModal && (
        <AddUpcomingTaskModal
          onClose={() => setShowAddUpcomingTaskModal(false)}
          onSave={selectedTaskForEdit ? handleEditUpcomingTask : handleAddUpcomingTask}
          initialTask={selectedTaskForEdit}
        />
      )}

      {/* Add/Edit Main Report Modal (for All Reports) */}
      {showEditReportModal && (
        <EditReportModal
          onClose={() => setShowEditReportModal(false)}
          onSave={handleEditReport}
          initialReport={selectedReportForEdit}
        />
      )}
    </div>
  );
};

export default ReportsSection;
