# 10 Kroków uruchomienia środowiska testowego oraz samej aplikacji.


### 1. Uruchamiamy backend i frontend, oraz bazy danych. 
To oczywiste, ale dla pewności sprawdzić też ten punkt.

### 2. Uruchamiamy mailslurper
Koniecznie z tej wersji: <br/> https://github.com/mailslurper/mailslurper/releases/tag/1.14.1
<br/>
   Po prostu, ściągnąć, rozpakować folder i uruchomić plik mailslurper.exe
   uruchomi się okienko wiersza poleceń z kilkoma linijkami logów — to jest właśnie ten mailslurper.<br/>
   `WAŻNE !` — nazwa tego okienka to ścieżka, pod którą mailslurper.exe się znajduje, ale przy uruchomieniu ta nazwa jest poprzedzona czasem słowem "Wybierz" (np. WybierzC:\Users\itd...). Wtedy należy kliknąć gdzieś w tym okienku, wcisnąć "enter" (słowo "Wybierz" zniknie z nazwy okienka), i dopiero potem je zminimalizować. Program działa sobie w tle.

### 3. Sprawdzenie, czy mailslurper działa. 
Wchodzimy na http://localhost:8080 i widzimy interfejs mailslurpera — działa. Jeśli nie, sprawdzić czy port 8080 nie jest zablokowany. Trzeba też sprawdzić port 8085. Kiedy wejdziemy na adres http://localhost:8085 w przeglądarce, powinno nam wyświetlić JSONa: `{"message":"Not Found"}`

### 4. Stworzenie profilu admina w aplikacji.
Aby później dodać innych użytkowników, musimy pierw stworzyć profil admina. W tym celu w Insomnii uruchamiamy http://localhost:3001/user/admin na metodzie POST, to wystarczy, aby stworzyć taki działający profil.

### 5. Wchodzimy w przeglądarce na adres frontu i logujemy się na profil admina.
Na stronie logowania uzupełniamy formularz następującymi danymi:<br/>
email: `admin@admin.com` hasło: `admin1`)

### 6. Importujemy listę kursantów z pliku .csv
Przykładowa zawartość pliku .csv poniżej.<br/>
Można skopiować, wkleić w jakimś edytorze tekstowym i zapisać jako .csv<br/>
`Uwaga !` — w pliku .md repozytorium zostały dodane `<br/>` żeby wyświetlało dane poprawnie na podglądzie — dlatego kopiować najlepiej z podglądu: <br/>
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

Można też użyć własnych danych, jednak należy zachować powyższą składnię pliku .csv 

#### Po zaimportowaniu listy kursantów z pliku .csv mamy w bazie danych uzupełnione tabele "Users" oraz "StudentInitial" o dane naszych studentów, a także rozesłane zostały emaile aktywacyjne do studentów z danymi z pliku.

### 7. Odczytujemy emaila aktywacyjnego.
Wchodzimy na interfejs mailslurpera (przez http://localhost:8080) i otwieramy jednego z emaili, które są tam widoczne.

### 8. Kopiujemy link aktywacyjny z tego emaila
Przykładowy link z treści emaila:<br/> `http://localhost:3001/user/activate/1ed2e45b-bb4e-4176-a1c6-d87f7= 232c240/bdc07655-9760-11ee-9906-309c2381f43b`
#### `UWAGA !` Treści tych emaili są zniekształcane przez mailslurpera, dlatego w linkach jest zawsze błąd: dodatkowa spacja i znak równości. Dlatego trzeba ręcznie poprawić link aktywacyjny. Poprawny link aktywacyjny (używając przykładu) powinien wyglądać tak: <br/> `http://localhost:3001/user/activate/1ed2e45b-bb4e-4176-a1c6-d87f7232c240/bdc07655-9760-11ee-9906-309c2381f43b`<br/> Trzeba zawsze poszukać w linku tego znaku równości i spacji `'= '` i je skasować, następnie wklejając w przeglądarkę bez tych znaków.

### 9. Aktywacja użytkownika.
Po uruchomieniu w przeglądarce poprawnie wklejonego linka nastąpi aktywacja oraz przekierowanie na stronę logowania, a w bazie danych zostanie ustawiony status użytkownika na aktywny oraz wyczyszczony token aktywacyjny.

### 10. Logowanie.
Logujemy się na konto aktywowanego kursanta przy pomocy jego emaila oraz tymczasowego hasła podanego w powyższym emailu.
<hr/>

## W podobny sposób możemy aktywować też profil rekrutera, tylko na początku w panelu admin trzeba wpisać dane rekrutera i zatwierdzić, wtedy przyjdzie email z danymi aktywacyjnymi — aktywujemy i logujemy się tak samo, jak w przypadku kursanta.

#### Trzeba wziąć pod uwagę, że kiedy mailslurper zostanie zrestartowany, emaile z hasłami mogą przepaść. Wtedy cały proces trzeba powtórzyć, aby przeprowadzić testy na tych użytkownikach. Można też te hasła z emaili sobie zapisać i je cały czas używać z tymi danymi (o ile dane w bazie danych się nie zmienią). Ewentualnie można sobie hasła z emaili zmienić na jakieś własne i też gdzieś zapisać albo zapamiętać. Jeśli natomiast chcemy przeprowadzać testy na innych danych, można wszystkie dane z tabel usunąć. Najlepiej robić to przez usuwanie całych tabel; można przez polecenie `drop table` w SQL. W Heidi można też w taki sposób; klikamy na bazę megak_headhunter w lewym okienku, wtedy w prawym pojawiają się tabele, zaznaczamy je i PPM wybieramy 'usuń'.
<hr/>

## BONUS ! 
Możesz ułatwić sobie proces testowania, używając gotowej bazy danych. <br/>
Wystarczy na naszej bazie danych po prostu wykonać SQL z tego [pliku](./repo_utils/example-database.sql). <br/>
Stworzymy w ten sposób bazę danych, która zawiera kilka gotowych do użycia kont użytkowników oraz rekruterów. <br/>
By ułatwić testowanie, hasła użytkowników zostały ustawione na słowa, które zawiera pierwsza część adresu email — według wzoru: <br/> 
adres: `aaa@test.pl`, hasło: `aaa`
<br/>lub<br/>
adres: `firma@test.pl` hasło: `firma`