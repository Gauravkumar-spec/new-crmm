import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Lucide, Modal, ModalBody } from "@/base-components";
import { agentApi } from "../api/agentApi.js";
import { agentValidationSchema } from "../utils/validationSchemas/agentSchema.js";
import { Formik, Form, Field, ErrorMessage } from "formik";

function EditAgent() {
    const { agentName } = useParams();
    console.log("Agent ID: ", agentName);
    const navigate = useNavigate();
    const [agent, setAgent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saveModal, setSaveModal] = useState(false);

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await agentApi.agentPreview({
                    name: agentName,
                    client_id: 1,
                });

                console.log("Fetch Agent:- ", response.data[0]);
                if (response.data) {
                    setAgent(response.data[0]);

                    if (response.data[0].image) {
                        setPreviewImage(
                            `${import.meta.env.VITE_BASE_URL}uploads/${response.data[0].image}`
                        );
                    }
                }
            } catch (err) {
                console.error("Failed to fetch agent", err);
                setError(err)
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [agentName]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async (values, { setSubmitting }) => {
        try {
            const updateData = new FormData();
            updateData.append("name", values?.name);
            updateData.append("email", values?.email);
            updateData.append("mobile", values?.mobile);
            updateData.append("city", values?.city);
            updateData.append("area", values?.area);
            updateData.append("agent_id", agent?.agent_id);
            updateData.append("client_id", 1);
            if (image) {
                updateData.append("image", values?.image);
            }

            const response = await agentApi.agentUpdate(updateData);

            console.log("Agent updated: ", response);

            navigate("/dashboard/agentslist");
        } catch (err) {
            console.error("Failed to update agent", err);
            setSaveModal(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative inline-flex">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
                    </div>
                    <p className="mt-4 text-lg text-blue-500 font-semibold tracking-wider">
                        LOADING AGENT DETAILS
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-800/50 text-red-300 px-6 py-4 rounded-xl max-w-md mx-auto backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <Lucide icon="XCircle" className="h-6 w-6" />
                        <span>Failed to load agent data</span>
                    </div>
                    <Link
                        to="/dashboard/agentslist"
                        className="mt-3 text-gray-200 hover:text-cyan-300 text-sm inline-block"
                    >
                        Back to Agents
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="intro-y flex items-center mt-8">
                <h2 className="text-lg font-medium mr-auto text-white">Edit Agent</h2>
                <Link to="/dashboard/agentslist" className="btn btn-outline-secondary">
                    <Lucide icon="ArrowLeft" className="w-4 h-4 mr-2 text-gray-200" /> Back to
                    Agents
                </Link>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
                    <div className="intro-y box p-5">
                        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide icon="Edit3" className="w-4 h-4 mr-2" />
                                Agent Information
                            </div>
                            <Formik
                                initialValues={{
                                    name: agent?.name || "",
                                    email: agent?.email || "",
                                    mobile: agent?.mobile || "",
                                    city: agent?.city || "",
                                    area: agent?.area || "",
                                    image: agent?.image || null, // File input
                                }}
                                validationSchema={agentValidationSchema}
                                context={{
                                    isEdit: !!agent?.agent_id,
                                }}
                                onSubmit={handleSave}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form className="mt-5">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="name" className="form-label">
                                                    Name
                                                </label>
                                                <Field
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Agent Name"
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="mobile" className="form-label">
                                                    Mobile
                                                </label>
                                                <Field
                                                    id="mobile"
                                                    name="mobile"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Mobile Number"
                                                />
                                                <ErrorMessage
                                                    name="mobile"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="city" className="form-label">
                                                    City
                                                </label>
                                                <Field
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="city"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="area" className="form-label">
                                                    Area
                                                </label>
                                                <Field
                                                    id="area"
                                                    name="area"
                                                    type="text"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="area"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="image" className="form-label">
                                                    Profile Image
                                                </label>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    disabled={true}
                                                    className="form-control"
                                                    onChange={(event) => {
                                                        setFieldValue(
                                                            "image",
                                                            event.currentTarget.files[0]
                                                        );
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="image"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-8">
                                            <Link
                                                to="/dashboard/agentslist"
                                                className="btn btn-outline-secondary w-24 mr-2"
                                            >
                                                Cancel
                                            </Link>
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-24"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Updating..." : "Update"}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

                {/* Agent Summary */}
                <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
                    <div className="intro-y box p-5">
                        <div className="flex flex-col items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                            <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center overflow-hidden mb-4">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Agent Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : agent?.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_BASE_URL}uploads/${
                                            agent?.image
                                        }`}
                                        alt={agent?.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Lucide icon="User" className="w-12 h-12" />
                                )}
                            </div>
                            <div className="text-center">
                                <div className="font-medium text-base">{agent?.name}</div>
                                <div className="text-slate-500">Agent ID: {agent?.agent_code}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Lucide icon="Phone" className="w-4 h-4 text-slate-500 mr-2" />
                                <div>{agent?.mobile || "Not provided"}</div>
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Mail" className="w-4 h-4 text-slate-500 mr-2" />
                                <div>{agent?.email || "Not provided"}</div>
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Star" className="w-4 h-4 text-slate-500 mr-2" />
                                <div>{agent?.city || "Not provided"}</div>
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Star" className="w-4 h-4 text-slate-500 mr-2" />
                                <div>{agent?.area || "Not provided"}</div>
                            </div>

                            <div className="flex items-center">
                                <Lucide icon="Star" className="w-4 h-4 text-slate-500 mr-2" />
                                <div className="capitalize">{agent?.status || "Active"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditAgent;
