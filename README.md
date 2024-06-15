 🌼 Monet-Generator Project 🌼

Welcome to the Monet-Generator Project! This repository contains the code and resources for deploying a FastAPI backend and a Vite-React frontend application that generates Monet-style images. This project demonstrates the use of various cloud and containerization technologies to achieve a scalable and secure deployment.

## 🌟 Project Overview

The Monet-Generator Project involves the following components:

- **FastAPI Backend**: A machine learning model that generates Monet-style images.
- **Vite-React Frontend**: A web application that allows users to upload images and view the generated results.
- **Azure Kubernetes Service (AKS)**: Hosts the FastAPI backend.
- **Azure Static Web Apps**: Hosts the Vite-React frontend.
- **Cert-Manager with Let's Encrypt**: Manages SSL certificates for secure HTTPS communication.

## 🔧 Technologies Used

- ![Python](https://img.shields.io/badge/Python-3.8-blue?logo=python&logoColor=white)
- ![FastAPI](https://img.shields.io/badge/FastAPI-0.68.2-blue?logo=fastapi&logoColor=white)
- ![Docker](https://img.shields.io/badge/Docker-20.10.7-blue?logo=docker&logoColor=white)
- ![Kubernetes](https://img.shields.io/badge/Kubernetes-1.21-blue?logo=kubernetes&logoColor=white)
- ![Azure](https://img.shields.io/badge/Azure-Cloud-blue?logo=microsoft-azure&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-2.4.4-blue?logo=vite&logoColor=white)
- ![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)
- ![Cert-Manager](https://img.shields.io/badge/Cert--Manager-1.5.3-blue?logo=letsencrypt&logoColor=white)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Setup Instructions

### Prerequisites

- Docker
- Kubernetes CLI (`kubectl`)
- Azure CLI
- Node.js and npm

### Step 1: Clone the Repository

```
git clone https://github.com/your-username/monet-generator.git
cd monet-generator
```

### Step 2: Set Up the Backend

1. **Build Docker Image**

```
docker build -t monet-backend .
docker push your_dockerhub_username/monet-backend
```

2. **Deploy to Kubernetes**

```
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/monet-ingress.yaml
```


3. **Configure Cert-Manager**


```
kubectl apply -f k8s/cert-manager.yaml
kubectl apply -f k8s/letsencrypt-issuer.yaml

```


### Step 3: Set Up the Frontend

1. **Deploy Azure Static Web App**

   - Follow the Azure Portal wizard to create a new Static Web App linked to your GitHub repository.
   - Configure GitHub Actions to build and deploy your Vite-React app.

2. **Update DNS Settings**

   - Point your domain to the Azure Static Web App.

## 🌐 How to Use

1. **Access the Frontend**

   Navigate to `https://monet-generator.hungwevision.com` to access the web application.

2. **Upload an Image**

   Use the upload functionality to submit an image for Monet-style transformation.

3. **View Results**

   The transformed image will be displayed on the webpage.

## 🤝 Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

### ❤️ Support This Project

If you find this project helpful, please give it a ⭐ on GitHub and share it with others! You can also:

- 👍 Like it on GitHub
- 💬 Provide feedback
- 🌟 Star this repository

Let's build something amazing together! 🚀

<!-- ---

### 📷 Screenshots

![Frontend Screenshot](path/to/frontend-screenshot.png)
![Backend Screenshot](path/to/backend-screenshot.png)

--- -->

By following these steps and guidelines, you'll be able to successfully set up and use the Monet-Generator Project. If you encounter any issues, feel free to open an issue on GitHub or reach out for support.

---

### 📝 Additional Information

For more detailed information about the project, please refer to the assignment document and the project's source code.

---
