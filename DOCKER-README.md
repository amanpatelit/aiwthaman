# Docker Deployment Guide

This guide explains how to build and run the portfolio website using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Option 2: Using Docker Commands

```bash
# Build the Docker image
docker build -t amanpatel-portfolio .

# Run the container
docker run -d -p 80:80 --name amanpatel-portfolio amanpatel-portfolio

# View logs
docker logs -f amanpatel-portfolio

# Stop the container
docker stop amanpatel-portfolio

# Remove the container
docker rm amanpatel-portfolio
```

## Access the Website

Once the container is running, open your browser and navigate to:
- http://localhost

## Custom Port

To run on a different port (e.g., 8080):

```bash
# Using Docker Compose - edit docker-compose.yml and change "80:80" to "8080:80"

# Using Docker command
docker run -d -p 8080:80 --name amanpatel-portfolio amanpatel-portfolio
```

Then access at: http://localhost:8080

## Production Deployment

For production deployment with HTTPS:

1. Use a reverse proxy like Nginx or Traefik
2. Configure SSL certificates (Let's Encrypt recommended)
3. Update the port mapping as needed
4. Set up proper domain configuration

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs amanpatel-portfolio

# Check if port 80 is already in use
netstat -an | grep :80
```

### Rebuild after changes
```bash
# Using Docker Compose
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Using Docker commands
docker stop amanpatel-portfolio
docker rm amanpatel-portfolio
docker build --no-cache -t amanpatel-portfolio .
docker run -d -p 80:80 --name amanpatel-portfolio amanpatel-portfolio
```

## File Structure

```
.
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf             # Nginx server configuration
├── .dockerignore          # Files to exclude from Docker build
├── index.html             # Main website file
├── blog.html              # Blog page
├── styles.css             # Stylesheet
├── script.js              # JavaScript file
└── *.svg                  # Logo and favicon files
```

## Features

- ✅ Lightweight Alpine Linux base image
- ✅ Nginx web server for optimal performance
- ✅ Gzip compression enabled
- ✅ Static asset caching
- ✅ Custom 404 page
- ✅ Security headers configured
- ✅ Easy deployment with Docker Compose

## Support

For issues or questions, contact: letsbuild@aiwithaman.com
