import React, { useEffect, useState } from "react";

import {
  Search,
  Book,
  Heart,
  Bell,
  Users,
  Settings,
  ExternalLink,
  ChevronRight,
  Home,
  Star,
} from "lucide-react";

const DocumentationContent = () => {
  const [healthTips, setHealthTips] = useState([]);

  const [activeSection, setActiveSection] = useState("getting-started");

  const medicalResources = [
    {
      title: "WHO Guidelines",
      description: "Latest medical guidelines and protocols from WHO",
      url: "https://www.who.int/publications/who-guidelines#:~:text=A%20WHO%20guideline%20is%20defined%20broadly%20as%20any,recommendations%20for%20clinical%20practice%20or%20public%20health%20policy.",
      category: "Guidelines",
    },
    {
      title: "PubMed Central",
      description: "Free full-text archive of biomedical literature",
      url: "https://www.ncbi.nlm.nih.gov/pmc/",
      category: "Research",
    },
    {
      title: "CDC Health Updates",
      description: "Latest health advisories and updates",
      url: "https://www.cdc.gov/",
      category: "Updates",
    },
  ];

const recentUpdates = [
  {
    title: "New Telehealth Regulations 2024",
    date: "2024-03-15",
    type: "Regulatory",
    url: "https://bhbusiness.com/2024/10/15/dea-to-extend-telehealth-flexibilities-for-controlled-substances-a-third-time/", // Add URL
  },
  {
    title: "AI Integration in Diagnosis",
    date: "2024-03-10",
    type: "Feature",
    url: "https://link.springer.com/article/10.1007/s12553-021-00555-5", // Add URL
  },
  {
    title: "Enhanced Patient Privacy Controls",
    date: "2024-03-05",
    type: "Security",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6322916/", // Add URL
  },
];
  // Fetch health tips from JSON file
  useEffect(() => {
    fetch("/health_tips.json") // Adjust path if the file is located elsewhere
      .then((response) => response.json())
      .then((data) => setHealthTips(data))
      .catch((error) => console.log("Error fetching health tips:", error));
  }, []);

  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Search Bar */}
        <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Medical Resources Section */}

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Medical Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalResources.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {resource.description}
                      </p>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200">
                      {resource.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Recent Updates
            </h2>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <a
                  key={index}
                  href={update.url} // Make each update clickable
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {update.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {update.date}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        update.type === "Regulatory"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : update.type === "Feature"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {update.type}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
                    Read more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationContent;
