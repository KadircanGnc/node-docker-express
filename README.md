# Node.js Docker Application

A full-stack Node.js application with Express, MongoDB, Redis, and Nginx, fully containerized with Docker.

## 🚀 Features

- **Express.js** REST API server
- **MongoDB** database with Mongoose ODM
- **Redis** session storage
- **Nginx** reverse proxy (production)
- **Docker** containerization
- **Session management** with express-session
- **CORS** enabled for cross-origin requests
- **User authentication** and post management
- **Development and Production** environments

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js (for local development)
- Git

## 🛠️ Project Structure

```
node-docker/
├── config/
│   └── config.js          # Environment configuration
├── models/                # Mongoose models
├── routes/
│   ├── postRoutes.js      # Post-related routes
│   └── userRoutes.js      # User authentication routes
├── nginx/
│   └── default.conf       # Nginx configuration
├── docker-compose.yml     # Base Docker Compose
├── docker-compose.dev.yml # Development overrides
├── docker-compose.prod.yml# Production overrides
├── Dockerfile             # Node.js container
├── index.js              # Main application file
└── package.json          # Dependencies
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGO_USER=admin
MONGO_PASSWORD=admin
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin

# Redis Configuration
REDIS_URL=redis
REDIS_PORT=6379

# Session Configuration
SESSION_SECRET=your-super-secret-key

# Application
NODE_ENV=development
PORT=3000
```

## 🚀 Getting Started

### Development Environment

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd node-docker
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

3. **Start development environment**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
   ```

4. **Access the application**
   - API: http://localhost:3000
   - Test endpoint: http://localhost:3000/api/v1

### Production Environment

1. **Build and start production environment**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
   ```

2. **Access the application**
   - Application: http://localhost (port 80)
   - Served through Nginx reverse proxy

## 📊 Services

### Node.js Application
- **Port**: 3000 (development), proxied through Nginx (production)
- **Features**: REST API, session management, authentication

### MongoDB
- **Port**: 27017 (internal)
- **Authentication**: Username/password based
- **Persistence**: Docker volume `mongo-db`

### Redis
- **Port**: 6379 (internal)
- **Purpose**: Session storage
- **Configuration**: Connect via `redis://redis:6379`

### Nginx (Production only)
- **Port**: 80
- **Purpose**: Reverse proxy, load balancing, static file serving

## 🔗 API Endpoints

### General
- `GET /api/v1` - Health check endpoint

### Posts
- `GET /api/v1/posts` - Get all posts
- `POST /api/v1/posts` - Create new post
- `GET /api/v1/posts/:id` - Get specific post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post

### Users
- `POST /api/v1/users/signup` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout

## 🐳 Docker Commands

### Development
```bash
# Start services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Start in detached mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Rebuild and start
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Stop services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

### Production
```bash
# Start production environment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Stop production environment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

### Utility Commands
```bash
# View logs
docker-compose logs node-app

# Access Redis CLI
docker exec -it node-docker-redis-1 redis-cli

# Access MongoDB
docker exec -it node-docker-mongo-1 mongosh

# Access Node.js container
docker exec -it node-docker-node-app-1 bash
```

## 🔍 Debugging

### Check Redis Sessions
```bash
docker exec -it node-docker-redis-1 redis-cli
127.0.0.1:6379> keys *
127.0.0.1:6379> get sess:SESSION_ID
```

### Check MongoDB
```bash
docker exec -it node-docker-mongo-1 mongosh
use admin
db.auth('admin', 'admin')
show dbs
```

### Application Logs
```bash
docker-compose logs -f node-app
```

## ⚙️ Configuration

### Session Configuration
- **Store**: Redis
- **Secret**: Configurable via environment
- **Cookie**: HTTP-only, 1 hour expiry
- **CORS**: Enabled for cross-origin requests

### Security Features
- HTTP-only cookies
- Trust proxy enabled for production
- Environment-based configuration
- Secure session management

If you encounter any issues or have questions, please open an issue in the GitHub repository.
