import React, { useState } from "react";
import InteractiveMap from "./InteractiveMap";
import Toast from "./ui/Toast"; // Import the Toast component here

const DashboardContent = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="overflow-hidden">
      <h2 className="text-xl lg:text-3xl font-bold">Welcome Mr. Ebuka</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* <!-- Card --> */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Total Events
              </p>
              <div className="hs-tooltip">
                <div className="hs-tooltip-toggle">
                  <svg
                    className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                    role="tooltip"
                  >
                    The number of daily users
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                100,000
              </h3>
              <span className="flex items-center gap-x-1 text-green-600">
                <img src="/images/rise.svg" alt="" />
                <span className="inline-block text-sm"> 5% </span>
              </span>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* Additional cards omitted for brevity */}
      </div>

      {/* Map and Toast Container */}
      <div className="map-container">
        <InteractiveMap
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        {selectedCountry && (
          <div className="toast-overlay">
            <Toast
              message={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          </div>
        )}

        <style jsx>{`
          .dashboard-container {
            overflow: hidden;
            padding: 16px;
          }

          .dashboard-title {
            font-size: 1.5rem;
            font-weight: bold;
          }

          .dashboard-grid {
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .card-content {
            padding: 16px;
          }

          .card-title {
            font-size: 0.875rem;
            text-transform: uppercase;
            color: #666;
          }

          .stats-value {
            font-size: 1.25rem;
            color: #333;
          }

          .stats-percentage {
            color: green;
            display: flex;
            align-items: center;
          }

          .map-container {
            position: relative;
            margin-top: 32px;
            border-radius: 8px;
            overflow: hidden;
            height: 300px; /* Set to a smaller height */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .toast-overlay {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 1000;
            pointer-events: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DashboardContent;
