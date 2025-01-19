Mim Test Backend

Requirements

API Endpoints

Below is a list of API endpoints along with examples of their requests and responses:
1.	Authentication

POST /auth/login
Request:
{ "email": "example@example.com", "password": "password123" }

Response:
{ "message": "Login successful", "token": "your_jwt_token" }

POST /auth/register
Request:
{ "name": "John Doe", "email": "johndoe@example.com", "password": "password123" }

Response:
{ "message": "Registration successful", "_id": "12345" }

POST /auth/logout
Request: No body required.
Response:
{ "message": "Logout successful" }

2.	User Management

GET /user/
Request: No body required.
Response:
[ { "id": "12345", "name": "John Doe", "email": "johndoe@example.com" }, { "id": "67890", "name": "Jane Doe", "email": "janedoe@example.com" } ]

PUT /user/update/:userId
Request:
{ "name": "Updated Name", "email": "updated@example.com" }

Response:
{ "message": "User updated successfully" }

DELETE /delete/:userId
Request: No body required.

Response:
{ "message": "User deleted successfully" }

Setup Instructions
	1.	Clone the repository:
git clone https://github.com/waleed46shah/mim-test-be.git
cd mim-test-be
	2.	Install dependencies:
npm install
	3.	Configure the database:
	•	Create a .env file in the project root and add your database credentials:


PORT=8080
MONGODB_URI="key"
JWT_SECRET="mysecretkey"


	4.	Start the application:
npm run dev
	5.	Visit the app at:
http://localhost:8080

Tech Stack
	•	Backend: Node.js, Express, Typescript
	•	Database: MongoDB
	•	Authentication: JWT (JSON Web Token) with cookies to handle session on backend
	•	Others: Bcrypt
