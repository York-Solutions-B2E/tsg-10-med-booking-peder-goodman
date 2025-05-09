# Medical Appointment Booking Portal  
**Individual Assessment**

---

## **Objective**  
Create an appointment booking system for a healthcare facility. This system will allow patients to create, view, and manage appointments with doctors or other healthcare professionals. 

---

## **Core Features**

### **Appointment Creation**
- **Form Details**:
  - Patients can create new appointments by specifying:
    - Patient’s full name and date of birth.
    - Specialization of doctor (See specializations.json below).
    - Doctor (dropdown select).
      - Disabled until a specialization is selected.
      - Should only display doctors that match the selected specialization.
    - Appointment date and time.
    - Visit type (in-person or telehealth).
- **Validations**:
    - All fields are required.
    - Date and time must be in the future.
    - Patients cannot book more than one appointment with the same doctor on the same day.
- **On Submission**:
    - Display a modal confirming the user wants to proceed with a short summary of the details.
      - If the appointment is in-person, include a disclaimer that the patient must arrive 15 minutes before the scheduled appointment time.
    - On save, auto-generate a unique appointment ID for the appointment.

### **Appointment List & Details**
- Display a table of appointments, including:
  - Appointment ID, patient name, doctor name, date, time, and visit type.
  - Status (e.g., confirmed, canceled).
- Allow users to:
  - Edit appointments (all details except the appointment ID can be changed).
  - Cancel appointments, requiring confirmation via a modal.
  - (Nice-to-have) Sort and filter the table by any column (e.g., date, doctor name, visit type).

### **Doctor Management**
- A separate Doctor Management page allows admins to:
  - View the list of all doctors (name, specialization, and availability).
  - Add new doctors to the list.
  - Edit or delete existing doctors (requires confirmation modal).
  - **Note:** This requires a login screen for admins to log-in, and this module is only accessible for these admins.

### **Other Requirements**
- There should be a navigation bar at the top allowing a user to navigate to appointment creation, appointment list, and, if admin, doctor management. There should also be an Admin Login link allowing admins to log in.
- Database tables include appointments, specializations, doctors

---

## **Tech Stack**

### **Frontend**
- React.  
- Choose between Tailwind, Bootstrap, or Material UI for styling/components. 

### **Backend**
- Java+Spring Boot.
- PostgreSQL.
- Okta

### **Containerization**
- The application must be Dockerized.
- Frontend:
  - Create a Dockerfile for the React app to run on an Nginx server.
- Backend:
  - Create a Dockerfile for the Spring Boot application.
- Database:
  - Use the official PostgreSQL Docker image.
Use a Docker Compose file to orchestrate all services (frontend, backend, and database).

### **Data**
- **Specializations** (JSON): Seed this data into the specializations database table.
```json
{
    "specializations": [
        {
            "id": 1,
            "name": "Cardiology"
        },
        {
            "id": 2,
            "name": "Pediatrics"
        },
        {
            "id": 3,
            "name": "Dermatology"
        },
        {
            "id": 4,
            "name": "Orthopedics"
        },
        {
            "id": 5,
            "name": "Neurology"
        }
    ]
}
```  
---

## **Deliverables**

1. **Source Code**:
   - React frontend and Spring Boot backend.
   
2. **Documentation**:
   - A detailed README with:
     - Setup and installation instructions.
     - Steps for running the application locally in Docker containers.
     - Database schema and seed data.
     - Commands for building and running the Docker containers.
3. **Demo**:
   - Give a 5 minute live demo of your application's functionality.

