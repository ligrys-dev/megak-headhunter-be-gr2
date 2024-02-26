# 10 steps to run testing environment and just the app.


### 1. Run the backend, frontend and the database. 
Just to be sure, check if all of it is working.

### 2. Run mailslurper
Be sure to use this version:: <br/> https://github.com/mailslurper/mailslurper/releases/tag/1.14.1
<br/>
Simply download, unpack the folder and run the mailslurper.exe file, a command prompt window with a few lines of logs will appear - this is the mailslurper.<br/>
   `IMPORTANT !` — in the name of the mailslurper window appears the path where mailslurper.exe is located, but when you start the mailslurper app the name is sometimes preceded by the word "Select" (e.g. `SelectC:\Users\etc...`). Then you should click somewhere in this window, press "enter" (the word "Select" will disappear from the window name), and only then minimize it. The program runs in the background.

### 3. Check if mailslurper is working. 
Open http://localhost:8080 in your browser and then you will see mailslurper interface = is working. If not, check if 8080 port is not blocked. You need to check also 8085 port. When you open http://localhost:8085 in your browser, it should display JSON: `{"message":"Not Found"}` - that is good.

### 4. Creating an admin profile in the application.
To add anny other users, first we need to create an admin profile. To do this, in Insomnia we run http://localhost:3001/user/admin using the POST method, this is enough to create such a working profile.

### 5. Run frontend in your browser and log in to the admin profile.
On the login page, we complete the form with the following data:<br/>
email: `admin@admin.com` hasło: `admin1`)

### 6. Import the list of students from the .csv file
Sample content of the .csv file you can find below.<br/>
You can copy it and paste it in any text editor and save as .csv<br/>
`ATTENTION !` — there are  `<br/>` added to the .md file of the repository to display correctly the data in preview, therefore it is best to copy from the preview:: <br/>
>email;courseCompletion;courseEngagement;projectDegree;teamProjectDegree;bonusProjectUrls<br/>
aaa@test.pl;3.5;2;5;3;https://megak.pl<br/>
bbb@test.pl;3.5;2;5;3;www.bbb.pl<br/>
ccc@test.pl;3.5;2;5;3;www.ccc.com<br/>
ddd@test.pl;3.5;2;5;3;www.ddd.de<br/>
eee@test.pl;3.5;2;5;3;https://eeej.ni<br/>
fff@test.pl;3.5;2;5;3;www.fafafafa.fr<br/>
ggg@test.pl;3.5;2;5;3;www.google.com<br/>
hhh@test.pl;3.5;2;5;3;https://hahaha.ha<br/>
jjj@test.pl;3.5;2;5;3;www.jajo.po<br/>
kkk@test.pl;3.5;2;5;3;www.kot.it<br/>

You can also use your own data, but please keep the above .csv file syntax 

#### After importing the list of students from the .csv file, the "Users" and "StudentInitial" tables in the database have been completed with our students data, and activation emails have been sent to students mentioned in the .csv file.

### 7. Read the activation email..
Open the mailslurpera interface (przez http://localhost:8080) and check one of the visible emails.

### 8. Copy the activation link from this email
Example link from the email content:<br/> `http://localhost:3001/user/activate/1ed2e45b-bb4e-4176-a1c6-d87f7= 232c240/bdc07655-9760-11ee-9906-309c2381f43b`
#### `ATTENTION !` The content of these emails is distorted by mailslurper, so the links always contain an error: an extra space and an equal sign. Therefore, you need to manually correct the activation link. The correct activation link (using the above example) should look like this: <br/> `http://localhost:3001/user/activate/1ed2e45b-bb4e-4176-a1c6-d87f7232c240/bdc07655-9760-11ee-9906-309c2381f43b`<br/> You should always find the equal sign and space '= ' in the link and delete them, then paste the correct link (without these characters) into the browser.

### 9. User activation.
After running the correctly pasted link in the browser, activation will occur and you will be redirected to the login page, and the user status will be set to active in the database and the activation token will be cleared.

### 10. Login.
Log in to the activated account using this student's e-mail address and the temporary password provided in the e-mail mentioned below.
<hr/>

## We can also activate the recruiter's profile in a similar way, but first, in the admin panel, you need to enter the recruiter's data and confirm it, then you will receive an e-mail with activation data - we activate and log in just in the same way as in the case of a student.

#### Please note that when mailslurper is restarted, emails with passwords may be lost. Then the whole process has to be repeated to test on these users. You can also save these passwords from emails and use them with these data all the time (as long as the data in the database does not change). Alternatively, you can change email passwords to your own and save them somewhere. However, if we want to test on other data, we can remove all data from the tables. This is best done by deleting entire tables; you can via the `drop table` command in SQL. In Heidi you can also do it this way; click on the megak_headhunter database in the left panel, then the tables appear in the right panel, select them and choice 'delete' from RMB menu.
<hr/>

## BONUS ! 
You can make the testing process easier with ready-to-use database. <br/>
You just need to execute SQL from this [file](./repo_utils/example-database.sql) on our database. <br/>
In this way, we will create a database that contains several ready-to-use user accounts (students and recruiters). <br/>
To make it even easier, user passwords have been set to the words contained in the first part of the email address - according to the example: <br/> 
e-mail: `aaa@test.pl`, password: `aaa`
<br/>or<br/>
e-mail: `firma@test.pl` password: `firma`