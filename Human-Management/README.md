# IAF Personnel Management System - React Frontend

A professional React frontend for the Indian Air Force Personnel Management System that provides AI-powered insights for leadership potential and attrition risk assessment.

## Features

### 🔐 Authentication System
- Secure login interface with Personnel ID and password
- Session management with protected routes
- Professional IAF-themed design

### 📊 Personnel Analysis
- Interactive form with all parameters from the original Streamlit version:
  - Age (20-60 years)
  - Years of Service (1-40 years)
  - Rank selection (Flying Officer to Group Captain)
  - Specialization (Pilot, Engineer, Admin, Ground Staff, Medical)
  - Performance Rating (1-5 scale)
  - Training Courses Completed (0-20)
  - Mission Success Rate (0-100%)
  - Medical Fitness Score (0-100)
  - Peer Review Score (1-5 scale)
  - Commander's Assessment (1-5 scale)

### 🎯 AI-Powered Results
- **Leadership Potential Assessment**: High/Medium/Low with detailed recommendations
- **Attrition Risk Analysis**: Low/Medium/High with retention strategies
- Professional result cards with color-coded insights
- Actionable recommendations for personnel management

### 🎨 Professional Design
- IAF Blue color scheme
- Responsive design for all screen sizes
- Loading states and error handling
- Professional typography and spacing
- Aircraft and military-themed icons

## Tech Stack

- **Frontend**: React 19.1, Vite, React Router
- **Styling**: Tailwind CSS with custom IAF theme
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Backend Integration**: Flask REST API

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Running Flask backend (`app.py`)

### Installation

1. **Clone and navigate to the React project:**
   ```bash
   cd "Human-Management"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Backend Setup

Make sure the Flask backend is running on `http://127.0.0.1:5000`:

```bash
cd "d:\Projects\human management"
python app.py
```

## Usage

### Login
1. Open the application
2. Enter any Personnel ID and password (demo accepts any non-empty values)
3. Click "Access Dashboard"

### Personnel Analysis
1. Navigate to the "Personnel Analysis" tab
2. Adjust the sliders and dropdowns to set personnel parameters
3. Click "Analyze Personnel"
4. View the AI-powered results with recommendations

### Authentication Demo
For demonstration purposes, the login accepts any non-empty credentials:
- **Personnel ID**: Any non-empty string (e.g., "IAF001")
- **Password**: Any non-empty string (e.g., "password")

## API Integration

The React frontend integrates with the Flask backend API:

### Endpoint
- **POST** `/predict`
- **Content-Type**: `application/json`

### Request Format
```json
{
  "PersonnelID": 101,
  "Age": 35,
  "YearsOfService": 12,
  "Rank": "Squadron Leader",
  "Specialization": "Pilot",
  "PerformanceRating": 4,
  "TrainingCoursesCompleted": 9,
  "MissionSuccessRate": 98.5,
  "MedicalFitnessScore": 96,
  "PeerReviewScore": 4.7,
  "CommandersAssessment": 4.8,
  "AttritionRisk": "Low"
}
```

### Response Format
```json
{
  "leadership_potential": "High",
  "attrition_risk": "Low"
}
```

## Key Features Comparison with Streamlit Version

| Feature | Streamlit | React Implementation |
|---------|-----------|---------------------|
| Authentication | ❌ None | ✅ Full login system |
| Form Interface | Basic sliders | ✅ Professional sliders with labels |
| Results Display | Simple metrics | ✅ Detailed cards with recommendations |
| Navigation | Single page | ✅ Multi-tab interface |
| Responsive Design | Limited | ✅ Full responsive design |
| Error Handling | Basic | ✅ Comprehensive error handling |
| Loading States | None | ✅ Loading indicators throughout |
| Professional Styling | Basic | ✅ IAF-themed professional design |

## File Structure

```
src/
├── components/
│   ├── Dashboard.jsx           # Main dashboard with tabs
│   ├── LoginPage.jsx          # Authentication interface
│   ├── PersonnelForm.jsx      # Prediction form component
│   ├── ProtectedRoute.jsx     # Route protection
│   └── ResultsDisplay.jsx     # Results visualization
├── context/
│   └── AuthContext.jsx        # Authentication context
├── services/
│   └── api.js                 # API service layer
├── App.jsx                    # Main app component
├── App.css                    # Custom styles
└── main.jsx                   # Entry point
```

## License

This project is developed for the Indian Air Force Personnel Management System.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
