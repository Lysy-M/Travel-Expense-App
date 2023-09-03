# Travel-Expense-App ( W trakcie prac )

Aplikacja ma na celu obsługę interakcji z użytkownikiem i wykonywanie różnych obliczeń związanych z podróżami służbowymi, kosztami diety, wydatkami podróży np. Hotel, Pociąg itd. oraz przebiegiem samochodu.
Aplikacja posiada dwie sekcje:

Sekcja Dla Użytkownika:

W tej sekcji kodu znajdują się wszystkie funkcje i interakcje, które są dostępne dla użytkowników, którzy korzystają z aplikacji w celu wprowadzenia danych o podróży oraz paragonach. Główne funkcje w tej sekcji to:

Dodawanie paragonów: Użytkownik może wybierać różne typy paragonów (np. taksówka) oraz wprowadzać kwoty odpowiadające każdemu paragonowi.
Wprowadzanie dat podróży: Użytkownik może wybierać daty rozpoczęcia i zakończenia podróży.
Zaznaczanie dni diety: Użytkownik może wybierać daty, w których dieta ma być zastosowana, korzystając z kalendarza.
Obliczanie kosztów: Na podstawie wprowadzonych danych, użytkownik może obliczać łączny koszt podróży, uwzględniający diety, przebieg samochodu oraz koszty paragonów.
Sekcja dla użytkownika koncentruje się na dostarczeniu interfejsu umożliwiającego użytkownikowi wprowadzanie danych związanych z podróżą oraz obliczanie kosztów na podstawie tych danych.

Sekcja Dla Administratora: ( Dostęp przy uzyciu kodu PIN i edycja stawek w fazie budowy )

Ta sekcja zawiera funkcje i interakcje, które są dostępne tylko dla administratora aplikacji. Administrator ma dostęp do zaawansowanych opcji i ustawień, które mogą wpłynąć na sposób działania aplikacji. Główne funkcje w tej sekcji to:

Wyświetlanie i ukrywanie opcji administratora: Administrator ma możliwość wyświetlania lub ukrywania sekcji z zaawansowanymi opcjami.
Ustawianie stawek i limitów: Administrator może ustawiać stawki diety, stawki za przebieg samochodu, limity rodzajów wydatków oraz całkowity limit wydatków.
Opcje dla przebiegu samochodu: Administrator może zastosować lub wyłączyć opcję dotyczącą przebiegu samochodu.
Zarządzanie kalendarzem diety: Administrator może dodawać daty wyłączeń diety oraz kontrolować, kiedy dieta jest zastosowana.
Sekcja dla administratora jest bardziej zaawansowana i ma na celu umożliwienie administratorowi dostosowania zachowania aplikacji oraz zarządzanie ustawieniami.

Opis funkcji kodu.

Inicjalizacja zmiennych:
Na początku kodu inicjalizowane są różne zmienne reprezentujące elementy na stronie, takie jak pola tekstowe, checkboxy, przyciski, itp. Te zmienne są później wykorzystywane do manipulowania zawartością strony.

Przypisanie akcji do przycisku "Opcje administratora":
Przycisk "Opcje administratora" po kliknięciu pokazuje lub ukrywa sekcję zawierającą opcje dostępne dla administratora.

Aktualizacja opisów paragonów:
Funkcja updateReceiptDescriptions służy do aktualizowania opisów paragonów na podstawie ich indeksu i nazwy.

Obliczenia związane z podróżami:
Kody związane z obliczeniami różnicy dni podróży, kosztu diety oraz kosztu przebiegu samochodu są dostępne w funkcjach getDaysDifference, calculateDietCost i calculateMileageCost. Te funkcje wykonują obliczenia na podstawie danych wprowadzonych przez użytkownika.

Dodawanie paragonów:
Funkcja addReceipt służy do dodawania informacji o nowych paragonach do listy. Dla każdego paragonu tworzony jest kontener zawierający opis, pole do wprowadzenia kwoty i przycisk do usuwania.

Aktualizacja łącznego kosztu:
Funkcja updateTotalAmount służy do aktualizowania łącznej sumy kosztów na podstawie wprowadzonych kwot paragonów.

Aktualizacje związane z opcjami podróży:
Funkcje takie jak updateTotalTravelDays, updateTotalCostWithOptions oraz inne, odpowiadają za aktualizację kosztów w zależności od wybranych opcji podróży, takich jak dieta czy przebieg samochodu.

Aktualizacje kosztów z uwzględnieniem ukrytych pól:
Wiele funkcji korzysta z ukrytych pól formularza, aby pobrać informacje na temat stawek diety, stawek przebiegu samochodu i innych ukrytych danych.

Nasłuchiwanie zdarzeń:
Kod zawiera wiele nasłuchiwaczy zdarzeń, które reagują na zmiany w polach formularza, wyborach opcji, itp. Po zmianach wywoływane są odpowiednie funkcje do aktualizacji wyników.

Kalendarz diety:
W kodzie są fragmenty dotyczące kalendarza diety, w którym użytkownik może wybierać daty, w których dieta jest lub nie jest zastosowana. Funkcje takie jak disableDietCalendar obsługują ten kalendarz.
