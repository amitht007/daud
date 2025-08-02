export const patterns = [
  {
    id: "microservices",
    icon: "🏗️",
    thumbnailText: "Microservices Architecture",
    title: "Microservices Pattern",
    description:
      "A distributed architecture pattern that structures applications as a collection of loosely coupled services, enabling independent deployment and scaling.",
    tags: ["Docker", "Kubernetes", "API Gateway", "Service Mesh"],
    route: "/patterns/microservices",
  },
  {
    id: "container-orchestration",
    icon: "☸️",
    thumbnailText: "Container Orchestration",
    title: "Kubernetes Deployment",
    description:
      "Automated container orchestration for deploying, scaling, and managing containerized applications across clusters.",
    tags: ["Kubernetes", "Helm", "YAML", "Ingress"],
    route: "/patterns/container-orchestration",
  },
  {
    id: "cicd-pipeline",
    icon: "🔄",
    thumbnailText: "CI/CD Pipeline",
    title: "Continuous Integration",
    description: "Automated build, test, and deployment pipeline that ensures rapid and reliable software delivery.",
    tags: ["Jenkins", "GitLab", "GitHub Actions", "Docker"],
    route: "/patterns/cicd-pipeline",
  },
  {
    id: "load-balancing",
    icon: "⚖️",
    thumbnailText: "Load Balancing",
    title: "Traffic Distribution",
    description:
      "Intelligent traffic routing and load distribution to ensure high availability and optimal performance.",
    tags: ["NGINX", "HAProxy", "AWS ELB", "Istio"],
    route: "/patterns/load-balancing",
  },
  {
    id: "auto-scaling",
    icon: "📈",
    thumbnailText: "Auto Scaling",
    title: "Dynamic Scaling",
    description: "Automatic resource scaling based on demand, ensuring optimal performance while controlling costs.",
    tags: ["HPA", "VPA", "KEDA", "Cluster Autoscaler"],
    route: "/patterns/auto-scaling",
  },
  {
    id: "monitoring-logging",
    icon: "📊",
    thumbnailText: "Monitoring & Logging",
    title: "Observability Stack",
    description:
      "Comprehensive monitoring, logging, and alerting system for maintaining system health and performance.",
    tags: ["Prometheus", "Grafana", "ELK Stack", "Jaeger"],
    route: "/patterns/monitoring-logging",
  },
]
