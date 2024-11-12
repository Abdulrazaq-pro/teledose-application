// {
//   /* Map and Toast Container */
// }
// <div className="map-container">
//   <InteractiveMap
//     selectedCountry={selectedCountry}
//     setSelectedCountry={setSelectedCountry}
//   />

//   {selectedCountry && (
//     <div className="toast-overlay">
//       <Toast
//         message={selectedCountry}
//         onClose={() => setSelectedCountry(null)}
//       />
//     </div>
//   )}

//   <style jsx>{`
//     .dashboard-container {
//       overflow: hidden;
//       padding: 16px;
//     }

//     .dashboard-title {
//       font-size: 1.5rem;
//       font-weight: bold;
//     }

//     .dashboard-grid {
//       display: grid;
//       gap: 16px;
//       grid-template-columns: repeat(2, 1fr);
//     }

//     .dashboard-card {
//       background-color: white;
//       border: 1px solid #ccc;
//       border-radius: 8px;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//       overflow: hidden;
//     }

//     .card-content {
//       padding: 16px;
//     }

//     .card-title {
//       font-size: 0.875rem;
//       text-transform: uppercase;
//       color: #666;
//     }

//     .stats-value {
//       font-size: 1.25rem;
//       color: #333;
//     }

//     .stats-percentage {
//       color: green;
//       display: flex;
//       align-items: center;
//     }

//     .map-container {
//       position: relative;
//       margin-top: 32px;
//       border-radius: 8px;
//       overflow: hidden;
//       height: 300px; /* Set to a smaller height */
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     }

//     .toast-overlay {
//       position: absolute;
//       top: 16px;
//       right: 16px;
//       z-index: 1000;
//       pointer-events: auto;
//     }
//   `}</style>
// </div>;
