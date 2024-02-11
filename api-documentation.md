### All endpoint addresses mentioned below start with the host address. For development work, it is: 'http://localhost:3001'. In the code, this should be saved in a variable so that it can be easily changed during the releasing process on a server.

#### Table of contents:

1. [Students import](#1-students-import)
2. [Adding recruiter](#2-adding-recruiter)
3. [Logging in](#3-logging-in)
4. [Logging out](#4-logging-out)
5. [JWT token](#5-jwt-token)
6. [Activation e-mail](#6-activation-e-mail)
7. [Password changing](#7-password-changing)
8. [Password reset](#8-password-reset)
9. [Student module (profile and initial data)](#9-student-module-profile-and-initial-data)
   - [Getting all students profiles](#getting-all-students-profiles)
   - [Getting one student profile](#getting-one-student-profile)
   - [Creating new student profile](#creating-new-student-profile)
   - [Updating student profile](#updating-student-profile)
   - [List of initial data of students](#list-of-initial-data-of-students-and-with-profile-data-if-student-have-done-activation-and-filled-up-profile-data)
   - [Initial data of one student](#initial-data-of-one-student-and-with-profile-data-if-student-have-done-activation-and-filled-up-profile-data)
10. [HR module](#10-hr-module)
11. [Filtering, sorting and pagination of available students](#11-filtering-sorting-and-pagination-of-available-students)
12. [Getting yourself (your user data)](#12-getting-yourself-your-user-data)
13. [Student reservation](#13-student-reservation)
14. [Marking by the student that he or she has been hired](#14-marking-by-the-student-that-he-or-she-has-been-hired)
15. [Hiring student by recruiter](#15-hiring-student-by-recruiter)
16. [Restoring the "available" status to the student (in case of cancellation of the reservation)](#16-restoring-the-available-status-to-the-student-in-case-of-cancellation-of-the-reservation)
17. [Adding admin](#17-adding-admin)
18. [View of the tables in the database and the relationships between them](#18-view-of-the-tables-in-the-database-and-the-relationships-between-them)

## 1. Students import:

- `/import/students` POST
- UWAGA: Do testowania tego modułu potrzebny jest [mailslurper](https://github.com/mailslurper/mailslurper/releases/tag/1.14.1), po ściągnięciu po prostu odpalić mailslurper.exe i otworzyć adres http://localhost:8080 i upewnić się, że port 8085 też jest wolny.
- plik csv lub json - interface `StudentInitialInterface[]`,<br/> a więc tablica obiektów:<br/>
  `StudentInitialInterface` {<br/>
  email: string;<br/>
  courseCompletion: number;<br/>
  courseEngagement: number;<br/>
  projectDegree: number;<br/>
  teamProjectDegree: number;<br/>
  bonusProjectUrls: string[];<br/>
  profile?: StudentProfileInterface; `<< TEGO OCZYWIŚCIE NIE DODAJEMY PRZY TORZENIU, to będzie automatycznie przypisane przy stworzeniu swojego profilu przez kursanta`<br/>
  }<br/>
  Przykładowa zawartość pliku .csv :
  `email;courseCompletion;courseEngagement;projectDegree;teamProjectDegree;bonusProjectUrls
asd@asdghjghjghj.com;4;4;3;5;https://github.com/ligrys-dev/megak-v3-headhunter-be-gr2, https://github.com/ligrys-dev/megak-v3-headhunter-fe-gr2
ok@okrj6jfghjghj.com;2;2;2;2;www.cos.com,www.asd.com,www.aha.it
ssd@example.io;3;3;5;5;urlexample.asd,wp.pl,https://megak.pl
aaa@test.pl;3.5;2;5;1;https://megak.pl`
  Można to skopiować do edytora tekstowego i zapisać jako .csv zachowując odpowiednio entery.
- wysyłane są maile aktywacyjne i hasło pierwszego logowania<br/>
  (można to sprawdzić przez mailsluprer na http://localhost:8080)
- nie są wyrzucane błędy w walidacji tylko w odpowiedzi jest zwracany json: <br/>
  {type `FailedEmails`, type `SuccesfulEmails`}

## 2. Adding recruiter:

- `/user/recruiter` POST
- body: `RecruiterInterface`<br/> {
  id: string;<br/>
  email: string;<br/>
  fullName: string;<br/>
  company: string;<br/>
  maxReservedStudents: number;<br/>
  }
- w przypadku błędu w walidacji zwracany jest wyjątek Bad Request:<br/>
  {<br/>
  "message": <tablica stringów z błędami walidacji>,<br/>
  "error": "Bad Request",<br/>
  "statusCode": 400<br/>
  }<br/>
- res — json: {type `FailedEmails` (będzie pusty), type `SuccesfulEmails` (tablica z jednym elementem)}

## 3. Logging in:

- `/login` POST
- body: {email: string, password: string}
- do ciasteczka httpOnly jest dodawany token jwt, który przechowuje dane - interface UserFromReq
- dostępny publicznie
- jeżeli błędne dane logowania zwracany wyjątek Forbidden exception
- res - json: {id: string} jeżeli poprawne dane

## 4. Logging out:

- `/logout` POST
- następuje czyszczenie ciasteczka z tokenem
- res - json: {ok: true}

## 5. JWT Token:

- przechowuje informacje o id usera i jego roli
- na podstawie tokenu następuje identyfikacja usera w aplikacji
- można pobrać dane - interface UserFromReq - z req.user

## 6. Activation e-mail:

- podczas dodawania studenta/hr zostaje wysłany mail aktywacyjny
- `/user/activate/id/activationToken` GET
- podczas aktywacji ustawiany jest isActive na true i activationToken na null

## 7. Password changing:

- `/user/change-pass` PATCH
- body: {oldPwd: string; newPwd: string}
- sprawdza czy stare hasło jest prawidłowe i jeżeli tak to zmienia w bazie danych
- res - json: {ok: true}

## 8. Password reset:

- `/user/reset-pass` PATCH
- body: {email: string}
- metoda szuka usera z podanym mailem i jeżeli znajduje to zmienia hasło na nowe, wygenerowane automatycznie i wysyła maila z tym hasłem a jeżeli nie to wyrzuca wyjątek Forbidden exception
- res - json: {ok: true}

## 9. Student module (profile and initial data)

### Getting all students profiles:

- adres `/student` metoda: GET,
- zwraca tablicę obiektów z danymi studentów:<br/>
  `StudentProfileInterface` {<br/>
  id: string;<br/>
  initialData: `StudentInitialInterface`;<br/>
  tel: string | null;<br/>
  firstName: string;<br/>
  lastName: string;<br/>
  githubUsername: string;<br/>
  portfolioUrls: string[] | null;<br/>
  projectUrls: string[];<br/>
  bio: string;<br/>
  expectedTypeWork: TypeWork;<br/>
  targetWorkCity: string;<br/>
  expectedContractType: ContractType;<br/>
  expectedSalary: number | null;<br/>
  canTakeApprenticeship: boolean;<br/>
  monthsOfCommercialExp: number;<br/>
  education: string | null;<br/>
  workExperience: string | null;<br/>
  courses: string | null;<br/>
  }

### Getting one student profile

- adres `/student/:id` metoda: GET,
- zwraca pojedynczy obiekt wg `StudentProfileInterface` (patrz wyżej)

### Creating new student profile

- adres `/student` metoda: POST,
- przyjmuje w body obiekt `StudentProfileInterface`,
- dodaje nowy profil kursanta,
- wraca tenże nowy obiekt.

### Updating student profile

- adres `/student/:id` metoda: PATCH,
- przyjmuje w body obiekt `StudentProfileInterface`,
- aktualizuje profil kursanta,
- zwraca zaktualizowany obiekt.

### List of initial data of students (and with profile data if student have done activation and filled up profile data)

- adres `/student/initial` metoda: GET,
- zwraca tablicę obiektów z danymi inicjacyjnymi dla profili kursantów:<br/>
  `StudentInitialInterface` {<br/>
  email: string;<br/>
  courseCompletion: number;<br/>
  courseEngagement: number;<br/>
  projectDegree: number;<br/>
  teamProjectDegree: number;<br/>
  bonusProjectUrls: string[];<br/>
  }

### Initial data of one student (and with profile data if student have done activation and filled up profile data)

- adres `/student/initial/:email` metoda: GET,
- zwraca pojedynczy obiekt `StudentInitialInterface` (patrz wyżej)

## 10. HR module

- adres `/hr` metoda: GET
- adres `/hr/:id` metoda: GET

## 11. Filtering, sorting and pagination of available students

- adres `student/list/:status/:page/:take?orderBy=&filters=` metoda GET
- parametr status jest opcjonalny — domyślnie przyjmuje 0
- status: 0 - dostępni studenci (domyślnie), 1 - w trakcie rozmowy, 2 - zatrudnieni
- parametry page i take są opcjonalne. Domyślnie page przyjmuje wartość 1 a take 10
- parametry query również są opcjonalne, jeżeli nic się nie przekaże, lista nie zostanie przefiltrowana ani posortowana
- jeżeli chcemy zmienić jakiś parametr, trzeba przekazać wszyskie wcześniejsze, np: jeżeli chcemy zmienić tylko nr strony to musimy podać także status
- id hr pobierane jest z zalogowanego usera, także nie trzeba, bo przekazywać
- query `orderBy` - odpowiedzialne za sortowanie — przyjmuje wartość z enuma `StudentOrderByOptions`
- query `filters` - odpowiedzialne za filtrowanie — przyjmuje obiekt filters, który implementuje interface `StudentFilters`, każde z pól jest opcjonalne
- filters w adresie url musi zostać przekształcone do stringa i componentu url: `const encoded = (encodeURIComponent(JSON.stringify(filters))`
- zwracany jest json: {students(tablica ze studentami), studentsCount(liczba pobranych studenów), numberOfPages(liczba stron)}
- przykładowy endpoint: `http://localhost:3001/student/list/0/2/5?orderBy=profile.expectedSalary&filters=%7B%22courseCompletion%22%3A2%2C%22projectDegree%22%3A5%2C%22profile.expectedContractType%22%3A0%2C%22githubUsername%22%3A%22foobar%22%7D`

## 12. Getting yourself (your user data)

- adres `/user` metoda GET
- pobiera swoją encję za pomocą id usera z requestu
- zwracany jest json zawierający id, email, rolę i encję studenta(wraz z profilem) lub hr — w zależności od roli.

## 13. Student reservation

- adres `/hr/reserve/:email` metoda PATCH
- parametr email — email studenta, którego chcemy zarezerwować
- zmienia status studenta na do rozmowy
- przypisuje studenta do rekrutera
- dodaje datę wygaśnięcia rezerwacji na za 10 dni

## 14. Marking by the student that he or she has been hired

- adres `/student/hired` metoda PATCH
- metoda dozwolona dla kursanta
- zmienia status studenta na zatrudniony
- student jest pobierany z zalogowanego usera, nie trzeba nigdzie przekazywać id ani emaila

## 15. Hiring student by recruiter

- adres `/hr/hire/:email` metoda PATCH
- parametr email — email studenta, którego chcemy zatrudnić
- zmienia status studenta na zatrudniony

## 16. Restoring the "available" status to the student (in case of cancellation of the reservation)

- adres `/hr/available/:email` metoda PATCH
- metoda dozwolona dla rekrutera
- zmienia status studenta na available
- student jest pobierany na podstawie jego id z danych profilowych

## 17. Adding admin

- adres `/user/admin` metoda POST
- body: {email: string, password: string}
- dodać nagłówek: x-password, który zawiera hasło potrzebne do stworzenia admina (w .env)
- trzeba to zrobić w insomni/postmanie itp

## 18. View of the tables in the database and the relationships between them:

![database](./database-relations.jpg)
