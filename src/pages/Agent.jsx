// import { useState, useRef } from "react";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useSetAgentMutation } from "../services/agentApi";
// import { agentValidationSchema } from "../utils/validationSchemas/agentSchema";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// function Agent() {
//   const navigate = useNavigate();
//   const [setAgent] = useSetAgentMutation();
//   const [image, setImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const fileInputRef = useRef(null);

//   const initialValues = {
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//     city: "",
//     area: "",
//     profile: "",
//   };

//   // Form submission
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     console.log(values, "form values");
//     try {
//       // let imageUrl = "";
//       // if (values.profile) {
//       //   imageUrl = await new Promise((resolve, reject) => {
//       //     const reader = new FileReader();
//       //     reader.onloadend = () => resolve(reader.result); // Base64 string
//       //     reader.onerror = reject;
//       //     reader.readAsDataURL(values.profile);
//       //   });
//       // }

//       const payload = {
//         client_id: 1,
//         name: values.name,
//         email: values.email,
//         mobile: values.mobile,
//         address: values.address,
//         city: values.city,
//         area: values.area,
//         // profile_photo_url: imageUrl, // send Base64 as URL
//       };
//       const res = await setAgent(payload).unwrap();
//       console.log(res, "response from setAgent");
//       if (res?.message) {
//         toast.success("Agent saved successfully!", {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "dark",
//         });
//         resetForm();
//         setCurrentStep(1);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = "";
//         }
//         setTimeout(() => {
//           navigate("/agentlist");
//         }, 1000);
//       }
//     } catch (err) {
//       console.error("Error adding agent:", err);
//       toast.error(err?.data?.message || "Failed to register agent.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "dark",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-darkmode-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex items-center mt-8 mb-8">
//         <h2 className="intro-y text-lg font-medium mr-auto">Agent Registration</h2>
//       </div>
      
//       <div className="intro-y box py-10 sm:py-20 mt-5">
//         {/* Progress Steps */}
//         <div className="relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
//           {/* Step 1 */}
//           <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
//             <button className={`w-10 h-10 rounded-full btn ${currentStep >= 1 ? 'btn-primary' : 'text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400'}`}>
//               1
//             </button>
//             <div className={`lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto ${currentStep >= 1 ? 'font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
//               Personal Information
//             </div>
//           </div>
//           {/* Step 2 */}
//           <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
//             <button className={`w-10 h-10 rounded-full btn ${currentStep >= 2 ? 'btn-primary' : 'text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400'}`}>
//               2
//             </button>
//             <div className={`lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto ${currentStep >= 2 ? 'font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
//               Profile Setup
//             </div>
//           </div>
//         </div>

