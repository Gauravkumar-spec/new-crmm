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
import { useEffect, useRef, useState } from "react";
import { useLeadSearchMutation } from "../services/leadApi";

function Main() {
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [leadSearch] = useLeadSearchMutation();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");

    const handleKeyDown = (event) => {
        if(event.key == "Enter"){
          fetchLead({"search": searchQuery})
        }
        // You can access other properties of the event object, like event.keyCode, event.code, etc.
    };

    const fetchLead = async (data = {}) => {
        setLoading(true);
        const payload = {
            search: null,
            client_id: 1,
            lead_id: null,
            name: "First lead",
            mobile: null,
            email: null,
            budget_min: null,
            budget_max: null,
            preferred_location: null,
            property_type: null,
            status: null,
            assigned_agent: null,
            source: null,
            last_lead_id: null,
            limit: 15,
            sort_by: "created_at",
            sort_order: "DESC",
        };

        const OriginalPayload = { ...payload, ...data };
        console.log(`Original Payload data:-`, OriginalPayload);

        try {
            const response = await leadSearch(OriginalPayload).unwrap();
            console.log(`Response after fetching:-`, response.data);

            setLeads(response.data);
        } catch (error) {
            console.log(`Failed to fetch lead , ${error}`);
            setError("Failed to fetch leads, try again");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLead();
    }, []);

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
                        onClick={async () => {
                            console.log("🔄 Retrying fetch...");
                            setError(null);
                            await fetchLead();
                        }}
                        className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        console.log("⏳ Loading agents...");
        return (
            <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative inline-flex">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
                    </div>
                    <p className="mt-4 text-lg text-blue-500 font-semibold tracking-wider">
                        LOADING LEADS
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="intro-y text-lg font-medium mt-10">Seller List</h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                    <button className="btn btn-primary shadow-md mr-2">Add New Seller</button>
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
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                                    Excel
                                </DropdownItem>
                                <DropdownItem>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                                    PDF
                                </DropdownItem>
                            </DropdownContent>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="hidden xl:block mx-auto text-slate-500">
                        Showing 1 to 10 of 150 entries
                    </div>
                    <div className="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
                        <div className="w-56 relative text-slate-500">
                            <input
                                onKeyDown={handleKeyDown}
                                type="text"
                                className="form-control w-56 box pr-10"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Lucide
                                icon="Search"
                                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                            />
                        </div>
                        <select className="w-56 xl:w-auto form-select box ml-2">
                            <option>Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>
                {/* BEGIN: Data List */}
                <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">
                                    <input className="form-check-input" type="checkbox" />
                                </th>
                                <th className="whitespace-nowrap">SELLER</th>
                                <th className="text-center whitespace-nowrap">MOBILE</th>
                                <th className="text-center whitespace-nowrap">SOURCE</th>
                                <th className="text-center whitespace-nowrap">STATUS</th>
                                <th className="text-center whitespace-nowrap">BUDGET-(MAX)</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead?.lead_id} className="intro-x">
                                    <td className="w-10">
                                        <input className="form-check-input" type="checkbox" />
                                    </td>
                                    <td className="!py-3.5">
                                        <div className="flex items-center">
                                            {/* <div className="w-9 h-9 image-fit zoom-in">
                                                <Tippy
                                                    tag="img"
                                                    alt="Midone - HTML Admin Template"
                                                    className="rounded-lg border-white shadow-md"
                                                    src={lead}
                                                    content={`Uploaded at ${faker.dates[0]}`}
                                                />
                                            </div> */}
                                            <div className="ml-4">
                                                <a
                                                    href=""
                                                    className="font-medium whitespace-nowrap"
                                                >
                                                    {lead?.name}
                                                </a>
                                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                    {lead?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">{lead?.mobile}</td>
                                    <td className="text-center capitalize">{lead?.source}</td>
                                    <td className="w-40 text-center">{lead?.status}</td>
                                    <td className="text-center">Rs. {lead?.budget_max}</td>
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            <a className="flex items-center mr-3" href="#">
                                                <Lucide
                                                    icon="CheckSquare"
                                                    className="w-4 h-4 mr-1"
                                                />{" "}
                                                Edit
                                            </a>
                                            <a
                                                className="flex items-center text-danger"
                                                href="#"
                                                onClick={() => {
                                                    setDeleteConfirmationModal(true);
                                                }}
                                            >
                                                <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                                                Delete
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* END: Data List */}
                {/* BEGIN: Pagination */}
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    <nav className="w-full sm:w-auto sm:mr-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    ...
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    ...
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <select className="w-20 form-select box mt-3 sm:mt-0">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div>
                {/* END: Pagination */}
            </div>
            {/* BEGIN: Delete Confirmation Modal */}
            <Modal
                show={deleteConfirmationModal}
                onHidden={() => {
                    setDeleteConfirmationModal(false);
                }}
            >
                <ModalBody className="p-0">
                    <div className="p-5 text-center">
                        <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
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
            {/* END: Delete Confirmation Modal */}
        </>
    );
}

export default Main;
