// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";

// const Color = ({ colors, onColorSelect }) => {
//   const [selectedColor, setSelectedColor] = useState("");

//   useEffect(() => {
//     if (colors && colors.length > 0) {
//       onColorSelect(colors[0].color);
//     }
//   }, [colors, onColorSelect]);
//   const handleColorClick = (color) => {
//     setSelectedColor(color);
//     onColorSelect(color);
//   };

//   return (
//     <div>
//       <h2 className="mb-4 font-bold">Colors</h2>
//       <div className="flex space-x-3">
//         {Array.isArray(colors) && colors.length > 0 ? (
//           colors.map(({ id, color }) => (
//             <button
//               key={id}
//               onClick={() => handleColorClick(color)}
//               className={`w-8 h-8 rounded-full border-2 ${
//                 selectedColor === color
//                   ? "border-blue-500"
//                   : "border-transparent"
//               }`}
//               style={{ backgroundColor: color }}
//             />
//           ))
//         ) : (
//           <p>No colors available</p>
//         )}
//       </div>
//       {selectedColor && (
//         <p className="mt-4">
//           Selected Color: <span className="font-bold">{selectedColor}</span>
//         </p>
//       )}
//     </div>
//   );
// };

// // Add PropTypes validation
// Color.propTypes = {
//   colors: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       color: PropTypes.string.isRequired,
//     })
//   ),
// };

// export default Color;
