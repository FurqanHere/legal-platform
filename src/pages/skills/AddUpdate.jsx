import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import ApiService from '../../services/ApiService';
import ImageUpload from '../../components/ImageUpload';


const SkillForm = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  // const [currency] = useState(process.env.REACT_APP_CURRENCY);

  const [isLoader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    image: '',
  });



  useEffect(() => {
    if (id) {
      getSingleData();
    }
  }, [id]);
 

  const getSingleData = async () => {
    setIsLoader(true);
    try {
      const response = await ApiService.request({
        method: 'GET',
        url: `skills/${id}`, // Replace with your API endpoint
      });
      const data = response.data;
      if (data.status) {
        setFormData(data.data);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleImageChange = (name, file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await ApiService.request({
        method: 'POST',
        url: `skills/createOrUpdate/${id || ''}`, // Replace with your API endpoint
        data,
      });

      if (response.data.status) {
        toast.success(response.data.message);
        navigate('/skills');
      } else {
        toast.error(response.data.message);
      }
      setIsLoader(false);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              {id ? 'Edit' : 'Add New'} Skill
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link to="/dashboard" className="text-muted text-hover-primary">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                <Link to="/skills" className="text-muted text-hover-primary">Skills</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="app-container container-xxl">
          <div className="card">
            <div className="card-body pt-0">
              <form onSubmit={handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework">
                <div className="row g-9 my-3">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2"> Title</label>
                    <input
                      duration="text"
                      className="form-control form-control-solid"
                      placeholder="Enter Skill Title"
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2"> Title Arabic</label>
                    <input
                      duration="text"
                      className="form-control form-control-solid"
                      placeholder="Enter Service Title Arabic"
                      required
                      name="title_ar"
                      value={formData.title_ar}
                      onChange={handleChange}
                    />
                  </div>
                 */}

                  {/* <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className=" fs-6 fw-semibold mb-2">Image</label>
                    <ImageUpload name="image" onImageChange={handleImageChange} defaultPreviewUrl={formData.image} />
                  </div> */}


                </div>

             

                <div className="row g-9 my-3">
                  <div className="text-center">
                    <Link to={`/skills`} className="btn btn-light me-3">Back</Link>
                    <button duration="submit" className="btn btn-base" disabled={isLoader}>
                      <span className="indicator-label">{isLoader ? <Loader size="20" color="white" text="Submitting" /> : ('submit')}</span>
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

export default SkillForm;