//         <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={agentValidationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting, values, setFieldValue, errors, touched }) => (
//               <Form>
//                 {/* Step 1: Personal Information */}
//                 {currentStep === 1 && (
//                   <div>
//                     <div className="font-medium text-base">Personal Information</div>
//                     <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
//                       {[
//                         { id: "name", label: "Name", type: "text", placeholder: "John Doe" },
//                         { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
//                         { id: "mobile", label: "Mobile", type: "text", placeholder: "Enter 10-digit mobile number" },
//                         { id: "address", label: "Address", type: "text", placeholder: "123 Main Street" },
//                         { id: "city", label: "City", type: "text", placeholder: "New York" },
//                         { id: "area", label: "Area", type: "text", placeholder: "Manhattan" },
//                       ].map((field) => (
//                         <div key={field.id} className="intro-y col-span-12 sm:col-span-6">
//                           <label htmlFor={field.id} className="form-label">
//                             {field.label}
//                           </label>
//                           <Field
//                             type={field.type}
//                             id={field.id}
//                             name={field.id}
//                             className="form-control"
//                             placeholder={field.placeholder}
//                           />
//                           <ErrorMessage
//                             name={field.id}
//                             component="div"
//                             className="text-red-500 text-xs mt-1"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
//                       <button
//                         type="button"
//                         onClick={() => setCurrentStep(2)}
//                         className="btn btn-primary w-24"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 2: Profile Setup */}
//                 {currentStep === 2 && (
//                   <div>
//                     <div className="font-medium text-base">Profile Setup</div>
//                     <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
//                       <div className="intro-y col-span-12">
//                         <label className="form-label">Profile Photo</label>
//                         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
//                           <div
//                             className={`relative w-32 h-32 rounded-full overflow-hidden border-2 ${
//                               values.profile
//                                 ? "border-primary"
//                                 : "border-dashed border-slate-300"
//                             } bg-slate-100 flex items-center justify-center cursor-pointer`}
//                             onClick={() => fileInputRef.current?.click()}
//                           >
//                             {values.profile ? (
//                               <img
//                                 src={
//                                   typeof values.profile === "string"
//                                     ? values.profile
//                                     : URL.createObjectURL(values.profile)
//                                 }
//                                 alt="Profile preview"
//                                 className="absolute inset-0 w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="text-center p-4">
//                                 <svg
//                                   className="w-10 h-10 mx-auto text-slate-400"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="1.5"
//                                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                                   ></path>
//                                 </svg>
//                                 <span className="text-xs text-slate-500 mt-1">
//                                   Click to upload
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-sm text-slate-700 mb-2">
//                               Upload a professional headshot (JPG or PNG, max 5MB)
//                             </p>
//                             <p className="text-xs text-slate-500">
//                               Recommended size: 500x500 pixels
//                             </p>
//                             <input
//                               type="file"
//                               name="profile"
//                               ref={fileInputRef}
//                               onChange={(e) => {
//                                 const file = e.target.files?.[0];
//                                 if (file) {
//                                   setFieldValue("profile", file);
//                                 }
//                               }}
//                               accept="image/*"
//                               className="hidden"
//                             />
//                             {values.profile && (
//                               <button
//                                 type="button"
//                                 onClick={() => setFieldValue("profile", "")}
//                                 className="mt-3 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg flex items-center"
//                               >
//                                 Remove photo
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
//                       <button
//                         type="button"
//                         onClick={() => setCurrentStep(1)}
//                         className="btn btn-secondary w-24"
//                       >
//                         Previous
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="btn btn-primary w-24 ml-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Saving...
//                           </>
//                         ) : (
//                           "Submit"
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Agent;


















