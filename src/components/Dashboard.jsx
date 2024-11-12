"use client";

import React, { useState } from "react";
import { Send } from "lucide-react"; // Import the Send icon from Lucide

import DashboardContent from "./DashboardContent";
import ChatbotContent from "./ChatbotContent";
import DocumentationContent from "./DocumentationContent";
import SymptomsChecker from "./SymptomsChecker";

import {
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  Activity,
} from "lucide-react"; // import appropriate icons from Lucide

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  // Function to handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle message sending
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: inputValue }]);
    setInputValue(""); // Clear input after sending

    try {
      const response = await fetch("/api/ai-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _input: inputValue }),
      });
      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      const botMessage = data._output.slice(12, -2);

      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred. Please try again later." },
      ]);
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  //  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Function to toggle the logout modal
  const toggleLogoutModal = () => setIsLogoutModalOpen(!isLogoutModalOpen);

  // Function to handle logout confirmation
  const handleLogout = () => {
    // Perform your logout logic here (e.g., clear tokens, redirect)
    console.log("User logged out");
    setIsLogoutModalOpen(false); // Close the modal after logout
  };

  return (
    <div className="relative flex flex-col h-screen">
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            <a
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="#"
              aria-label="Preline"
            >
              <p className="text-green-600 font-bold italic">TeleDose</p>
            </a>
          </div>
          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3"></div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-green-600 focus:outline-none focus:text-green-600"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </button>
              </div>
              <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                <svg
                  className="shrink-0 size-3 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <span className="mx-1">
                  <svg
                    className="shrink-0 size-3 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </span>
                <span className="text-xs">/</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-1">
            <button
              type="button"
              className="md:hidden size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            <button
              type="button"
              className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="sr-only">Notifications</span>
            </button>

            <button
              type="button"
              className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className="sr-only">Activity</span>
            </button>

            <div className=" relative inline-flex">
              <button
                onClick={toggleLogoutModal}
                type="button"
                className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <img
                  className="shrink-0 size-[38px] rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                  alt="Avatar"
                />
              </button>

              <div
                className="opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-dropdown-account"
              >
                <div className="py-3 px-5 bg-gray-100 rounded-t-lg">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800">
                    james@site.com
                  </p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href="#"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    Newsletter
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href="#"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Purchases
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href="#"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                      <path d="M12 12v9" />
                      <path d="m8 17 4 4 4-4" />
                    </svg>
                    Downloads
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href="#"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Team Account
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Button: Visible only on mobile */}
        </nav>

        {/* <div className="flex items-center justify-end py-2 md:hidden w-full">
          <button
            type="button"
            className="w-8 h-8 flex mr-5 justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            onClick={toggleSidebar}
          >
            <svg
              className="shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
          </button>
        </div> */}
      </header>

      {/* Sidebar */}
      <div>
        <div
          className={`hs-overlay fixed inset-y-0 start-0 z-[60] w-[260px] h-full bg-white border-e border-gray-200 transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
          role="dialog"
          tabIndex="-1"
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col h-full max-h-full">
            {/* Sidebar Content */}
            <div className="px-6 pt-4">
              <a
                className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Preline"
              >
                {/* Logo SVG */}
                <p className="text-green-600 font-bold italic">TeleDose</p>
              </a>
            </div>

            {/* Sidebar Navigation */}
            <div className="h-full flex-grow overflow-y-auto">
              <nav
                className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open
              >
                <ul className="flex flex-col space-y-4 mt-4">
                  {/* Navigation Links */}
                  {["dashboard", "chatbot", "documentation", "symptoms"].map(
                    (component) => {
                      const IconComponent = {
                        dashboard: LayoutDashboard,
                        chatbot: MessageCircle,
                        documentation: BookOpen,
                        symptoms: Activity,
                      }[component];

                      return (
                        <li key={component}>
                          <button
                            onClick={() => setActiveComponent(component)}
                            className={`w-full flex items-center gap-x-2.5 py-3 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none ${
                              activeComponent === component
                                ? "bg-green-200"
                                : "bg-gray-100"
                            }`}
                          >
                            <IconComponent className="w-4 h-4 text-gray-500" />
                            {component.charAt(0).toUpperCase() +
                              component.slice(1)}
                          </button>
                        </li>
                      );
                    }
                  )}
                </ul>
              </nav>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              className="flex items-center bg-slate-100 px-4 py-2"
              onClick={toggleLogoutModal}
            >
              <span className="mr-2">
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    d="M16 17l5-5m0 0l-5-5m5 5H9m3 5c0 .93 0 1.395-.102 1.776a3 3 0 01-2.122 2.122C9.395 21 8.93 21 8 21h-.5c-1.398 0-2.097 0-2.648-.228a3 3 0 01-1.624-1.624C3 18.597 3 17.898 3 16.5v-9c0-1.398 0-2.097.228-2.648a3 3 0 011.624-1.624C5.403 3 6.102 3 7.5 3H8c.93 0 1.395 0 1.776.102a3 3 0 012.122 2.122C12 5.605 12 6.07 12 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Logout
            </button>
          </div>
        </div>

        {/* Logout Modal */}
        {isLogoutModalOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[70]"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Logout
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to log out?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={toggleLogoutModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64 h-screen overflow-hidden mb-48 lg:mb-24">
        {/* Main Content Area with Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-4 sm:space-y-6">
            {activeComponent === "dashboard" && <DashboardContent />}
            {activeComponent === "chatbot" && (
              <ChatbotContent messages={messages} />
            )}
            {activeComponent === "documentation" && <DocumentationContent />}
            {activeComponent === "symptoms" && <SymptomsChecker />}
          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        {/* Fixed Input Area at Bottom */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 lg:pl-64">
          <div className="flex justify-center">
            {activeComponent === "chatbot" && (
              <div className="w-full max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
                <div className="relative">
                  <textarea
                    className="p-4 pb-12 block w-full border border-gray-200 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="Ask me anything..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Prevents a new line from being added
                        handleSendMessage();
                      }
                    }}
                  ></textarea>
                  <div className="absolute bottom-2 right-2">
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="inline-flex justify-center items-center px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-green-500"
                    >
                      <Send className="w-5 h-5" />{" "}
                      {/* Replaces "Send" with the Send icon */}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-4 justify-between p-2 px-5 md:hidden bg-gray-50 shadow-md">
            <button
              onClick={() => setActiveComponent("dashboard")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                activeComponent === "dashboard"
                  ? "bg-green-200 scale-125"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard
                size={activeComponent === "dashboard" ? 28 : 24}
                className="text-neutral-800"
              />
            </button>

            <button
              onClick={() => setActiveComponent("chatbot")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                activeComponent === "chatbot"
                  ? "bg-green-200 scale-125"
                  : "hover:bg-gray-100"
              }`}
            >
              <MessageCircle
                size={activeComponent === "chatbot" ? 28 : 24}
                color="#262626" // Equivalent to text-neutral-800
              />
            </button>

            <button
              onClick={() => setActiveComponent("documentation")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                activeComponent === "documentation"
                  ? "bg-green-200 scale-125"
                  : "hover:bg-gray-100"
              }`}
            >
              <BookOpen
                size={activeComponent === "documentation" ? 28 : 24}
                className="text-neutral-800"
              />
            </button>

            <button
              onClick={() => setActiveComponent("symptoms")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                activeComponent === "symptoms"
                  ? "bg-green-200 scale-125"
                  : "hover:bg-gray-100"
              }`}
            >
              <Activity
                size={activeComponent === "symptoms" ? 28 : 24}
                className="text-neutral-800"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
