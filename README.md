# MegaK HeadHunter
Created during the MegaK programming course.

The app allows easily connect people from HR departments of companies, including Headhunters, with people looking for a job in IT.

## Useful links

[Api documentation](https://github.com/ligrys-dev/megak-v3-headhunter-be-gr2/blob/develop/api-documentation.md) <br/>
[Running the test environment step by step](https://github.com/ligrys-dev/megak-v3-headhunter-be-gr2/blob/develop/run-test-documentation.md)

## Key Features:

- ### Admin:
  - adding a csv file with students' initialization data
  - registration of recruiters
- ### Student:
  - creating and editing a profile
  - showing CV
  - indicating by student, that she or he has been employed
- ### Recruiter:
  - View a list of available students
  - Selecting students for conversation on a separate list
  - Rejecting unselected students
- ### User
  - profile activation via a link sent by e-mail
  - password change
  - recovery
  - login and authorization

## Technologies used:

- backend
  - nodejs
  - Nest.js
  - typeorm
  - mySQL
  - typescript
  - bcrypt
  - passport.js
  - jwt
  - multer
  - papaparse
  - nodemailer
  - class validator, class transformer
- frontend
  - react
  - react-router
  - react-hook-form
  - typescript
  - vite
  - papaparse
  - react-icons

## Running the application locally

### Backend

create a directory with the project,
<br/>for example:

```
mkdir megak_headhunter
```

go to this directory and download the code from the repository

```
cd ./megak_headhunter
```

```
git clone https://github.com/ligrys-dev/megak-v3-headhunter-be-gr2.git
```

```
cd ./megak-v3-headhunter-be-gr2
```

edit configuration files:

- .env.example -> rename it to .env set your environment variable values

open phpMyAdmin or another SQL client and create a database matching the database name from your .env file

```
npm install
nest start --watch
```

### Frontend

```
cd ~/megak_headhunter
git clone https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2.git
cd ./megak-v3-headhunter-fe-gr2
npm install
npm run dev
```

## Screenshots

### Login
![Login](https://raw.githubusercontent.com/ligrys-dev/megak-v3-headhunter-fe-gr2/main/src/repo_utils/screenshots/login.jpg)

### Admin view - welcome screen
![Admin - welcome](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/admin-main-view.jpg?raw=true)

### Admin - adding students
![Admin - add students](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/admin-adding-students.jpg?raw=true)

### Admin - adding recruiter
![Admin - add recruiter](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/admin-adding-hr.jpg?raw=true)

### Student - welcome screen
![Student - welcome](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/student-welcome.jpg?raw=true)

### Student - profile view
![Student profile](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/student-data.jpg?raw=true)

### Student - edit profile data
![Student - edit profile](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/student-data-edit.jpg?raw=true)

### Student - notifications
![Student - notifications](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/student-notifications.jpg?raw=true)

### Recruiter - welcome screen
![HR - welcome](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/recruiter-welcome.jpg?raw=true)

### Recruiter - available students view
![HR - students view](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/recruiter-students-available.jpg?raw=true)

### Recruiter - students for conversation view
![HR - conversation](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/recruiter-students-conversation.jpg?raw=true)

### Recruiter - student's CV preview
![HR - cv view](https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2/blob/main/src/repo_utils/screenshots/recruiter-students-conversation-cv.jpg?raw=true)
