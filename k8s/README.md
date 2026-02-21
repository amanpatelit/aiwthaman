# Kubernetes Deployment Guide

Complete guide for deploying the portfolio website on Kubernetes.

## Prerequisites

- Kubernetes cluster (v1.19+)
- kubectl configured
- Docker image built and pushed to registry
- (Optional) Ingress controller installed
- (Optional) cert-manager for SSL certificates

## Quick Start

### Option 1: Deploy All Resources at Once

```bash
# Apply all resources
kubectl apply -f k8s-all-in-one.yaml

# Check deployment status
kubectl get all -l app=portfolio

# Get service external IP
kubectl get svc amanpatel-portfolio-service
```

### Option 2: Deploy Individual Resources

```bash
# 1. Create ConfigMap
kubectl apply -f k8s-configmap.yaml

# 2. Create Deployment
kubectl apply -f k8s-deployment.yaml

# 3. Create Service
kubectl apply -f k8s-service.yaml

# 4. Create HPA (optional)
kubectl apply -f k8s-hpa.yaml

# 5. Create Ingress (optional, for custom domain)
kubectl apply -f k8s-ingress.yaml
```

## Build and Push Docker Image

```bash
# Build the image
docker build -t amanpatel-portfolio:latest .

# Tag for your registry
docker tag amanpatel-portfolio:latest <your-registry>/amanpatel-portfolio:latest

# Push to registry
docker push <your-registry>/amanpatel-portfolio:latest

# Update deployment image
kubectl set image deployment/amanpatel-portfolio portfolio-web=<your-registry>/amanpatel-portfolio:latest
```

## Configuration Files

### 1. k8s-deployment.yaml
- **Replicas**: 3 pods for high availability
- **Resources**: 64Mi-128Mi memory, 100m-200m CPU
- **Health Checks**: Liveness and readiness probes
- **Rolling Update**: Zero-downtime deployments

### 2. k8s-service.yaml
- **Type**: LoadBalancer (exposes external IP)
- **Port**: 80 (HTTP)
- **Session Affinity**: ClientIP for sticky sessions

### 3. k8s-ingress.yaml
- **SSL/TLS**: Automatic HTTPS with cert-manager
- **Domains**: aiwithaman.com, www.aiwithaman.com
- **Rate Limiting**: 100 requests per minute

### 4. k8s-hpa.yaml
- **Auto-scaling**: 2-10 pods based on CPU/Memory
- **CPU Target**: 70% utilization
- **Memory Target**: 80% utilization

### 5. k8s-configmap.yaml
- **Nginx Config**: Custom server configuration
- **Caching**: 1-year cache for static assets
- **Security Headers**: XSS, Frame Options, etc.

## Monitoring and Management

### Check Deployment Status
```bash
# Get all resources
kubectl get all -l app=portfolio

# Check pod status
kubectl get pods -l app=portfolio

# View pod logs
kubectl logs -l app=portfolio --tail=100 -f

# Describe deployment
kubectl describe deployment amanpatel-portfolio
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment amanpatel-portfolio --replicas=5

# Check HPA status
kubectl get hpa amanpatel-portfolio-hpa

# View HPA details
kubectl describe hpa amanpatel-portfolio-hpa
```

### Rolling Updates

```bash
# Update image
kubectl set image deployment/amanpatel-portfolio portfolio-web=amanpatel-portfolio:v2

# Check rollout status
kubectl rollout status deployment/amanpatel-portfolio

# View rollout history
kubectl rollout history deployment/amanpatel-portfolio

# Rollback to previous version
kubectl rollout undo deployment/amanpatel-portfolio
```

### Access the Application

```bash
# Get service external IP
kubectl get svc amanpatel-portfolio-service

# Port forward for local testing
kubectl port-forward svc/amanpatel-portfolio-service 8080:80

# Access at http://localhost:8080
```

## SSL/TLS Configuration

### Install cert-manager (if not installed)

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer for Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: letsbuild@aiwithaman.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

### Apply Ingress with SSL

```bash
# Update domain in k8s-ingress.yaml
# Then apply
kubectl apply -f k8s-ingress.yaml

# Check certificate status
kubectl get certificate
kubectl describe certificate portfolio-tls-secret
```

## AWS EKS Deployment

```bash
# Create EKS cluster
eksctl create cluster --name portfolio-cluster --region us-east-1 --nodes 3

# Configure kubectl
aws eks update-kubeconfig --name portfolio-cluster --region us-east-1

# Deploy application
kubectl apply -f k8s-all-in-one.yaml

# Install AWS Load Balancer Controller
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"
```

## Azure AKS Deployment

```bash
# Create AKS cluster
az aks create --resource-group portfolio-rg --name portfolio-cluster --node-count 3

# Get credentials
az aks get-credentials --resource-group portfolio-rg --name portfolio-cluster

# Deploy application
kubectl apply -f k8s-all-in-one.yaml
```

## GCP GKE Deployment

```bash
# Create GKE cluster
gcloud container clusters create portfolio-cluster --num-nodes=3 --zone=us-central1-a

# Get credentials
gcloud container clusters get-credentials portfolio-cluster --zone=us-central1-a

# Deploy application
kubectl apply -f k8s-all-in-one.yaml
```

## Troubleshooting

### Pods not starting
```bash
# Check pod events
kubectl describe pod -l app=portfolio

# Check logs
kubectl logs -l app=portfolio --tail=50

# Check image pull
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Service not accessible
```bash
# Check service
kubectl get svc amanpatel-portfolio-service

# Check endpoints
kubectl get endpoints amanpatel-portfolio-service

# Test from within cluster
kubectl run -it --rm debug --image=busybox --restart=Never -- wget -O- http://amanpatel-portfolio-service
```

### HPA not scaling
```bash
# Check metrics server
kubectl top nodes
kubectl top pods

# Install metrics server if needed
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## Cleanup

```bash
# Delete all resources
kubectl delete -f k8s-all-in-one.yaml

# Or delete individually
kubectl delete deployment amanpatel-portfolio
kubectl delete service amanpatel-portfolio-service
kubectl delete hpa amanpatel-portfolio-hpa
kubectl delete ingress amanpatel-portfolio-ingress
kubectl delete configmap portfolio-nginx-config
```

## Production Best Practices

✅ **High Availability**
- Multiple replicas (3+)
- Pod anti-affinity rules
- Multi-zone deployment

✅ **Security**
- Network policies
- Pod security policies
- RBAC configuration
- Secret management

✅ **Monitoring**
- Prometheus metrics
- Grafana dashboards
- Alert manager

✅ **Backup**
- Regular etcd backups
- Persistent volume snapshots
- Disaster recovery plan

## Resource Requirements

| Component | CPU Request | CPU Limit | Memory Request | Memory Limit |
|-----------|-------------|-----------|----------------|--------------|
| Pod       | 100m        | 200m      | 64Mi           | 128Mi        |
| Min Pods  | 2           | -         | -              | -            |
| Max Pods  | 10          | -         | -              | -            |

## Support

For issues or questions:
- Email: letsbuild@aiwithaman.com
- GitHub: github.com/amanpatelit
