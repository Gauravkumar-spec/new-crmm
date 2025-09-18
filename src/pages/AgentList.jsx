// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useAgentSearchMutation } from "../services/agentApi";
// // import { FiEdit, FiTrash2, FiMail, FiPhone, FiUser, FiX, FiCheck } from "react-icons/fi";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // function AgentList() {
// //   const [agentSearch, { data }] = useAgentSearchMutation();
// //   const [agents, setAgents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [editingAgent, setEditingAgent] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     mobile: "",
// //   });
// //   const [image, setImage] = useState(null);

// //   useEffect(() => {
// //     fetchAgents();
// //   }, []);

// //   const fetchAgents = async () => {
// //     try {
// //       setLoading(true);
// //       const data = {
// //         status: null,
// //         search: null,
// //         name: null,
// //         email: null,
// //         last_agent_id: null,
// //         limit: 10,
// //         sort_by: "name",
// //         sort_order: "ASC",
// //         client_id: 1,
// //       };
// //       const res = await agentSearch(data).unwrap();
// //       setAgents(res);
// //     } catch (err) {
// //       console.error("Failed to fetch agents:", err);
// //       setError("Failed to load agents. Please try again later.");
// //       toast.error("Failed to load agents", {
// //         position: "top-center",
// //         autoClose: 3000,
// //         theme: "dark",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this agent?")) {
// //       try {
// //         await axios.delete(`http://localhost:5000/api/agents/${id}`);
// //         setAgents(agents.filter((agent) => agent._id !== id));
// //         toast.success("Agent deleted successfully", {
// //           position: "top-center",
// //           autoClose: 3000,
// //           theme: "dark",
// //         });
// //       } catch (err) {
// //         console.error("Failed to delete agent:", err);
// //         setError("Failed to delete agent");
// //         toast.error("Failed to delete agent", {
// //           position: "top-center",
// //           autoClose: 3000,
// //           theme: "dark",
// //         });
// //       }
// //     }
// //   };

// //   const handleEdit = (agent) => {
// //     setEditingAgent(agent.agent_id);
// //     setFormData({
// //       name: agent.name,
// //       email: agent.email,
// //       mobile: agent.mobile || "",
// //     });
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const data = new FormData();
// //       data.append("name", formData.name);
// //       data.append("email", formData.email);
// //       data.append("mobile", formData.mobile);
// //       if (image) data.append("image", image);

// //       const res = await axios.put(
// //         `http://localhost:5000/api/agents/${editingAgent}`,
// //         data,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );

// //       setAgents(
// //         agents.map((agent) => (agent.agent_id === editingAgent ? res.data : agent))
// //       );
// //       cancelEdit();
// //       toast.success("Agent updated successfully", {
// //         position: "top-center",
// //         autoClose: 3000,
// //         theme: "dark",
// //       });
// //     } catch (err) {
// //       console.error("Failed to update agent:", err);
// //       setError("Failed to update agent");
// //       toast.error("Failed to update agent", {
// //         position: "top-center",
// //         autoClose: 3000,
// //         theme: "dark",
// //       });
// //     }
// //   };

// //   const cancelEdit = () => {
// //     setEditingAgent(null);
// //     setFormData({ name: "", email: "", mobile: "" });
// //     setImage(null);
// //   };

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-slate-100 dark:bg-darkmode-800 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// //           <p className="mt-4 text-slate-600 dark:text-slate-400">Loading agents...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-slate-100 dark:bg-darkmode-800 flex items-center justify-center">
// //         <div className="bg-white dark:bg-darkmode-600 border border-slate-200 dark:border-darkmode-400 rounded-lg p-6 max-w-md mx-auto">
// //           <div className="flex items-center space-x-2 text-red-500">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-6 w-6"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={1.5}
// //                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
// //               />
// //             </svg>
// //             <span>{error}</span>
// //           </div>
// //           <button
// //             onClick={() => setError(null)}
// //             className="mt-4 btn btn-primary w-full"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-100 dark:bg-darkmode-800 py-12 px-4 sm:px-6 lg:px-8">
// //       <ToastContainer />

