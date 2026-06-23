# 🧠 Cogniscan – AI-Powered Cognitive Health Monitoring Platform

## 📌 Overview

Cogniscan is an AI-powered cognitive health monitoring platform designed to assess, train, and track cognitive abilities through standardized tests, interactive brain games, personalized memory recall exercises, and AI-driven insights.

The platform helps users identify early signs of cognitive decline while providing engaging cognitive training and long-term progress tracking.

---

## 🚀 Problem Statement

Early signs of cognitive decline such as memory loss, reduced attention, and slower reaction times often go unnoticed until significant deterioration occurs.

Existing solutions are often:

- Expensive
- Clinically focused
- Difficult to access
- Lack personalization

Cogniscan provides an accessible, AI-driven solution for cognitive assessment, training, and monitoring.

---

## 🎯 Key Features

### Cognitive Assessment

- Memory Test
- Pattern Recognition Test
- Reaction Speed Test

### Brain Training Games

- Memory Cards
- Sequence Recall
- Pattern Match
- Reaction Tap
- Number Puzzle
- Advanced Spatial Memory Games

### Memory Vault

Users can upload:

- Personal photos
- Family information
- Important memories
- Descriptions and events

The system automatically generates personalized recall questions using NLP techniques.

### AI Assistant

- Cognitive health guidance
- Personalized recommendations
- GPT-powered chat support
- Gemini fallback support

### Dashboard & Analytics

- Cognitive score tracking
- Domain-wise performance analysis
- Daily streak tracking
- Weekly progress reports
- Trend visualization

### PDF Health Reports

Generate downloadable reports containing:

- Cognitive scores
- Activity history
- Performance trends
- Memory recall results

---

# 🏗 System Architecture

```text
USER
   ↓
COGNITIVE ASSESSMENT
   ↓
BRAIN TRAINING
   ↓
MEMORY VAULT
   ↓
AI & ANALYTICS
   ↓
DASHBOARD & REPORTS
```

### Workflow

1. User signs up or logs in
2. Completes cognitive tests
3. Plays brain training games
4. Uploads memories to Memory Vault
5. AI generates personalized recall questions
6. Performance data is analyzed
7. Dashboard displays insights and recommendations
8. PDF reports can be exported

---

## 💻 Tech Stack

### Frontend

- React 19
- TanStack Router
- Tailwind CSS v4
- Framer Motion
- React Query
- Zustand

### UI Components

- shadcn/ui
- Radix UI

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose ODM

### Authentication

- JWT Authentication
- bcryptjs

### AI Integration

- OpenAI GPT
- Google Gemini

### Charts

- Recharts

### Forms

- React Hook Form
- Zod Validation

### File Uploads

- Multer

### Reports

- jsPDF

---

## 📊 Database Models

### User

- Full Name
- Email
- Password
- Role
- Current Streak
- Longest Streak

### Test Results

- Test Type
- Score
- Duration

### Exercise Sessions

- Exercise Type
- Score
- Duration

### Memory Vault

- Title
- Description
- Image
- Category
- Date

### Memory Questions

- Question
- Options
- Correct Answer
- Difficulty

### Memory Results

- Score
- Correct Answers
- Completion Time

---

## 🔒 User Roles

### Patient

- Take assessments
- Play cognitive games
- Upload memories
- View reports

### Caregiver

- Monitor patient progress
- Access reports
- Track cognitive trends

---

## 📈 Future Scope

- Speech pattern analysis
- Facial expression analysis
- Alzheimer's risk prediction
- Mobile application
- Wearable integration
- Clinical dashboard
- Multilingual support
- Telemedicine integration

---

## 🌟 Project Highlights

✅ AI-Powered Cognitive Assessment

✅ Personalized Memory Recall Training

✅ Interactive Brain Training Games

✅ Memory Vault with Auto-Generated Questions

✅ Cognitive Health AI Assistant

✅ Progress Tracking & Analytics

✅ PDF Health Reports

✅ Patient & Caregiver Support

---

## 👥 Team

Add Team Information Here

- Team Name:
- Member 1:
- Member 2:
- Member 3:
- Institution:

---

## 📄 License

This project is developed for educational, research, and healthcare innovation purposes.

---

## 🔗 Repository

Cogniscan is designed to make cognitive health assessment, training, and monitoring accessible, engaging, and intelligent through AI-powered personalization.