import { useState, useRef } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSetAgentMutation } from "../services/agentApi";
import { agentValidationSchema } from "../utils/validationSchemas/agentSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Agent() {
  const navigate = useNavigate();
  const [setAgent] = useSetAgentMutation();
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    bio: "",
    languages: [],
    licenseNumber: "",
    socialMedia: {
      facebook: "",
      linkedin: "",
      instagram: "",
    },
  });

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    area: "",
    profile: "",
  };

  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested social media fields
    if (name.startsWith("socialMedia.")) {
      const socialMediaField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialMediaField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle language addition
  const handleAddLanguage = () => {
    if (selectedLanguage && !formData.languages.includes(selectedLanguage)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, selectedLanguage],
      }));
      setSelectedLanguage("");
    }
  };

  // Handle language removal
  const handleRemoveLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== language),
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      console.log("🟡 Step 1: Raw Formik Values =>", values);
    console.log(values, "form values");
    try {
        // let imageUrl = "";
        // if (values.profile) {
        //   console.log("🟡 Step 2: Profile file selected =>", values.profile);

        //   imageUrl = await new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.onloadend = () =>{
        //         console.log("🟡 Step 3: Converted Base64 =>", reader.result?.slice(0, 50) + "...");
        //     resolve(reader.result); // Base64 string
        //     }
        //     reader.onerror = reject;
        //     reader.readAsDataURL(values.profile);
        //   });
        // }

      const payload = {
        client_id: 1,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        address: values.address,
        city: values.city,
        area: values.area,
        // profile_photo_url: "abc.png", // send Base64 as URL
      };

      console.log("🟡 Step 4: Final Payload =>", payload);

      const res = await setAgent(payload).unwrap();
      console.log(res, "response from setAgent");
       console.log("✅ Step 5: API Response =>", res);
      if (res?.message) {
        toast.success("Lead saved successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        resetForm();
        setCurrentStep(1);
        setErrorMessage("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setTimeout(() => {
          navigate("/agentlist");
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Step 6: API Error =>", err);
      setErrorMessage(err?.data?.message || "Failed to register agent.");
    } finally {
       console.log("🟡 Step 7: Finished submission cycle");
      setSubmitting(false);
    }
  };

  // Progress steps
  const steps = [
    { id: 1, name: "Personal Info" },
    // { id: 2, name: 'Professional Details' },
    { id: 2, name: "Profile Setup" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 flex items-center justify-center">
      {/* Background elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-300 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-purple-300 filter blur-3xl"></div>
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-4xl z-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl border border-gray-300 shadow-xl overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-gray-300">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-400 rounded-xl transform rotate-45 shadow-lg"></div>
                <svg
                  className="absolute inset-0 m-auto text-white w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Agent Registration
              </h1>
              <p className="text-center text-gray-600">
                Join our network of professional real estate agents
              </p>
            </div>

            {/* Progress steps */}
            <div className="flex justify-between mb-8">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.id
                        ? "border-blue-400 bg-blue-100"
                        : "border-gray-300"
                    } transition-all`}
                  >
                    {currentStep > step.id ? (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      <span
                        className={`font-medium ${
                          currentStep >= step.id
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      currentStep >= step.id ? "text-blue-400" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Status messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 flex items-center">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 flex items-center">
                {errorMessage}
              </div>
            )}

            {/* Multi-step form */}
            <Formik
              initialValues={initialValues}
              validationSchema={agentValidationSchema}
              onSubmit={handleSubmit}
            >

              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          "name",
                          "email",
                          "mobile",
                          "address",
                          "city",
                          "area",
                        ].map((field) => (
                          <div key={field}>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              {field.charAt(0).toUpperCase() + field.slice(1)}*
                            </label>
                            <Field
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              placeholder={
                                field === "mobile"
                                  ? "Enter 10-digit mobile number"
                                  : field
                              }
                              className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg flex items-center transition-colors"
                        >
                          Next
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Profile Setup */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Profile Setup
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Profile Photo*
                          </label>
                          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div
                              className={`relative w-32 h-32 rounded-full overflow-hidden border-2 ${
                                values.image
                                  ? "border-blue-400"
                                  : "border-dashed border-gray-300"
                              } bg-gray-200 flex items-center justify-center cursor-pointer`}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              {values.profile ? (
                                <img
                                  src={
                                    typeof values.profile === "string"
                                      ? values.profile
                                      : URL.createObjectURL(values.profile)
                                  }
                                  alt="Profile preview"
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center p-4">
                                  <svg
                                    className="w-10 h-10 mx-auto text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.5"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                  </svg>
                                  <span className="text-xs text-gray-500 mt-1">
                                    Click to upload
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700 mb-2">
                                Upload a professional headshot (JPG or PNG, max
                                5MB)
                              </p>
                              <p className="text-xs text-gray-500">
                                Recommended size: 500x500 pixels
                              </p>
                             
                              {values.profile && (
                                <button
                                  type="button"
                                  onClick={() => setFieldValue("profile", "")}
                                  className="mt-3 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded-lg flex items-center"
                                >
                                  Remove photo
                                </button>
                              )}
                              {/* <ErrorMessage
                                name="profile"
                                component="div"
                                className="text-red-400 text-sm mt-1"
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-6">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            ></path>
                          </svg>
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden relative group ${
                            isSubmitting
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-400 to-purple-400 hover:shadow-lg hover:shadow-blue-300/20"
                          }`}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting
                              ? "Processing..."
                              : "Complete Registration"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Agent;
