import {
    Lucide,
    Tippy,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
    Modal,
    ModalBody,
} from "@/base-components";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { propertyApi } from "../../api/propertyApi.js";
import { useDispatch } from "react-redux";

// temporary imports
import image1 from "../../assets/images/p-1.jpg";
import image2 from "../../assets/images/p-2.jpg";
import image3 from "../../assets/images/p-3.jpg";
import { setProperty } from "../../stores/slices/propertySlice.js";

function Main() {
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            fetchPage({ search: searchQuery });
        }
        // You can access other properties of the event object, like event.keyCode, event.code, etc.
    };

    // Fetch a specific page
    const fetchPage = async (data = {}) => {
        setLoading(true);
        setError(null);

        const payload = {
            filters: { status: null, location: null, type: null, agent_email: null },
            search: null,
            client_id: 1,
            title: null,
            location_search: null,
            last_property_id: null,
            limit: 20,
        };

        const OriginalPayload = { ...payload, ...data };
        console.log(`Original Payload data:-`, OriginalPayload);

        try {
            const result = await propertyApi.propertySearch(OriginalPayload);

            setProperties(result?.data);
            setSearchQuery("");
            dispatch(setProperty(result?.data));

            console.log(`Property fetch Successfully ✅`);
        } catch (err) {
            setError(err);
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage();
    }, []);

    const handleEdit = (e, id) => {
        console.log("handle edit run....");
        e.preventDefault();
        navigate(`/dashboard/edit-property/${id}`);
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-5">
                <svg
                    className="w-16 h-16 text-red-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Something went wrong
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Please try again later.
                </p>
                <button
                    onClick={fetchPage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            {loading ? (
                <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
                    <p className="text-2xl font-semibold text-[#312E81]">Please Wait</p>
                    <p className="font-medium text-lg text-gray-400">Loading...</p>
                </div>
            ) : (
                <>
                    <h2 className="intro-y text-lg font-medium mt-10">Product List</h2>
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                            <button className="btn btn-primary shadow-md mr-2">
                                Add New Product
                            </button>
                            <Dropdown>
                                <DropdownToggle className="btn px-2 box">
                                    <span className="w-5 h-5 flex items-center justify-center">
                                        <Lucide icon="Plus" className="w-4 h-4" />
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu className="w-40">
                                    <DropdownContent>
                                        <DropdownItem>
                                            <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Lucide icon="FileText" className="w-4 h-4 mr-2" />{" "}
                                            Export to Excel
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Lucide icon="FileText" className="w-4 h-4 mr-2" />{" "}
                                            Export to PDF
                                        </DropdownItem>
                                    </DropdownContent>
                                </DropdownMenu>
                            </Dropdown>
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing 1 to 10 of 150 entries
                            </div>
                            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                                <div className="w-56 relative text-slate-500">
                                    <input
                                        type="text"
                                        className="form-control w-56 box pr-10"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <Lucide
                                        icon="Search"
                                        className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* BEGIN: Data List -*/}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                            <table className="table table-report -mt-2">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap">IMAGES</th>
                                        <th className="whitespace-nowrap">AGENT NAME</th>
                                        <th className="text-center whitespace-nowrap">
                                            PROPERTY TYPE
                                        </th>
                                        <th className="text-center whitespace-nowrap">PRICE</th>
                                        <th className="text-center whitespace-nowrap">STATUS</th>
                                        <th className="text-center whitespace-nowrap">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.length <= 0 ? (
                                        <span className="font-semibold text-blue-500 text-center text-lg">
                                            Nothing Found...
                                        </span>
                                    ) : (
                                        <>
                                            {properties.map((p) => (
                                                <tr key={p?.property_id} className="intro-x">
                                                    <td className="w-40">
                                                        <div className="flex">
                                                            <div className="w-10 h-10 image-fit zoom-in">
                                                                <Tippy
                                                                    tag="img"
                                                                    alt="Midone Tailwind HTML Admin Template"
                                                                    className="rounded-full"
                                                                    src={image1}
                                                                />
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <Tippy
                                                                    tag="img"
                                                                    alt="Midone Tailwind HTML Admin Template"
                                                                    className="rounded-full"
                                                                    src={image2}
                                                                />
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <Tippy
                                                                    tag="img"
                                                                    alt="Midone Tailwind HTML Admin Template"
                                                                    className="rounded-full"
                                                                    src={image3}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href=""
                                                            className="font-medium whitespace-nowrap"
                                                        >
                                                            {p?.agent_name}
                                                        </a>
                                                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                            {p?.property_category}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {p?.property_type}
                                                    </td>
                                                    <td className="text-center">${p?.price}</td>
                                                    <td className="w-40">
                                                        <div
                                                            className={classnames({
                                                                "flex items-center justify-center": true,
                                                            })}
                                                        >
                                                            <Lucide
                                                                icon="CheckSquare"
                                                                className="w-4 h-4 mr-2"
                                                            />

                                                            {p?.availability}
                                                        </div>
                                                    </td>
                                                    <td className="table-report__action w-56">
                                                        <div className="flex justify-center items-center">
                                                            <p
                                                                onClick={(e) =>
                                                                    handleEdit(e, p?.property_id)
                                                                }
                                                                className="flex items-center mr-3 cursor-pointer"
                                                            >
                                                                <Lucide
                                                                    icon="CheckSquare"
                                                                    className="w-4 h-4 mr-1"
                                                                />{" "}
                                                                Edit
                                                            </p>
                                                            <a
                                                                className="flex items-center text-danger"
                                                                href="#"
                                                                onClick={() => {
                                                                    setDeleteConfirmationModal(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <Lucide
                                                                    icon="Trash2"
                                                                    className="w-4 h-4 mr-1"
                                                                />{" "}
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* BEGIN: Delete Confirmation Modal -*/}
                    <Modal
                        show={deleteConfirmationModal}
                        onHidden={() => {
                            setDeleteConfirmationModal(false);
                        }}
                    >
                        <ModalBody className="p-0">
                            <div className="p-5 text-center">
                                <Lucide
                                    icon="XCircle"
                                    className="w-16 h-16 text-danger mx-auto mt-3"
                                />
                                <div className="text-3xl mt-5">Are you sure?</div>
                                <div className="text-slate-500 mt-2">
                                    Do you really want to delete these records? <br />
                                    This process cannot be undone.
                                </div>
                            </div>
                            <div className="px-5 pb-8 text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDeleteConfirmationModal(false);
                                    }}
                                    className="btn btn-outline-secondary w-24 mr-1"
                                >
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger w-24">
                                    Delete
                                </button>
                            </div>
                        </ModalBody>
                    </Modal>
                    {/* END: Delete Confirmation Modal -*/}
                </>
            )}
        </div>
    );
}

export default Main;
