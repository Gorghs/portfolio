# 🚀 Karthick Venkatachalem | AI Systems Developer Portfolio

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1-green?logo=springboot)
![AWS](https://img.shields.io/badge/AWS-Cloud-232F3E?logo=amazon-aws)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

> **"I build intelligent automation systems that reduce effort and increase efficiency."**

## 👨‍💻 Overview
This portfolio is engineered to showcase my expertise in **Backend Development** and **DevOps**. While the frontend is modern and interactive (featuring ambient music and a custom cursor), the core value lies in the **distributed systems** and **cloud infrastructure** projects I build.

## 🏗️ System Architecture (Featured Project)
Below is the high-level architecture for my **Campus Management ERP** project, demonstrating microservices communication and deployment strategy.

```mermaid
graph TD
    User[Client (Web/Mobile)] -->|HTTPS| CDN[CloudFront CDN]
    CDN -->|Static Assets| S3[AWS S3 Bucket]
    User -->|API Requests| LB[Application Load Balancer]
    
    subgraph "VPC (Private Cloud)"
        LB -->|Route Traffic| API[API Gateway]
        
        subgraph "ECS Cluster (Fargate)"
            API --> Auth[Auth Service (Spring Security)]
            API --> Core[Core Service (Spring Boot)]
            API --> Pay[Payment Service (Node.js)]
        end
        
        Auth -->|Read/Write| DB1[(PostgreSQL - Users)]
        Core -->|Read/Write| DB2[(MongoDB - Logs)]
        Core -->|Cache| Redis[(Redis - Session)]
        
        Core -->|Async Events| Kafka[Apache Kafka]
        Kafka -->|Consume| Notif[Notification Service]
    end
    
    Notif -->|Send| SES[AWS SES (Email)]
```

## 🛠️ Tech Stack
### Backend Core
*   **Languages**: Java 17, Python, TypeScript
*   **Frameworks**: Spring Boot, Express.js, Django
*   **Database**: PostgreSQL, MongoDB, Redis

### DevOps & Cloud
*   **Containerization**: Docker, Kubernetes
*   **Cloud Provider**: AWS (EC2, S3, RDS, ECS, Lambda)
*   **CI/CD**: GitHub Actions, Jenkins

### Frontend (Experience)
*   React 18 + TypeScript
*   **Ambience**: Integrated Background Music (Hans Zimmer) & Custom Interactive Cursor
*   GSAP Animations

## 🚀 How to Run (Development)

This project consists of a **Frontend** (React/Vite) and a **Backend** (Express/Node). The Backend uses an **in-memory database** for the Guestbook, so data resets on restart.

### Prerequisites
*   Node.js (v18+)

### Step 1: Start the Backend API
1.  Open a terminal.
2.  Navigate to the `api` folder:
    ```bash
    cd api
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    *Server will run on http://localhost:5000*

### Step 2: Start the Frontend UI
1.  Open a **new** terminal (keep the api terminal running).
2.  Navigate to the project root:
    ```bash
    # (If you are in api folder, cd .. first)
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *Frontend will run on http://localhost:5173*

## 📂 Project Structure
```text
/
├── .github/           # CI/CD Workflows
├── api/               # Express Backend (Microservice Demo)
├── public/            # Static Assets
├── src/               # React Frontend
│   ├── components/    # Reusable UI (MusicPrompt, CustomCursor)
│   ├── pages/         # Route Views (Projects, GuestBook)
│   └── context/       # Global State (Theme, Music)
├── Dockerfile         # Container Config
└── compose.yaml       # Local orchestration
```

---
**[Download Resume](/public/previews/resume.pdf)** 
