# Use official Nginx image as base
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY blog.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/
COPY logo.svg /usr/share/nginx/html/
COPY logo-simple.svg /usr/share/nginx/html/
COPY 404.html /usr/share/nginx/html/

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
