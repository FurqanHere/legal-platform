import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import ApiService from '../../services/ApiService';

const RoleForm = () => {
    const [isLoader, setIsLoader] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPermissions();
    }, []);

    const getPermissions = async () => {
        try {
            setIsLoader(true);
            const response = await ApiService.request({
                method: "GET",
                url: `role-permissions/${id || ''}`,
            });
            const data = response.data;
            if (data.status) {
                setName(data.data.role?.name || '');
                setPermissions(data.data.permissions);
            } else {
                toast.error(data.message);
            }
            setIsLoader(false);
        } catch (error) {
            setIsLoader(false);
            console.log(error);
        }
    };

    const toggleParent = (index) => {
        const updatedPermissions = [...permissions];
        const parent = updatedPermissions[index];
        parent.isParentChecked = !parent.isParentChecked;
        parent.items.forEach((item) => {
            item.isChecked = parent.isParentChecked;
        });
        setPermissions(updatedPermissions);
    };

    const checkAllSelected = (index) => {
        const updatedPermissions = [...permissions];
        const parent = updatedPermissions[index];
        const allSelected = parent.items.every((item) => item.isChecked);
        parent.isParentChecked = allSelected;
        setPermissions(updatedPermissions);
    };

    const handlePermissionChange = (tabIndex, pIndex) => {
        const updatedPermissions = [...permissions];
        updatedPermissions[tabIndex].items[pIndex].isChecked = !updatedPermissions[tabIndex].items[pIndex].isChecked;
        setPermissions(updatedPermissions);
        checkAllSelected(tabIndex);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoader(true);
        try {
            const response = await ApiService.request({
                method: "POST",
                url: `roles/createOrUpdate/${id || ''}`,
                data: { name, permissions }
            });
            const data = response.data;
            if (data.status) {
                toast.success(data.message);
                navigate('/roles');
            } else {
                toast.error(data.message);
            }
            setIsLoader(false);
        } catch (error) {
            console.error('Submission failed:', error);
            setIsLoader(false);
        }
    };

    return (
        <div className="d-flex flex-column flex-column-fluid">
            {/* Toolbar */}
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            {id ? 'Edit' : 'Add New'} Role
                        </h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <Link to="/dashboard" className="text-muted text-hover-primary">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-400 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted">
                                <Link to="/roles" className="text-muted text-hover-primary">Roles</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card">
                        <div className="card-body pt-0">
                            <form id="kt_modal_new_target_form" className="form" onSubmit={submitForm}>
                                <div className="row g-9 my-3">
                                    <div className="col-md-12 fv-row">
                                        <label className="required fs-6 fw-semibold mb-2">Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-solid"
                                            placeholder="Enter Role Name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <h4 className="py-3 my-3">Permissions:</h4>

                                {permissions.length > 0 ? (
                                    <Accordion>
                                        {permissions.map((tab, index) => (
                                            <AccordionTab 
                                                key={index} 
                                                header={
                                                    <label className='text-uppercase fw-semibold text-dark fs-6'>
                                                        <input
                                                            type="checkbox"
                                                            id={`perm-parent-${index}`}
                                                            className="perm-dashboard  mx-3"
                                                            checked={tab.isParentChecked || false}
                                                            onChange={() => toggleParent(index)}
                                                        />
                                                        {tab.parent || `Permission Group ${index + 1}`}
                                                    </label>
                                                }
                                            >
                                                <div className="p-3">
                                                    {tab.items.map((item, pIndex) => (
                                                        <p className="perm-input ms-5" key={pIndex}>
                                                            <label htmlFor={`perm-${item.name}`}>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`perm-${item.name}`}
                                                                    className="perm-dashboard me-3"
                                                                    checked={item.isChecked || false}
                                                                    onChange={() => handlePermissionChange(index, pIndex)}
                                                                />
                                                                {item.name}
                                                            </label>
                                                        </p>
                                                    ))}
                                                </div>
                                            </AccordionTab>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <p>No permissions available</p>
                                )}

                                <div className="row g-9 my-3">
                                    <div className="text-center">
                                        <Link to="/roles" id="kt_modal_new_target_cancel" className="btn btn-light me-3">
                                            Back
                                        </Link>
                                        <button type="submit" className="btn btn-base" disabled={isLoader}>
                                            {isLoader ? <Loader size={20} text="Submitting" /> : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleForm;