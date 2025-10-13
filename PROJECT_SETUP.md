# Emiriti Hub Admin Portal - Complete Setup Guide

This project consists of a React frontend admin portal and a Node.js/Express backend API for managing website portfolios.

## 🏗️ Project Structure

```
Emiriti-Hub-admin/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── middleware/         # Authentication, validation, upload
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Utility scripts
│   ├── uploads/           # File uploads directory
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   │   └── websites/     # Website management pages
│   ├── services/         # API services
│   ├── router/           # Routing configuration
│   └── ...
├── start-dev.sh          # Development startup script
└── PROJECT_SETUP.md      # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

1. **Run the development script:**
   ```bash
   ./start-dev.sh
   ```

   This script will:
   - Install all dependencies
   - Set up the backend environment
   - Start both frontend and backend servers

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   node setup.js
   ```

4. **Update .env file** with your configuration:
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/emiriti_hub_admin
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```

6. **Create default admin user:**
   ```bash
   node scripts/seedAdmin.js
   ```

#### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start frontend server:**
   ```bash
   npm start
   ```

## 🔧 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or cloud instance)
- **npm** or **yarn**

## 📋 Features

### Backend API Features
- ✅ JWT Authentication with role-based access control
- ✅ Complete CRUD operations for websites
- ✅ File upload support (logos, screenshots)
- ✅ Input validation and error handling
- ✅ Pagination and filtering
- ✅ Security middleware (Helmet, CORS)
- ✅ Database models with relationships
- ✅ Admin management system

### Frontend Features
- ✅ Modern React admin interface
- ✅ Website management (List, Add, Edit, View, Delete)
- ✅ File upload components
- ✅ Responsive design with Bootstrap
- ✅ Form validation
- ✅ Toast notifications
- ✅ Pagination
- ✅ Search and filtering

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin profile
- `PUT /api/auth/me` - Update admin profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Websites
- `GET /api/websites` - Get all websites (with pagination/filtering)
- `GET /api/websites/:id` - Get single website
- `POST /api/websites` - Create new website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `GET /api/websites/stats/overview` - Get website statistics

## 🔐 Default Admin Credentials

After running the seed script, you can login with:
- **Email:** `admin@emiriti.com`
- **Password:** `admin123`
- **Role:** `super_admin`

## 📊 Website Data Model

The website model includes:
- Basic info (name, URL, description, category, status)
- Client information
- SEO metadata
- Analytics tracking
- Social media links
- Technologies and features
- File uploads (logo, screenshots)
- Audit fields (created/updated by, timestamps)

## 🎨 Frontend Pages

### Website Management
- **List Page** (`/websites`) - View all websites with search/filter
- **Add Page** (`/websites/create`) - Create new website
- **Edit Page** (`/websites/create/:id`) - Edit existing website
- **Details Page** (`/websites/:id`) - View website details

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
npm start    # Start React development server
```

### Database Management
- MongoDB connection string in `.env` file
- Models defined in `backend/models/`
- Seed script for initial data

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use production MongoDB instance
3. Configure file storage (consider cloud storage)
4. Use PM2 for process management
5. Set up reverse proxy (Nginx)
6. Enable SSL/HTTPS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve static files with web server
3. Configure API URL for production
4. Set up CDN for assets

## 🛠️ Customization

### Adding New Features
1. **Backend:** Create model → controller → routes → validation
2. **Frontend:** Create page → add route → update sidebar

### Styling
- Uses Bootstrap 5 for styling
- Custom CSS in `src/assets/css/`
- Bootstrap Icons for icons

### API Integration
- API service in `src/services/ApiService.js`
- Axios for HTTP requests
- JWT token handling

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/emiriti_hub_admin
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend
Update `src/services/ApiService.js` to point to your backend URL:
```javascript
baseURL: process.env.REACT_APP_API_URL || 'https://sky.devicebee.com/EmiratiHub'
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify database permissions

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes on the port

3. **File Upload Issues**
   - Check upload directory permissions
   - Verify file size limits
   - Ensure proper file types

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper CORS configuration

### Logs
- Backend logs in console
- Frontend logs in browser console
- Check network tab for API calls

## 📚 Additional Resources

- [Backend README](backend/README.md) - Detailed backend documentation
- [React Documentation](https://reactjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bootstrap Documentation](https://getbootstrap.com/docs)

## 🤝 Support

For support and questions:
1. Check the documentation
2. Review error logs
3. Check GitHub issues
4. Contact the development team

## 📄 License

This project is proprietary software. All rights reserved.

---

**Happy Coding! 🎉**

