# Studend Details Management System

## Description

The Studend Details Management System is a web application designed to help users manage and track SAT scores and student information. It provides a user-friendly interface for adding, editing, and deleting student records, as well as calculating student ranks based on SAT scores.

## Features

- Add new student records with detailed information.
- Edit existing student records, including SAT score updates.
- Delete student records.
- Calculate student ranks based on SAT scores.
- User-friendly interface for easy data management.
- Responsive design for a seamless experience on various devices.

## Screenshots

![ScreenshotAlt text](<Screenshot 2023-10-06 191623.png>)
_Screenshot 1: Home Page_

![Alt text](<Screenshot 2023-10-06 191635.png>)
_Screenshot 2: Add Student Record Form_

![Alt text](<Screenshot 2023-10-06 191645.png>)
_Screenshot 3: Edit Student Record_

## Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/yourusername/sat-score-management.git
   ```

2. Change to the project directory:

   ```
   cd sat-score-management
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

5. The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

1. Open the application in your web browser.

2. Use the "Create" button to add new student records.

3. Use the "Edit" button to update existing student records, including deleting details, Updating SAT Scores and getting ranks.

## API Endpoints

The application uses the following API endpoints for data management:

- `GET /satdata`: Retrieve a list of all student records.
- `POST /satdata`: Add a new student record.
- `PUT /satdata/updatescore?name=<student_name>&satScore=<new_score>`: Update a student's SAT score by name.
- `DELETE /satdata/delete?name=<student_name>`: Delete a student record by name.
- `GET /satdata/getrank?name=<student_name>`: Calculate rank in backend and retrieve the rank of a student by name.

## Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- HTML/CSS
- JavaScript