// //       <div className="flex items-center mt-8 mb-8">
// //         <h2 className="intro-y text-lg font-medium mr-auto">Agent List</h2>
// //       </div>

// //       <div className="intro-y box p-5 mt-5">
// //         {/* Edit Form */}
// //         {editingAgent && (
// //           <div className="mb-8 p-6 bg-slate-50 dark:bg-darkmode-700 rounded-lg">
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-lg font-medium">Edit Agent</h3>
// //               <button
// //                 onClick={cancelEdit}
// //                 className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
// //               >
// //                 <FiX size={20} />
// //               </button>
// //             </div>
// //             <form onSubmit={handleUpdate} className="grid grid-cols-12 gap-4">
// //               <div className="intro-y col-span-12 sm:col-span-6">
// //                 <label htmlFor="name" className="form-label">
// //                   <FiUser className="inline mr-2" /> Full Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   className="form-control"
// //                   placeholder="Full Name"
// //                   required
// //                 />
// //               </div>

// //               <div className="intro-y col-span-12 sm:col-span-6">
// //                 <label htmlFor="email" className="form-label">
// //                   <FiMail className="inline mr-2" /> Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className="form-control"
// //                   placeholder="Email"
// //                   required
// //                 />
// //               </div>

// //               <div className="intro-y col-span-12 sm:col-span-6">
// //                 <label htmlFor="mobile" className="form-label">
// //                   <FiPhone className="inline mr-2" /> Mobile
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   name="mobile"
// //                   value={formData.mobile}
// //                   onChange={handleChange}
// //                   className="form-control"
// //                   placeholder="Phone (Optional)"
// //                 />
// //               </div>

// //               <div className="intro-y col-span-12 sm:col-span-6">
// //                 <label className="form-label">Profile Image</label>
// //                 <div className="flex items-center">
// //                   <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 dark:border-darkmode-400 rounded-lg bg-white dark:bg-darkmode-600 hover:bg-slate-50 dark:hover:bg-darkmode-500 transition-all cursor-pointer">
// //                     <div className="flex flex-col items-center justify-center">
// //                       <svg
// //                         className="w-8 h-8 mb-3 text-slate-400"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth="1.5"
// //                           d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
// //                         ></path>
// //                       </svg>
// //                       <p className="text-sm text-slate-500 dark:text-slate-400">
// //                         <span className="font-medium text-primary">Update photo</span> (optional)
// //                       </p>
// //                     </div>
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={(e) => setImage(e.target.files[0])}
// //                       className="hidden"
// //                     />
// //                   </label>
// //                 </div>
// //                 {image && (
// //                   <div className="mt-3 flex items-center justify-between bg-slate-100 dark:bg-darkmode-700 p-2 rounded-lg">
// //                     <div className="flex items-center space-x-2">
// //                       <div className="relative w-8 h-8 overflow-hidden rounded">
// //                         <img
// //                           src={URL.createObjectURL(image)}
// //                           alt="Preview"
// //                           className="absolute inset-0 object-cover w-full h-full"
// //                         />
// //                       </div>
// //                       <span className="text-sm text-slate-700 dark:text-slate-300 truncate max-w-xs">
// //                         {image.name}
// //                       </span>
// //                     </div>
// //                     <button
// //                       type="button"
// //                       onClick={() => setImage(null)}
// //                       className="text-slate-400 hover:text-red-500 transition-colors"
// //                     >
// //                       <FiX size={16} />
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="intro-y col-span-12 flex items-center justify-end mt-4 space-x-3">
// //                 <button
// //                   type="button"
// //                   onClick={cancelEdit}
// //                   className="btn btn-secondary"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="btn btn-primary"
// //                 >
// //                   <FiCheck className="mr-2" /> Update Agent
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         )}

