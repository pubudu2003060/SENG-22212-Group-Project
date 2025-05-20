
# PassMyFuel

## Fuel Quota Management System

### Overview of the system

PassMyFuel is a comprehensive fuel management system designed to improve the efficiency of fuel distribution for users, administrators, and fuel stations. The system consists of three main components:

#### User Portal:
- Users can register, log in, and generate a unique QR code for their fuel quota.

#### Admin Portal:
- Admins can manage user accounts, fuel stations, and overall system activities, ensuring smooth operations.

#### Mobile App (Fuel Stations):
- Fuel stations can scan users' QR codes to validate fuel requests, track the fuel quota, and manage fuel distribution.

---

## Tech Stack

### Backend:
- **Spring Boot**: A Java-based framework for building robust backend services.
- **Monolithic Architecture**: The backend follows a unified architecture with layers such as:
  - **Controller**: Handles incoming requests and forwards them to services.
  - **Service**: Contains business logic.
  - **Model**: Defines data structures.
  - **DTO (Data Transfer Object)**: Manages the data exchanged between client and server.
- **SQL Database**: A relational database to store data like user accounts, fuel quotas, and transaction records.

### External Services:
- **Twilio**: Used for sending SMS notifications (e.g., for user registration or fuel validation).
- **JWT Tokens**: Provides secure user authentication and authorization.

### Frontend:
- **Vite**: A fast and lightweight build tool for modern web applications.
- **React.js**: A JavaScript library for building dynamic and responsive user interfaces.
- **Bootstrap**: A CSS framework for responsive design and pre-built UI components.
- **Ant Design**: A comprehensive UI component library for React, designed for modern web applications.

### Dependencies:
- **React DOM**: Allows React to render components to the DOM.
- **JS Cookies**: A utility for handling cookies, particularly for managing authentication tokens.
- **Axios**: A promise-based HTTP client for making API requests from React to the backend.

### Libraries:
- **React Router DOM**: Manages navigation and routing between different views in the React app.
- **React Icon Kit**: To display icons throughout the React app.

### Mobile App (Fuel Stations):
- **Flutter**: A UI toolkit for building natively compiled mobile applications from a single codebase (for both iOS and Android).
- **Dart**: The programming language used with Flutter to develop mobile apps.

### Packages:
- **mobile_scanner**: A package to scan QR codes from users' devices at fuel stations.
- **http**: Dart's HTTP package for making network requests. Used to get data from the server based on the scanned QR code.

---

## Applications

1. **Vehicle Owner Portal (Vite React Web Application)**
   - A responsive web application where vehicle owners can register, log in, and generate unique QR codes for fuel purchases.

2. **Admin Portal (Vite React Web Application)**
   - A web application for administrators to manage users, fuel stations, and monitor the system’s overall operations and performance.

3. **Fuel Station Operator App (Flutter Application)**
   - A mobile app for fuel station operators to scan QR codes, validate fuel requests, and manage fuel distribution on-site.

4. **Backend API Server (Spring Boot)**
   - The backend API server, built with Spring Boot, that handles user authentication, fuel quotas, and manages data between vehicle owners, fuel stations, and the admin.

---

## Getting Started

### Prerequisites
Ensure you have the following installed before getting started:
- Java JDK
- Node.js
- Flutter SDK
- MySQL
- Maven

---

## Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/pubudu2003060/SENG-22212-Group-Project.git
   ```

2. Navigate to the backend directory:
   ```sh
   cd SENG-22212-Group-Project/Back-End
   ```

3. Configure database properties in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. Build and run the application:
   ```sh
   mvn spring-boot:run
   ```

---

## Frontend Setup

### User Portal Setup

1. Navigate to the User portal directory:
   ```sh
   cd SENG-22212-Group-Project/User
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

### Admin Portal Setup

1. Navigate to the Admin portal directory:
   ```sh
   cd SENG-22212-Group-Project/Admin
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

---

## Mobile App Setup (Flutter)

1. Navigate to the Mobile App directory:
   ```sh
   cd SENG-22212-Group-Project/Mobile-App
   ```

2. Get Flutter dependencies:
   ```sh
   flutter pub get
   ```

3. Run the application:
   ```sh
   flutter run
   ```

---

## Team Members
- **SE/2021/003** - Dilakshan
- **SE/2021/017** - Nethsarani J.A.R
- **SE/2021/021** - Rasadhi Sanchala
- **SE/2021/024** - Hiruni Ramanayaka
- **SE/2021/060** - Pubudu Madushan

---

