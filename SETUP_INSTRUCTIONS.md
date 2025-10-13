# Setup Instructions

## ✅ Backend Server Status
- **Backend API**: ✅ Running on https://sky.devicebee.com/EmiratiHub
- **Health Check**: ✅ Working
- **Dependencies**: ✅ Installed

## ⚠️ MongoDB Setup Required

The backend server is running but needs MongoDB to be set up. You have two options:

### Option 1: Install MongoDB Locally

#### On macOS:
```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

#### On Ubuntu/Debian:
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: Use MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update the `.env` file in the backend directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emiriti_hub_admin
```

## 🚀 After MongoDB Setup

Once MongoDB is running, create the default admin user:

```bash
cd backend
node scripts/seedAdmin.js
```

## 🔐 Default Admin Credentials

After running the seed script:
- **Email**: `admin@emiriti.com`
- **Password**: `admin123`

## 🌐 API Endpoints

The backend is running on **https://sky.devicebee.com/EmiratiHub** with these endpoints:

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin profile
- `PUT /api/auth/me` - Update admin profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Websites
- `GET /api/websites` - List all websites
- `GET /api/websites/:id` - Get single website
- `POST /api/websites` - Create new website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `GET /api/websites/stats/overview` - Get website statistics

### Settings
- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update system settings

## 🎨 Frontend Setup

The frontend is configured to connect to the backend API. To start the frontend:

```bash
# From the project root directory
npm start
```

The frontend will run on **http://localhost:3000**

## 🔧 Environment Files

### Backend (.env)
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/emiriti_hub_admin
JWT_SECRET=emiriti_hub_admin_secret_key_2024_secure_token
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://sky.devicebee.com/EmiratiHub/api
REACT_APP_BASE_PATH=
REACT_APP_NAME=Emiriti Hub Admin
REACT_APP_DESCRIPTION=Admin Portal for Emiriti Hub
REACT_APP_KEYWORDS=admin, portal, emiriti, hub
```

## ✅ Current Status

- ✅ Backend server running on port 5001
- ✅ All API endpoints configured
- ✅ Frontend environment configured
- ✅ Dependencies installed
- ⚠️ MongoDB setup required
- ⚠️ Default admin user creation pending

## 🎯 Next Steps

1. Set up MongoDB (local or cloud)
2. Run the seed script to create admin user
3. Start the frontend (`npm start`)
4. Login with admin credentials
5. Start managing websites!

## 🆘 Troubleshooting

### Backend not starting?
- Check if port 5001 is available
- Ensure all dependencies are installed (`npm install`)

### MongoDB connection issues?
- Verify MongoDB is running
- Check connection string in .env file
- Ensure network access (for cloud MongoDB)

### Frontend not connecting to backend?
- Verify backend is running on port 5001
- Check REACT_APP_API_URL in frontend .env
- Check browser console for errors

