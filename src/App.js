// src/App.js
import React ,{useEffect} from 'react';
import AppRouter from './router/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/style.bundle.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {



  useEffect(() => {
    document.title = process.env.REACT_APP_NAME || 'React App';
     // Update existing meta tags
     const metaDescription = document.querySelector('meta[name="description"]');
     if (metaDescription) {
         metaDescription.content = process.env.REACT_APP_DESCRIPTION || 'React App Description';
     }

     const metaKeywords = document.querySelector('meta[name="keywords"]');
     if (metaKeywords) {
        metaKeywords.content = process.env.REACT_APP_KEYWORDS || 'React App keywords';
     }

     // Initialize AOS
     AOS.init({
       duration: 800,
       easing: 'ease-in-out',
       once: true,
       offset: 100
     });

  }, []);
  return (
    <div>
      <AppRouter />      
      <ToastContainer />
    </div>
  );
}

export default App;
