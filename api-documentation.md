### Wszystkie adresy endpointów, o których mowa poniżej, zaczynają się od adresu hosta. Przy pracy developerskiej jest to 'http://localhost:3001'. W kodzie powinno to być zapisane w zmiennej, aby można było to łatwo zmienić przy wrzucaniu na serwer.

#### Spis treści:

1. [Import studentów](#1-import-studentów)
2. [Dodawanie HR](#2-dodawanie-hr)
3. [Logowanie](#3-logowanie)
4. [Wylogowywanie](#4-wylogowywanie)
5. [Token JWT](#5-token-jwt)
6. [Mail aktywacyjny](#6-mail-aktywacyjny)
7. [Zmiana hasła](#7-zmiana-hasła)
8. [Resetowanie hasła](#8-resetowanie-hasła)
9. [Moduł Kursanta (profil i dane inicjacyjne)](#9-moduł-kursanta-profil-i-dane-inicjacyjne)
10. [Moduł hr](#10-moduł-hr)

## 1. Import studentów:

- `/import/students` POST
- plik csv lub json - interface `StudentInitialInterface[]`,<br/> a więc tablica obiektów:<br/>
  StudentInitialInterface {<br/>
  email: string;<br/>
  courseCompletion: number;<br/>
  courseEngagement: number;<br/>
  projectDegree: number;<br/>
  teamProjectDegree: number;<br/>
  bonusProjectUrls: string[];<br/>
  }
- wysyłane są maile aktywacyjne i hasło pierwszego logowania
- nie są wyrzucane błędy w walidacji tylko w odpowiedzi jest zwracany json:
  <br/> {message: [<br/>
  {email (email, który nie przeszedł walidacji): errorDetails (tablica stringów z błędami walidacji)},<br/>
  ]}
- res: json {ok: true} jeżeli przeszło bez błędów | patrz wyżej

## 2. Dodawanie HR:

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
- res - json: {ok: true} | patrz wyżej

## 3. Logowanie:

- `/login` POST
- body: {email: string, password: string}
- do ciasteczka httpOnly jest dodawany token jwt, który przechowuje dane - interface UserFromReq
- dostępny publicznie
- jeżeli błędne dane logowania zwracany wyjątek Forbidden exception
- res - json: {id: string} jeżeli poprawne dane

## 4. Wylogowywanie:

- `/logout` POST
- następuje czyszczenie ciasteczka z tokenem
- res - json: {ok: true}

## 5. Token jwt:

- przechowuje informacje o id usera i jego roli
- na podstawie tokenu następuje identyfikacja usera w aplikacji
- można pobrać dane - interface UserFromReq - z req.user

## 6. Mail aktywacyjny:

- podczas dodawania studenta/hr zostaje wysłany mail aktywacyjny
- `/user/activate/id/activationToken` GET
- podczas aktywacji ustawiany jest isActive na true i activationToken na null

## 7. Zmiana hasła:

- `/user/change-pass` PATCH
- body: {oldPwd: string; newPwd: string}
- sprawdza czy stare hasło jest prawidłowe i jeżeli tak to zmienia w bazie danych
- res - json: {ok: true}

## 8. Resetowanie hasła:

- `/user/reset-pass` PATCH
- body: {email: string}
- metoda szuka usera z podanym mailem i jeżeli znajduje to zmienia hasło na nowe, wygenerowane automatycznie i wysyła maila z tym hasłem a jeżeli nie to wyrzuca wyjątek Forbidden exception
- res - json: {ok: true}

## 9. Moduł kursanta (profil i dane inicjacyjne)

### Pobieranie wszystkich profilów studentów:

- adres `/student` metoda: GET, zwraca tablicę obiektów z danymi studentów:<br/>
StudentProfileInterface {<br/>
  id: string;<br/>
  initialData: StudentInitialInterface | null;<br/>
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
  status: StudentStatus;<br/>
  }
- adres `/student/:id` metoda: GET, zwraca pojedynczy obiekt wg `StudentProfileInterface` (patrz wyżej)
- adres `/student` metoda: POST, przyjmuje w body obiekt `StudentProfileInterface`, dodaje nowy profil kursanta, zwraca nowy obiekt.
- adres `/student/:id` metoda: PATCH, przyjmuje w body obiekt `StudentProfileInterface`, aktualizuje profil kursanta, zwraca zaktualizowany obiekt.
- adres `/student/initial` metoda: GET, zwraca tablicę obiektów z danymi inicjacyjnymi dla profili kursantów:<br/>
`StudentInitialInterface` {<br/>
  email: string;<br/>
  courseCompletion: number;<br/>
  courseEngagement: number;<br/>
  projectDegree: number;<br/>
  teamProjectDegree: number;<br/>
  bonusProjectUrls: string[];<br/>
  }
- adres `/student/initial/:email` metoda: GET, zwraca pojedynczy obiekt `StudentInitialInterface` (patrz wyżej)

## 10. Moduł hr

- adres `/hr/` metoda: GET
- adres `/hr/:id` metoda: GET
