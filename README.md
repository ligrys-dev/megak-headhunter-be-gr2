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

###
