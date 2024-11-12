import React, { useState } from "react";

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };

  // Handle symptom check
  const handleCheckSymptoms = async () => {
    if (symptoms.trim() === "") {
      alert("Please enter your symptoms to proceed.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ai-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _input: `Predict disease based on symptoms: ${symptoms}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Remove the first 12 characters and the last character from data._output
      const prediction = data._output.slice(12, -2);

      setResult(prediction);
    } catch (error) {
      setResult("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Clear the input and result
  const handleClear = () => {
    setSymptoms("");
    setResult(null);
  };

  // Handle Enter key press in textarea
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents newline in textarea
      handleCheckSymptoms();
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Symptom Checker
          </h1>
          <p className="mt-3 text-gray-600">
            Enter your symptoms, and we&apos;ll provide a potential diagnosis.
          </p>
        </div>

        <div className="mt-8">
          <textarea
            className="p-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Describe your symptoms here..."
            value={symptoms}
            onChange={handleSymptomsChange}
            onKeyDown={handleKeyPress} // Added onKeyDown to handle Enter key
          ></textarea>

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={handleClear}
              className="py-2 px-4 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Clear
            </button>
            <button
              onClick={handleCheckSymptoms}
              className="py-2 px-4 text-sm rounded-lg text-white bg-green-600 hover:bg-green-500"
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Symptoms"}
            </button>
          </div>
        </div>

        {/* Display the result */}
        {result && (
          <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">Prediction:</h2>
            <p
              className="text-sm text-gray-800 mt-2"
              dangerouslySetInnerHTML={{ __html: result }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomsChecker;
