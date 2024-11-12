import React, { useState, useEffect, useRef } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import gsap from "gsap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock health statistics data
const healthStats = [
  { month: "Jan", cases: 2400, recoveries: 1398, vaccinations: 3908 },
  { month: "Feb", cases: 1398, recoveries: 2800, vaccinations: 4800 },
  { month: "Mar", cases: 9800, recoveries: 3908, vaccinations: 6800 },
  { month: "Apr", cases: 3908, recoveries: 4800, vaccinations: 7200 },
  { month: "May", cases: 4800, recoveries: 3800, vaccinations: 8100 },
  { month: "Jun", cases: 3800, recoveries: 4300, vaccinations: 9000 },
];

const DashboardContent = () => {
  const [username, setUsername] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("...");
  const [healthConditions, setHealthConditions] = useState([]);
  const [location, setLocation] = useState("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const fetchUserData = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || "User");
          setEmergencyContact(
            userData.emergencyContact || "No contact info available"
          );
          setLocation(userData.location || "Location not provided");

          // Fetch and rephrase health conditions
          const conditions = userData.healthConditions || [];
          const rephrasedConditions = await Promise.all(
            conditions.map(async (condition) => {
              const response = await rephraseWithAI(condition);
              return response?.output || condition;
            })
          );
          setHealthConditions(rephrasedConditions);
        } else {
          console.error("User document doesn't exist.");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
      setLoading(false);
    };

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setUsername("");
        setEmergencyContact("...");
        setLocation("...");
        setHealthConditions([]);
        setLoading(false);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const textRef = useRef(null);

  useEffect(() => {
    // Ensure that textRef is not null and children are present
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char");

      // Check if characters are being selected correctly
      console.log(chars); // Debugging line to verify selection

      // Only animate if there are characters
      if (chars.length > 0) {
        // GSAP animation for each character
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      } else {
        console.warn("No characters found in username");
      }
    } else {
      console.warn("textRef is not assigned correctly");
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="text-2xl lg:text-3xl py-6">
        Welcome to this space,{" "}
        <span className="font-bold" ref={textRef}>
          {username.split("").map((char, index) => (
            <span key={index} className="char">
              {char}
            </span>
          ))}
        </span>{" "}
        👋
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Events Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Total App Users
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
                243
              </h3>
              <span className="flex items-center gap-x-1 text-green-600">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19V5M5 12L12 5L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="inline-block text-sm">5%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contact Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Emergency Contact
              </p>
            </div>
            <div className="mt-1">
              <h3 className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                {username}:{" "}
                <span className="text-lg"> + {emergencyContact}</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Health Conditions Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Health Conditions
              </p>
            </div>
            <div className="mt-1">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Hypertension
                </span>
                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Diabetes Type 2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Location
              </p>
            </div>
            <div className="mt-1">
              <h3 className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                {location}
              </h3>
              <p className="text-xs text-gray-500 dark:text-neutral-500">
                Locate me
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Statistics Chart */}
      <div className="mt-6 bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 p-4 md:p-5">
        <h3 className="text-lg font-semibold mb-4">
          Nigeria Health Statistics
        </h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#ff0000"
                name="Cases"
              />
              <Line
                type="monotone"
                dataKey="recoveries"
                stroke="#00ff00"
                name="Recoveries"
              />
              <Line
                type="monotone"
                dataKey="vaccinations"
                stroke="#0000ff"
                name="Vaccinations"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
