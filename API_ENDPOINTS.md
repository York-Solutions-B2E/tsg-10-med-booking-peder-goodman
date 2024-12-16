# API Examples
[Back to Documentation](./README.md)
## Authentication

### Check User Authentication

- **URL**: `/api/auth/check`
- **Method**: `GET`
- **Headers**: withCredentials: true
- **Description**: Checks if the user is authenticated.
- **Response**:
  ```json
  {
    "authenticated": true,
    "userDetails": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "ADMIN"
    },
    "message": "User authenticated!"
  }
  ```

### Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Headers**: withCredentials: true, "X-XSRF-TOKEN
- **Description**: Logs out the user.
- **Response**:
  ```json
  {
    "message": "Logout Successful!",
    "idToken": "eyJraWQiOiJ...",
    "logoutUrl": "https://dev-11992601.okta.com/oauth2/default/v1/logout"
  }
  ```

## Patients

### Validate Patient

- **URL**: `/api/patients/validate`
- **Method**: `GET`
- **Headers**: withCredentials: true
- **Description**: Validates if a patient exists.
- **Response**:
  ```json
  true
  ```

### Create New Patient

- **URL**: `/api/patients/create`
- **Method**: `POST`
- **Headers**: withCredentials: true
- **Description**: Creates a new patient.
- **Request Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "birthdate": "1990-01-01"
  }
  ```
- **Response**:
  ```json
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "birthdate": "1990-01-01",
    "patientAppointments": []
  }
  ```

### Login Patient

- **URL**: `/api/patients/login`
- **Method**: `POST`
- **Headers**: withCredentials: true
- **Description**: Logs in a patient.
- **Request Body**:
  ```json
  {
    "email": "jane.doe@example.com",
    "birthdate": "1990-01-01"
  }
  ```
- **Response**:
  ```json
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "birthdate": "1990-01-01",
    "patientAppointments": []
  }
  ```

### Get Patient Details

- **URL**: `/api/patients/details/{patientId}`
- **Method**: `GET`
- **Headers**: withCredentials: true
- **Description**: Retrieves patient details by ID.
- **Response**:
  ```json
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "birthdate": "1990-01-01",
    "patientAppointments": []
  }
  ```

## Doctors

### Create New Doctor

- **URL**: `/api/doctors/create`
- **Method**: `POST`
- **Headers**: withCredentials: true
- **Description**: Creates a new doctor.
- **Request Body**:
  ```json
  {
    "firstName": "Dr. John",
    "lastName": "Smith",
    "specialization": {
      "id": 1,
      "name": "Cardiology"
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "Doctor Created!"
  }
  ```

### Update Doctor

- **URL**: `/api/doctors/edit`
- **Method**: `PUT`
- **Headers**: withCredentials: true
- **Description**: Updates doctor information.
- **Request Body**:
  ```json
  {
    "id": 1,
    "firstName": "Dr. John",
    "lastName": "Smith",
    "specialization": {
      "id": 1,
      "name": "Cardiology"
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "Doctor Updated!"
  }
  ```

### Delete Doctor

- **URL**: `/api/doctors/delete/{doctorId}`
- **Method**: `DELETE`
- **Headers**: withCredentials: true
- **Description**: Deletes a doctor by ID.
- **Response**:
  ```json
  {
    "message": "Doctor Deleted! Doctor id is: 1"
  }
  ```

### Get List of Doctors and Specializations

- **URL**: `/api/doctors/doctors-specializations`
- **Method**: `GET`
- **Headers**: withCredentials: true
- **Description**: Retrieves a list of doctors and their specializations.
- **Response**:
  ```json
  {
    "specializations": [
      {
        "id": 1,
        "name": "Cardiology"
      },
      {
        "id": 2,
        "name": "Dermatology"
      }
    ],
    "doctors": [
      {
        "id": 1,
        "firstName": "Dr. John",
        "lastName": "Smith",
        "specialization": {
          "id": 1,
          "name": "Cardiology"
        }
      }
    ]
  }
  ```

### Get Doctor by ID

- **URL**: `/api/doctors/get/{doctorId}`
- **Method**: `GET`
- **Headers**: withCredentials: true
- **Description**: Retrieves doctor details by ID.
- **Response**:
  ```json
  {
    "id": 1,
    "firstName": "Dr. John",
    "lastName": "Smith",
    "specialization": {
      "id": 1,
      "name": "Cardiology"
    },
    "doctorAppointments": []
  }
  ```

## Appointments

### Create New Appointment

- **URL**: `/api/appointments/create`
- **Method**: `POST`
- **Headers**: withCredentials: true
- **Description**: Creates a new appointment.
- **Request Body**:
  ```json
  {
    "patient": {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "birthdate": "1990-01-01"
    },
    "doctor": {
      "id": 1,
      "firstName": "Dr. John",
      "lastName": "Smith",
      "specialization": {
        "id": 1,
        "name": "Cardiology"
      }
    },
    "appointmentDate": "2023-10-01",
    "appointmentTime": "10:00",
    "visitType": "IN_PERSON"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Appointment Created!"
  }
  ```

### Update Appointment Details

- **URL**: `/api/appointments/update/details`
- **Method**: `PUT`
- **Headers**: withCredentials: true
- **Description**: Updates appointment details.
- **Request Body**:
  ```json
  {
    "id": 1,
    "patient": {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "birthdate": "1990-01-01"
    },
    "doctor": {
      "id": 1,
      "firstName": "Dr. John",
      "lastName": "Smith",
      "specialization": {
        "id": 1,
        "name": "Cardiology"
      }
    },
    "appointmentDate": "2023-10-01",
    "appointmentTime": "10:00",
    "visitType": "IN_PERSON",
    "appointmentStatus": "BOOKED"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Appointment Details Updated!"
  }
  ```

### Cancel Appointment

- **URL**: `/api/appointments/cancel/{appointmentId}`
- **Method**: `PUT`
- **Headers**: withCredentials: true
- **Description**: Cancels an appointment by ID.
- **Response**:
  ```json
  {
    "message": "Appointment Canceled!"
  }
  ```
