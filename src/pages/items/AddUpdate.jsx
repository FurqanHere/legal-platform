import React, { useState, useEffect , useRef} from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import ApiService from '../../services/ApiService';
import { Dropdown } from "primereact/dropdown";
import ImageUpload from '../../components/ImageUpload';
import { MultiSelect } from "primereact/multiselect";

const ItemForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(false);
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [categories, setCategories] = useState([]);
  const [addons, setAddons] = useState([]);
  const [flavors, setFlavors] = useState([]);

  const flavorInputRef = useRef(null);



  const [apiData, setApiData] = useState({
    title: "",
    title_ar: "",
    original_price: "",
    discounted_price: "",
    categories: [],
    combos: [],
    addons: [],
    combos: [],
    description: "",
    description_ar: "",
    old_image: '',
  });


  useEffect(() => {
    if (id) {
      getSingleData();
    }
    getCategoriesList();
    getAddonsList();
    getFlavorsList();

  }, [id]);

  const getSingleData = async () => {
    try {
      setAppLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `items/${id}`,
      });
      const data = response.data;
      if (data.status) {
        const item = data.data;
        setApiData({
          title: item.title,
          title_ar: item.title_ar,
          original_price: item.original_price,
          discounted_price: item.discounted_price,
          categories: item.categories,
          addons: item.addons,
          combos: item.combos ?? [],
          description: item.description ?? "",
          description_ar: item.description_ar ?? "",
          image: item.image ?? '',
          old_image: item.image ?? '',
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



  const getCategoriesList = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `categories-list`,
      });
      const data = response.data;
      if (data.status) {
        setCategories(data.data);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };

  const getAddonsList = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `addons-list`,
      });
      const data = response.data;
      if (data.status) {
        setAddons(data.data);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };

  const getFlavorsList = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `flavors-list`,
      });
      const data = response.data;
      if (data.status) {
        setFlavors(data.data);
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
    const { name, value } = e.target;
    setApiData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (name, file) => {
    setApiData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };

    // Handle input change for flavor fields
  const handleComboChange = (index, e) => {
    const { name, value } = e.target;
    setApiData(prev => {
      const updatedFlavors = [...prev.combos];
      updatedFlavors[index] = { ...updatedFlavors[index], [name]: value };
      return { ...prev, combos: updatedFlavors };
    });
  };

  // Add a new empty flavor
  const addCombo = () => {
    setApiData(prev => ({
      ...prev,
      combos: [...prev.combos, { title: "", title_ar: "" }]
    }));
  };

  // Remove a flavor by index
  const removeCombo = (index) => {
    setApiData(prev => ({
      ...prev,
      combos: prev.combos.filter((_, i) => i !== index)
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const formData = new FormData();
     
      Object.entries(apiData).forEach(([key, value]) => {
        if (key!=='combos') {
          formData.append(key, value);
        }
      });
      // Append flavors array
      apiData.combos.forEach((cmobo, index) => {
        formData.append(`combos[${index}][title]`, cmobo.title);
        formData.append(`combos[${index}][title_ar]`, cmobo.title_ar);
        formData.append(`combos[${index}][quantity]`, cmobo.quantity);
        formData.append(`combos[${index}][flavor_id]`, cmobo.flavor_id);
        formData.append(`combos[${index}][no_flavors]`, cmobo.no_flavors);
      });
      

      const response = await ApiService.request({
        method: 'POST',
        url:  `items/createOrUpdate/${id || ''}`,
        data:formData
      });
     
      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/items");
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
              {id ? "Edit" : "Add New"} Item
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
                <a href="/items" className="text-muted text-hover-primary">
                  Items
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
                      placeholder="Enter Item Title"
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
                      placeholder="Enter Item Title Arabic"
                      required
                      value={apiData.title_ar}
                      name="title_ar"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Branch Select */}
                  {/* <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">Branch</label>
                    <Dropdown
                       value={apiData.branch_id}
                       options={branches}
                       optionLabel="name" 
                       optionValue="_id" 
                      onChange={(selectedOption) =>
                        setApiData({ ...apiData, branch_id: selectedOption.value })
                      }
                      placeholder="Select Branch"
                      filter
                      checkmark={true}
                    />
                    
                  </div> */}
            


            
                  {/* Original Price/Mile */}
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">
                      Original Price ({currency})
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      className="form-control form-control-solid"
                      placeholder="Item Price"
                      required
                      value={apiData.original_price}
                      onChange={(e) =>
                        setApiData({ ...apiData, original_price: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">
                      Discounted Price ({currency})
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      className="form-control form-control-solid"
                      placeholder="Item Discounted Price"
                      required
                      value={apiData.discounted_price}
                      onChange={(e) =>
                        setApiData({ ...apiData, discounted_price: e.target.value })
                      }
                    />
                  </div>

               
                  {/* Categories */}
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">Categories</label>
                      <MultiSelect
                        value={apiData.categories}
                        options={categories}
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(e) => setApiData({ ...apiData, categories: e.value })}
                        placeholder="Select Categories"
                        filter
                        className="form-control"
                      />
                  </div>

                  {/* Addons */}
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className=" fs-6 fw-semibold mb-2">Addons (optional)</label>
                      <MultiSelect
                        value={apiData.addons}
                        options={addons}
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(e) => setApiData({ ...apiData, addons: e.value })}
                        placeholder="Select Addons"
                        filter
                        className="form-control"
                      />
                  </div>

               

                  {/* Item Description */}
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="fs-6 fw-semibold mb-2">Item Description</label>
                    <textarea
                      value={apiData.description}
                      rows="3"
                      className="form-control form-control-solid"
                      placeholder="Write Item Description"
                      onChange={(e) =>
                        setApiData({ ...apiData, description: e.target.value })
                      }
                    ></textarea>
                  </div>

                  {/* Description Arabic */}
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="fs-6 fw-semibold mb-2">Description Arabic</label>
                    <textarea
                      value={apiData.description_ar}
                      rows="3"
                      className="form-control form-control-solid"
                      placeholder="Write Item Description Arabic"
                      onChange={(e) =>
                        setApiData({ ...apiData, description_ar: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="col-md-12 fv-row fv-plugins-icon-container bg-light rounded  p-3">
                    <label className="fs-3 fw-bold mb-2">Combo
                       <button className="btn btn-base btn-sm mx-3" type="button" onClick={addCombo}> Add Item </button>
                      </label>
                      <div className="table-responsive">
                        <table className="table fs-6 gx-3">
                          <thead>
                            <tr>
                              <th className="w-250px fw-semibold">Item</th>
                              <th className="w-250px fw-semibold">Item Arabic</th>
                              <th className="w-250px fw-semibold">Flavors</th>
                              <th className="w-150px fw-semibold">Quantity</th>
                              <th className="w-150px fw-semibold">Sets/ No. Flavors</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {apiData.combos && apiData.combos.map((combo, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Enter Item Title"
                                    required
                                    value={combo?.title}
                                    name="title"
                                    onChange={(e) => handleComboChange(index, e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Enter Item Title Arabic"
                                    required
                                    value={combo?.title_ar}
                                    name="title_ar"
                                    onChange={(e) => handleComboChange(index, e)}
                                  />
                                </td>
                                 <td>
                                  <select name="flavor_id" className="form-select" required  value={combo.flavor_id}
                                  onChange={(e) => handleComboChange(index, e)} >
                                      <option value="">Select Flavor</option>
                                    {flavors.map((flvor, index) => (
                                      <option value={flvor._id}>{flvor.title}</option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control "
                                    placeholder="Total Quantity"
                                    required
                                    value={combo?.quantity}
                                    name="quantity"
                                    onChange={(e) => handleComboChange(index, e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control "
                                    placeholder="Sets/No. of Flavors"
                                    required
                                    value={combo?.no_flavors}
                                    name="no_flavors"
                                    onChange={(e) => handleComboChange(index, e)}
                                  />
                                </td>
                                <td>
                                  <button 
                                    className="btn btn-danger btn-sm"  type="button"
                                    onClick={() => removeCombo(index)}
                                  >
                                    <i className="bi bi-trash-fill"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                  </div>

                  {/* Images */}
                  <div className="col-md-12 fv-row fv-plugins-icon-container">
                    <label className="fs-6 fw-semibold mb-3">
                      <span>Item Image</span>
                    </label>
                    <ImageUpload name="image" onImageChange={handleImageChange} defaultPreviewUrl={apiData.image} />
                    
                  </div>

                 
                </div>

                {/* Form Actions */}
                <div className="row g-9 my-3">
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-light me-3"
                      onClick={() => navigate("/items")}
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

export default ItemForm;
