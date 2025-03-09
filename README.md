
# BioLife Organic E-commerce Platform

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Django](https://img.shields.io/badge/Django-4.2-brightgreen.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)

A modern e-commerce platform connecting health-conscious consumers with organic producers. Built with Django, React, and PostgreSQL.

![Project Banner](https://github.com/TakibYeasar/Biolife_Organic_Website/blob/main/screencapture-localhost-5173-2025-03-09-09_16_49.png)

## 📌 Overview

BioLife Organic is a full-stack e-commerce solution designed to promote sustainable living by offering organic food products, supplements, and personal care items. The platform supports three key roles (**Admin**, **Customer**, and **Producer**) with tailored dashboards, advanced product management, and a focus on sustainability.

## ✨ Key Features

### **Role-Based Access Control**
- **Admin**: Manage users/products, approve listings, view analytics, and handle promotions.
- **Customer**: Browse products, manage subscriptions, track orders, and earn loyalty points.
- **Producer**: List products, manage inventory, view sales reports, and handle payouts.

### **Core Functionality**
- 🛒 Smart cart with dynamic pricing and multiple payment gateways (Stripe, PayPal)
- 🔄 Product comparison tool (ingredients, nutrition, price)
- 📦 Recurring subscriptions for staple items
- 📊 Sales analytics dashboard for producers/admins
- 🌱 Sustainability metrics and eco-point rewards system

### **Technical Highlights**
- 🔒 Secure authentication (2FA for admins/producers, OAuth for customers)
- 📱 PWA-ready mobile-first design
- ⚡ Optimized performance (CDN, caching, SSR)
- 📈 SEO-optimized with structured data
- RESTful API built with Django REST Framework

## 🛠️ Technologies Used

**Frontend**  
React | Next.js | Tailwind CSS | Redux Toolkit

**Backend**  
Django | PostgreSQL | Django REST Framework | Celery (Async Tasks)

**Infrastructure**  
AWS S3/EC2 | NGINX | Redis | GitHub Actions (CI/CD)

**Payment Gateways**  
Stripe | PayPal | Google Pay

## 🚀 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+

### Setup Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/TakibYeasar/Biolife_Organic_Website.git
   cd Biolife_Organic_Website
   ```

2. **Backend Setup**
   ```bash
   cd backend
   poetry install
   poetry shell
   cp .env.example .env
   # Configure environment variables (see below)
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables**  
   Create `.env` files in both `/backend` and `/frontend` using the example templates.

5. **Database Migration**
   Create PostgreSQL database and update DATABASE_URL in backend `.env` file

6. **Run Servers**
   ```bash
   # Backend (Django)
   python manage.py runserver

   # Frontend (React)
   npm run dev
   ```

## ⚙️ Configuration

**Backend .env**
```ini
DEBUG=0
SECRET_KEY=your_django_secret_key

# Database Configuration
DB_NAME = your_database_name
DB_USER = your_database_username
DB_PASS = your_database_user_password

# Email Configuration
EMAIL_HOST_USER = your_email_address
EMAIL_HOST_PASSWORD = your_email_host_password

STRIPE_API_KEY=sk_test_...
CELERY_BROKER_URL=redis://localhost:6379
```

**Frontend .env**
```ini
REACT_APP_API_URL=http://localhost:8000
REACT_APP_STRIPE_KEY=pk_test_...
```

## 📚 API Documentation

Explore API endpoints via:
- Django REST Framework UI: `http://localhost:8000/api/`
- OpenAPI Schema: `http://localhost:8000/swagger/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

## 🌍 Sustainability Commitment

BioLife implements:
- ♻️ Eco-friendly packaging options
- 🌾 Direct partnerships with organic farmers
- 📉 Carbon-neutral delivery partnerships
- 🏆 Sustainability certifications for products


**Happy Recycling! ♻️**  
[Report Bug](https://github.com/TakibYeasar/Biolife_Organic_Website/issues) | [Request Feature](https://github.com/TakibYeasar/Biolife_Organic_Website/issues)
```

The content above is encoded in UTF-8, which should display correctly on most platforms. If you need any further adjustments, feel free to ask!
