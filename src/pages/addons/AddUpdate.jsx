import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import ApiService from '../../services/ApiService';

const AddonForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [items, setItems] = useState([]);

  const [apiData, setApiData] = useState({
    title: "",
    title_ar: "",
    is_mandatory: false,
    min_selection: "",
    max_selection: "",
    items: [],
  });


  useEffect(() => {
    if (id) {
      getSingleData();
    }
    getItemsList();
  }, [id]);

  useEffect(() => {
    getItemsList();
  }, [search]);

  const getSingleData = async () => {
    try {
      setAppLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `addons/${id}`,
      });
      const data = response.data;
      if (data.status) {
        const item = data.data;
        setApiData({
          title: item.title,
          title_ar: item.title_ar,
          is_mandatory: item.is_mandatory,
          min_selection: item.min_selection,
          max_selection: item.max_selection,
          items: item.items,
        });
       
      } else {
        toast.error(data.message);
      }
      setAppLoader(false);
    } catch (error) {
      setAppLoader(false);
      console.log(error);
    }
  };


  const getItemsList = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `items-list`,
        data:{search}
      });
      const data = response.data;
      if (data.status) {
        setItems(data.data);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setApiData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  
  // Function to handle checkbox toggle
const handleAddonToggle = (item) => {
  setApiData((prevData) => {
    const exists = prevData.items.find((addon) => addon.item === item._id);

    if (exists) {
      // Remove item if unchecked
      return {
        ...prevData,
        items: prevData.items.filter((addon) => addon.item !== item._id),
      };
    } else {
      // Add item if checked
      return {
        ...prevData,
        items: [...prevData.items, { item: item._id, max_quantity: 1, is_free: false }],
      };
    }
  });
};
const handleMaxQuantityChange = (itemId, value) => {
  setApiData((prevData) => ({
    ...prevData,
    items: prevData.items.map((addon) =>
      addon.item === itemId ? { ...addon, max_quantity: Number(value) } : addon
    ),
  }));
};

// Function to toggle is_free checkbox
const handleIsFreeToggle = (itemId) => {
  setApiData((prevData) => ({
    ...prevData,
    items: prevData.items.map((addon) =>
      addon.item === itemId ? { ...addon, is_free: !addon.is_free } : addon
    ),
  }));
};

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const formData = new FormData();
      Object.entries(apiData).forEach(([key, value]) => {
        if (key === "items") {
          // Append addons separately as an array
          value.forEach((addon, index) => {
            formData.append(`items[${index}][item]`, addon.item);
            formData.append(`items[${index}][max_quantity]`, addon.max_quantity);
            formData.append(`items[${index}][is_free]`, addon.is_free);
          });
        }else{
          formData.append(key, value);
        }
      });
      // formData.append("old_image", apiData.old_image);

      const response = await ApiService.request({
        method: 'POST',
        url:  `addons/createOrUpdate/${id || ''}`,
        data:formData
      });
     
      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/addons");
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      console.error("Submit failed:", error);
      setIsLoader(false);
    }
  };



  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-xxl d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              {id ? "Edit" : "Add New"} Addon
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <a href="/dashboard" className="text-muted text-hover-primary">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                <a href="/addons" className="text-muted text-hover-primary">
                  Addons
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="app-container container-xxl">
          <div className="card">
            <div className="card-body pt-0">
              <form
                id="kt_modal_new_target_form"
                encType="multipart/form-data"
                method="POST"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={submitForm}
              >
                <div className="row g-9 my-3">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">Title</label>
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Enter Addon Title"
                      required
                      value={apiData.title}
                      name="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">Title Arabic</label>
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Enter Addon Title Ar"
                      required
                      value={apiData.title_ar}
                      name="title_ar"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6 fv-row fv-plugins-icon-container">
									    <label class="required fs-6 fw-semibold mb-2">Is Mnadatory</label>
                      <div class="form-check form-switch mt-2">
                          <input class="form-check-input" type="checkbox" name="is_mandatory"  checked={apiData.is_mandatory}
                          onChange={handleChange} id="flexSwitchCheckChecked" />
                      </div>
                  </div>
                  <div class="col-md-6 fv-row fv-plugins-icon-container">
									        <label class="required fs-6 fw-semibold mb-2">Min Selection </label>
                      <input type="number" class="form-control form-control-solid" placeholder="Enter Min Selection" name="min_selection" min="1"  value={apiData.min_selection}
                          onChange={handleChange}/>
                  </div>
                  <div class="col-md-6 fv-row fv-plugins-icon-container" id="maxField">
                      <label class="required fs-6 fw-semibold mb-2">Max Selection </label>
                      <input type="number" class="form-control form-control-solid" placeholder="Enter Max Selection" name="max_selection" min={apiData.min_selection}  value={apiData.max_selection}
                          onChange={handleChange} />
                  </div>
               
                </div>
                <h5 className="mt-15">Addon Items:</h5>
                <input type="text" value={search} onChange={e => setSearch( e.target.value)} 
                className="form-control form-control-solid me-5 w-lg-50 mb-3"     placeholder="Search Category or Item Name.."/>
                <div className="table-responsive">
                  <table className="table border align-middle table-hover fs-6 gy-5  fs-6">
                      <thead>
                        <tr className="fw-bold bg-light">
                          <th className="px-2">Mark to Add</th>
                          <th>Item</th>
                          <th>Max Quantity</th>
                          <th>Is Free</th>
                        </tr>
                      </thead>
                      <tbody>
                          {items.length > 0 ? items.map((item, index) => {
                            const isChecked = apiData.items.some((addon) => addon.item === item._id);
                            const selectedAddon = apiData.items.find((addon) => addon.item === item._id);

                            return (
                              <tr key={index}>
                                {/* Checkbox to add/remove addon */}
                                <td className="px-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input border-2"
                                    checked={isChecked}
                                    onChange={() => handleAddonToggle(item)}
                                  />
                                </td>

                                {/* Item Info */}
                                <td>
                                  <img
                                    src={item.image}
                                    alt="item"
                                    className="w-50px h-50px object-cover rounded bg-light me-2"
                                  />
                                  {item.title} - {currency + " " + item.discounted_price}
                                </td>

                                {/* Max Quantity Input */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder="Enter Max Quantity"
                                    className="p-2 form-control w-50"
                                    value={selectedAddon?.max_quantity || ""}
                                    onChange={(e) => handleMaxQuantityChange(item._id, e.target.value)}
                                    disabled={!isChecked} // Disable if not selected
                                  />
                                </td>

                                {/* Is Free Checkbox */}
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check-input border-2"
                                    checked={selectedAddon?.is_free || false}
                                    onChange={() => handleIsFreeToggle(item._id)}
                                    disabled={!isChecked} // Disable if not selected
                                  />
                                </td>
                              </tr>
                            );
                          }) : (
                            <tr>
                              <td colSpan="4" className="text-dark text-center mt-2">No data found!</td>
                            </tr>
                          )}
                      </tbody>
                   
                  </table>
                </div>

                {/* Form Actions */}
                <div className="row g-9 my-3">
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-light me-3"
                      onClick={() => navigate("/addons")}
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-base" disabled={isLoader}>
                      {isLoader ? (
                        <Loader size="20" text="Submitting" />
                      ) : (
                        "Submit"
                      )}
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

export default AddonForm;