// //         {/* Agent Cards */}
// //         {agents?.data?.length === 0 ? (
// //           <div className="text-center py-12">
// //             <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-200 dark:bg-darkmode-600 rounded-full mb-4">
// //               <FiUser className="h-8 w-8 text-slate-500 dark:text-slate-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
// //               No Agents Found
// //             </h3>
// //             <p className="text-slate-600 dark:text-slate-400">
// //               The network is currently empty. Add your first agent.
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {agents?.data?.map((agent) => (
// //               <div
// //                 key={agent.agent_id}
// //                 className="bg-white dark:bg-darkmode-600 rounded-lg border border-slate-200 dark:border-darkmode-400 overflow-hidden transition-all duration-300 hover:shadow-md"
// //               >
// //                 {/* Agent Image */}
// //                 <div className="h-48 bg-slate-200 dark:bg-darkmode-700 overflow-hidden">
// //                   {agent.image ? (
// //                     <img
// //                       src={`http://localhost:5000/uploads/${agent.image}`}
// //                       alt={agent.name}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center">
// //                       <FiUser className="h-16 w-16 text-slate-400 dark:text-slate-500" />
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Agent Info */}
// //                 <div className="p-5">
// //                   <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-1">
// //                     {agent.name}
// //                   </h3>
// //                   <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
// //                     ID: {agent.agent_code}
// //                   </p>

// //                   <div className="space-y-2">
// //                     <div className="flex items-center text-slate-600 dark:text-slate-300">
// //                       <FiMail className="mr-2 text-primary" />
// //                       <span className="text-sm truncate">{agent.email}</span>
// //                     </div>
// //                     {agent.mobile && (
// //                       <div className="flex items-center text-slate-600 dark:text-slate-300">
// //                         <FiPhone className="mr-2 text-primary" />
// //                         <span className="text-sm">{agent.mobile}</span>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Action Buttons */}
// //                   <div className="flex mt-5 space-x-2">
// //                     <button
// //                       onClick={() => handleEdit(agent)}
// //                       className="btn btn-sm btn-outline-secondary flex-1"
// //                     >
// //                       <FiEdit className="mr-1" /> Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(agent.agent_id)}
// //                       className="btn btn-sm btn-outline-danger flex-1"
// //                     >
// //                       <FiTrash2 className="mr-1" /> Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default AgentList;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAgentSearchMutation } from "../services/agentApi";

// function AgentList() {
//   const [agentSearch, { data }] = useAgentSearchMutation();
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [editingAgent, setEditingAgent] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//   });
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     console.log("🔵 useEffect triggered → Fetching agents...");
//     fetchAgents();
//   }, []);

//   const fetchAgents = async () => {
//     try {
//       setLoading(true);
//       const payload = {
//         status: null,
//         search: null,
//         name: null,
//         email: null,
//         last_agent_id: null,
//         limit: 10,
//         sort_by: "name",
//         sort_order: "ASC",
//         client_id: 1,
//       };

//       console.log("🟡 Fetching agents with payload:", payload);
//       const res = await agentSearch(payload).unwrap();
//       console.log("🟢 Agents fetched successfully:", res);

//       setAgents(res);
//     } catch (err) {
//       console.error("🔴 Failed to fetch agents:", err);
//       setError("Failed to load agents. Please try again later.");
//     } finally {
//       setLoading(false);
//       console.log("⚪ Fetch agents completed");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       console.log("🟡 Deleting agent ID:", id);
//       await axios.delete(`${import.meta.env.VITE_BASE_URL}agents/${id}`);
//       console.log("🟢 Agent deleted successfully:", id);

//       setAgents(agents.filter((agent) => agent.agent_id !== id));
//     } catch (err) {
//       console.error("🔴 Failed to delete agent:", err);
//       setError("Failed to delete agent");
//     }
//   };

//   const handleEdit = (agent) => {
//     console.log("🟡 Editing agent:", agent);
//     setEditingAgent(agent.agent_id);
//     setFormData({
//       name: agent.name,
//       email: agent.email,
//       mobile: agent.mobile || "",
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("mobile", formData.mobile);
//       if (image) data.append("image", image);

//       console.log("🟡 Updating agent:", editingAgent, "with data:", formData);

//       const res = await axios.put(
//         `${import.meta.env.VITE_BASE_URL}agents/${editingAgent}`,
//         data
//       );

//       console.log("🟢 Agent updated successfully:", res.data);

//       setAgents(
//         agents.map((agent) =>
//           agent.agent_id === editingAgent ? res.data : agent
//         )
//       );
//       cancelEdit();
//     } catch (err) {
//       console.error("🔴 Failed to update agent:", err);
//       setError("Failed to update agent");
//     }
//   };

//   const cancelEdit = () => {
//     console.log("⚪ Cancel edit");
//     setEditingAgent(null);
//     setFormData({ name: "", email: "", mobile: "" });
//     setImage(null);
//   };

//   const handleChange = (e) => {
//     console.log(`✏️ Form change → ${e.target.name}: ${e.target.value}`);
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     console.log("⏳ Loading agents...");
//     return (
//       <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative inline-flex">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
//           </div>
//           <p className="mt-4 text-lg text-zinc-300 font-light tracking-wider">
//             LOADING NETWORK
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     console.warn("⚠️ Error UI shown:", error);
//     return (
//       <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
//         <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-800/50 text-red-300 px-6 py-4 rounded-xl max-w-md mx-auto backdrop-blur-sm">
//           <div className="flex items-center space-x-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//             <span>{error}</span>
//           </div>
//           <button
//             onClick={() => {
//               console.log("🔄 Retrying fetch...");
//               setError(null);
//               fetchAgents();
//             }}
//             className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 relative overflow-hidden pb-20">
//       {/* === Grid overlay and particles omitted for brevity === */}

//       <div className="relative z-10 container mx-auto px-4 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
//             <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
//               AGENT NETWORK
//             </span>
//           </h1>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
//             Manage our elite team of agents
//           </p>
//         </div>

//         {/* No Agents */}
//         {agents?.data?.length === 0 ? (
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300/50 p-12 text-center max-w-2xl mx-auto">
//             <h3 className="text-2xl font-medium text-gray-800 mb-2">
//               No Agents Found
//             </h3>
//             <p className="text-gray-500">
//               The network is currently empty. Add your first agent.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {agents?.data?.map((agent, index) => {
//               const imageUrl = `${import.meta.env.VITE_BASE_URL}uploads/${agent.image}`;
//               console.log("🖼️ Rendering agent:", agent.name, "Image URL:", imageUrl);

//               return (
//                 <div
//                   key={agent?.agent_id}
//                   className="relative group"
//                   onMouseEnter={() => setHoveredCard(index)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300/50 overflow-hidden">
//                     <div className="relative h-48 overflow-hidden">
//                       {agent.image ? (
//                         <img
//                           src={imageUrl}
//                           alt={agent.name}
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           onError={(e) =>
//                             console.error("🚫 Image failed to load:", imageUrl)
//                           }
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                           <span>No Image</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-6 flex-grow flex flex-col">
//                       <h3 className="text-xl font-bold text-gray-900 mb-1">
//                         {agent?.name}
//                       </h3>
//                       <span className="text-sm text-blue-500 font-mono mb-4">
//                         ID: {agent?.agent_code?.slice(-6)}
//                       </span>
//                       <p className="text-gray-700">{agent?.email}</p>
//                       <p className="text-gray-700">{agent?.mobile}</p>
//                       <div className="mt-6 flex space-x-2">
//                         <button
//                           onClick={() => handleEdit(agent)}
//                           className="flex-1 py-2 px-3 bg-gray-200 hover:bg-blue-400 text-gray-900 rounded-lg transition-all"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(agent?.agent_id)}
//                           className="flex-1 py-2 px-3 bg-gray-200 hover:bg-red-400 text-gray-900 rounded-lg transition-all"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AgentList;

import { useEffect, useState } from "react";
import axios from "axios";
import { useAgentSearchMutation } from "../services/agentApi";

function AgentList() {
    const [agentSearch, { data }] = useAgentSearchMutation();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [editingAgent, setEditingAgent] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log("🔵 useEffect triggered → Fetching agents...");
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            setLoading(true);
            const payload = {
                status: null,
                search: null,
                name: null,
                email: null,
                last_agent_id: null,
                limit: 10,
                sort_by: "name",
                sort_order: "ASC",
                client_id: 1,
            };

            console.log("🟡 Fetching agents with payload:", payload);
            const res = await agentSearch(payload).unwrap();
            console.log("🟢 Agents fetched successfully:", res);

            setAgents(res);
        } catch (err) {
            console.error("🔴 Failed to fetch agents:", err);
            setError("Failed to load agents. Please try again later.");
        } finally {
            setLoading(false);
            console.log("⚪ Fetch agents completed");
        }
    };

    // Not Completed
    const handleDelete = async (id) => {
        try {
            console.log("🟡 Deleting agent ID:", id);
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}agentDelete`,
                {
                    agent_id: id,
                },
                {
                    withCredentials: true,
                }
            );
            console.log("🟢 Agent deleted successfully:", id);

            setAgents(agents.filter((agent) => agent.agent_id !== id));
        } catch (err) {
            console.error("🔴 Failed to delete agent:", err);
            setError("Failed to delete agent");
        }
    };

    // Not Completed
    const handleEdit = (agent) => {
        console.log("🟡 Editing agent:", agent);
        setEditingAgent(agent.agent_id);
        setFormData({
            name: agent.name,
            email: agent.email,
            mobile: agent.mobile || "",
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("mobile", formData.mobile);
            if (image) data.append("image", image);

            console.log("🟡 Updating agent:", editingAgent, "with data:", formData);

            const res = await axios.put(
                `${import.meta.env.VITE_BASE_URL}agents/${editingAgent}`,
                data
            );

            console.log("🟢 Agent updated successfully:", res.data);

            setAgents(agents.map((agent) => (agent.agent_id === editingAgent ? res.data : agent)));
            cancelEdit();
        } catch (err) {
            console.error("🔴 Failed to update agent:", err);
            setError("Failed to update agent");
        }
    };

    const cancelEdit = () => {
        console.log("⚪ Cancel edit");
        setEditingAgent(null);
        setFormData({ name: "", email: "", mobile: "" });
        setImage(null);
    };

    const handleChange = (e) => {
        console.log(`✏️ Form change → ${e.target.name}: ${e.target.value}`);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) {
        console.log("⏳ Loading agents...");
        return (
            <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative inline-flex">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
                    </div>
                    <p className="mt-4 text-lg text-zinc-300 font-light tracking-wider">
                        LOADING NETWORK
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        console.warn("⚠️ Error UI shown:", error);
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-800/50 text-red-300 px-6 py-4 rounded-xl max-w-md mx-auto backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <button
                        onClick={() => {
                            console.log("🔄 Retrying fetch...");
                            setError(null);
                            fetchAgents();
                        }}
                        className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden pb-20">
            {/* === Grid overlay and particles omitted for brevity === */}

            <div className="relative z-10 container mx-auto px-4 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            AGENT NETWORK
                        </span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
                        Manage our elite team of agents
                    </p>
                </div>

                {/* No Agents */}
                {agents?.data?.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300/50 p-12 text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-medium text-gray-800 mb-2">No Agents Found</h3>
                        <p className="text-gray-500">
                            The network is currently empty. Add your first agent.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {agents?.data?.map((agent, index) => {
                            const imageUrl = `${import.meta.env.VITE_BASE_URL}uploads/${
                                agent.image
                            }`;
                            console.log("🖼️ Rendering agent:", agent.name, "Image URL:", imageUrl);

                            return (
                                <div
                                    key={agent?.agent_id}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300/50 overflow-hidden">
                                        <div className="relative h-48 overflow-hidden">
                                            {agent.image ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={agent.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onError={(e) =>
                                                        console.error(
                                                            "🚫 Image failed to load:",
                                                            imageUrl
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span>No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {agent?.name}
                                            </h3>
                                            <span className="text-sm text-blue-500 font-mono mb-4">
                                                ID: {agent?.agent_code?.slice(-6)}
                                            </span>
                                            <p className="text-gray-700">{agent?.email}</p>
                                            <p className="text-gray-700">{agent?.mobile}</p>
                                            <div className="mt-6 flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(agent)}
                                                    className="flex-1 py-2 px-3 bg-gray-200 hover:bg-blue-400 text-gray-900 rounded-lg transition-all"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(agent?.agent_id)}
                                                    className="flex-1 py-2 px-3 bg-gray-200 hover:bg-red-400 text-gray-900 rounded-lg transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AgentList;
