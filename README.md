# ⚡ FitnessAPP - Calorie Tracker & Macro Dashboard

A full-stack health-tracking prototype designed to serve as a user's daily food journal. Built for the **Quantiphi Vibe Coding Assessment**, this application calculates nutritional intake in real-time, manages strict calorie budgets, and provides dynamic visual feedback.

## ✨ Core Features

* **Dynamic "Vibe Check" Goals:** Users can seamlessly toggle between *Weight Loss*, *Maintenance*, and *Muscle Gain*. The backend dynamically recalculates thresholds and updates the UI without losing logged data.
* **Server-Side Nutrient Scaling:** All business logic, calculations, and validations are strictly handled on the Express backend. The engine mathematically scales macros based on user weight inputs against a 100g baseline.
* **Persistent File Storage:** Upgraded from in-memory arrays to persistent data storage using Node's native `fs` module. Meals are saved to a `database.json` file, ensuring data survives server restarts.
* **Interactive Visualizations:** Integrated **Recharts** to provide a beautiful, animated bar chart comparing current macronutrient intake against daily target limits.
* **Smart Autocomplete Logging:** The frontend features a smart-search dropdown that anticipates known foods, dramatically improving user experience and preventing data-entry errors.
* **Real-Time Validation & Alerts:** Features dynamic UI state shifts (Blue to Crimson Red) when budgets are exceeded, backed by sleek **React-Hot-Toast** popup notifications for all user actions.
* **AI Scanner Simulation:** A one-click mock image upload feature that auto-fills predefined nutritional data to simulate AI integration.

## 🛠️ Tech Stack

**Frontend:**
* React.js (via Vite for lightning-fast HMR)
* Tailwind CSS (Utility-first styling & dynamic state colors)
* Recharts (Interactive data visualization)
* Axios (HTTP client)
* React-Hot-Toast (Premium UI notifications)

**Backend:**
* Node.js
* Express.js (REST API endpoints)
* Native File System (`fs`) (Persistent JSON database)

## 🚀 How to Run Locally

Because this is a true full-stack application with strict client/server separation, you will need to run two terminal windows simultaneously.

### 1. Clone the Repository
```bash
git clone [https://github.com/nehal-kumar/FitnessAPP.git](https://github.com/nehal-kumar/FitnessAPP.git)
cd FitnessAPP
