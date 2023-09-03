// Czekaj, aż cała strona zostanie załadowana
document.addEventListener("DOMContentLoaded", function () {
  const receiptList = document.getElementById("receipt-list"); // - Lista paragonów
  const receiptTypeSelect = document.getElementById("receipt-type"); // - Dodaj paragon:
  const totalExpenseField = document.getElementById("total-amount"); // - Całkowity zwrot kosztów:
  const totalReceiptsField = document.getElementById("total-receipts-field");
  const travelDateInput = document.getElementById("travel-date"); // - Data podróży (od)
  const secondTravelDateInput = document.getElementById("second-travel-date"); // - Data podróży (do):
  const totalTravelDaysInput = document.getElementById("total-travel-days"); // - Suma dni podróży:
  const applyDietCheckbox = document.getElementById("apply-diet"); // - Zastosuj dietę:
  const applyMileageCheckbox = document.getElementById("apply-car"); // - Zastosuj przebieg samochodu:
  const mileageField = document.getElementById("car-distance"); // - Przejechany dystans (km):
  const mileageRateField = document.getElementById("admin-car-mileage-rate"); // - Stawka za przebieg samochodu (USD/km):
  const distanceLimitField = document.getElementById(
    "admin-car-distance-limit"
  ); // - Odległość graniczna dla samochodu:
  const adminDailyDietRateField = document.getElementById(
    "admin-daily-diet-rate"
  ); // - Dzienna stawka diety ($):
  const adminAvailableExpenseTypesSelect = document.getElementById(
    "admin-available-expense-types"
  ); // - Dostępne rodzaje wydatków:
  const adminExpenseTypeLimitsInput = document.getElementById(
    "admin-expense-type-limits"
  ); // - Limity rodzajów wydatków:
  const adminTotalExpenseLimitInput = document.getElementById(
    "admin-total-expense-limit"
  ); // - Całkowity limit wydatków:
  const adminPinInput = document.getElementById("admin-pin-input");
  const disableDietInput = document.getElementById("disable-diet"); // - Wyłącz dietę w dniach:
  const adminSaveChangesButton = document.getElementById(
    "admin-save-changes-button"
  );
  const adminOptionsSection = document.getElementById("admin-options-section"); // - sekcja opcje administratora
  const adminOptionsButton = document.getElementById("admin-options-button"); // - przycisk opcje administratora
  const adminFields = document.querySelectorAll(
    "#admin-options-section input, #admin-available-expense-types"
  );
  const adminEditButton = document.getElementById("admin-edit-button");
  const emailField = document.getElementById("email");
  // const editableFields = document.querySelectorAll(".editable-field"); // Dodaj klasę "editable-field" do pól edytowalnych
  const showFormButton = document.getElementById('showFormBtn');
  const formContainer = document.getElementById('formContainer');
 
  let originalOptions = [];

  // Pobierz ukryte pole formularza // Przeniesione
  const hiddenField = document.getElementById("admin-daily-diet-rate");

  // Pobierz wartość z ukrytego pola formularza // Przeniesione
  const hiddenFieldValue = hiddenField.value;

  // Możesz teraz wykorzystać hiddenFieldValue w swoim kodzie
  console.log("Wartość z ukrytego pola:", hiddenFieldValue);

  // Inne zmienne globalne
  let receipts = {};

  // Zmienna do śledzenia, czy sekcja jest otwarta
  let adminSectionOpen = false;

  // Funkcja do sprawdzania poprawności PIN-u // Przeniesione
  function checkPinAndToggleSection() {
    if (!adminSectionOpen) {   
      const enteredPin = prompt("Proszę wprowadzić PIN:");

      if (enteredPin === "0000") {
        adminOptionsSection.style.display = "block";
        adminOptionsButton.textContent = "Zamknij";
        adminSectionOpen = true;
      } else {
        alert("Nieprawidłowy PIN. Dostęp zabroniony.");
      }
    } else {
      adminOptionsSection.style.display = "none";
      adminOptionsButton.textContent = "Opcje Administratora";
      adminSectionOpen = false;
    }
  }

  // Nasłuchiwanie kliknięcia przycisku "Opcje administratora" // Przeniesione
  if (adminOptionsButton) {
    adminOptionsButton.addEventListener("click", checkPinAndToggleSection);
  }

  // Funkcja aktualizująca opisy paragonów // Przeniesione
  function updateReceiptDescriptions() {
    Object.keys(receipts).forEach(function (receiptId, index) {
      const receipt = receipts[receiptId];
      const receiptContainer = document.getElementById(receiptId);

      // Aktualizacja opisu paragonu na liście
      receiptContainer.querySelector(".receipt-description").textContent = `${
        index + 1
      }. ${receipt.name}`;
    });
  }
  // Funkcja obliczająca różnicę w dniach między dwiema datami oblicza liczbę dni, które mieszczą się w określonym zakresie dat i jednocześnie znajdują się w podanej tablicy wybranych dat // Przeniesiony
  function getDaysDifference(startDate, endDate, selectedDates) {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const start = new Date(startDate);
    const end = new Date(endDate);
    let days = 0;

    while (start <= end) {
      const isSelected = selectedDates.some(
        (date) => new Date(date).toDateString() === start.toDateString()
      );
      if (isSelected) {
        days++;
      }
      start.setTime(start.getTime() + oneDay);
    }

    return days;
  }

  // Funkcja obliczająca koszt diety - wykonuje obliczenia dotyczące kosztu diety na podstawie liczby dni, w których dieta jest zastosowana, oraz stawki diety.
  function calculateDietCost(dietDays, dietRate) { // Przeniesiony
    return dietDays * dietRate;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //    // Funkcja obliczająca koszt przebiegu - Funkcja nie liczy po wyżej limitu
  //    function calculateMileageCost(mileage, mileageRate, distanceLimit) {
  //        if (mileage <= distanceLimit) {
  //            return mileage * mileageRate;
  //        } else {
  //            return distanceLimit * mileageRate;
  //        }
  //    }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Funkcja obliczająca koszt przebiegu - Funkcja liczy po wyżej limitu - wykonuje obliczenia dotyczące kosztu przebiegu na podstawie podanej liczby przejechanych kilometrów, stawki za kilometr oraz limitu dystansu.  // Przeniesiony
  function calculateMileageCost(mileage, mileageRate, distanceLimit) {
    if (mileage <= distanceLimit) {
      return 0; // Koszt jest równy 0, bo nie przekroczyłeś limitu
    } else {
      const exceededDistance = mileage - distanceLimit; // Obliczamy przekroczony dystans
      return exceededDistance * mileageRate; // Obliczamy koszt za przekroczony dystans
    }
  }

  // Funkcja sprawdzająca, czy dwie daty są takie same - służy do porównywania dwóch dat, aby sprawdzić, czy są one takie same, bez uwzględniania godzin // Przeniesione
  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Funkcja do dodawania paragonu - służy do dodawania informacji o nowym paragonie do listy paragonów oraz do interakcji z użytkownikiem w celu wprowadzenia kwoty paragonu.  // Przeniesiony
  function addReceipt(selectedName) {
    // Tworzenie kontenera dla paragonu
    const receiptContainer = document.createElement("div");
    receiptContainer.className = "receipt-container column";
    const receiptId = `receipt-${Object.keys(receipts).length}`;
    receiptContainer.id = receiptId;

    // Tworzenie opisu paragonu
    const receiptDescription = document.createElement("div");
    receiptDescription.className = "receipt-description";
    receiptDescription.textContent = selectedName;

    // Tworzenie pola wprowadzania kwoty paragonu
    const receiptAmount = document.createElement("input");
    receiptAmount.className = "receipt-amount";
    receiptAmount.placeholder = "Kwota paragonu";

    // Tworzenie przycisku usuwania
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Usuń";

    // Tworzenie opakowania dla kwoty i przycisku usuwania
    const receiptAmountWrapper = document.createElement("div");
    receiptAmountWrapper.className = "receipt-amount-wrapper";
    receiptAmountWrapper.appendChild(receiptAmount);
    receiptAmountWrapper.appendChild(deleteButton);

    // Dodawanie elementów do kontenera paragonu
    receiptContainer.appendChild(receiptDescription);
    receiptContainer.appendChild(receiptAmountWrapper);

    // Tworzenie elementu listy dla paragonu
    const receiptItem = document.createElement("li");
    receiptItem.className = "receipt-item";
    receiptItem.appendChild(receiptContainer);

    // Dodawanie elementu listy do listy paragonów
    receiptList.appendChild(receiptItem);

    // Zapisywanie informacji o paragonie
    receipts[receiptId] = { name: selectedName, amount: receiptAmount };

    // Nasłuchiwanie zmiany kwoty paragonu
    receiptAmount.addEventListener("input", updateReceiptsAndTotal);

    // Nasłuchiwanie kliknięcia przycisku usuwania
    deleteButton.addEventListener("click", function () {
      delete receipts[receiptId];
      receiptItem.remove();
      updateReceiptsAndTotal();
    });
  }

  // Funkcja aktualizująca opisy paragonów i łączny koszt - odpowiada za wyświetlenie sumy -  odpowiada za aktualizowanie opisów paragonów oraz łącznej sumy kosztów.
  function updateReceiptsAndTotal() {
    updateReceiptDescriptions();
    updateTotalAmount();
  }

  // Nasłuchiwanie zmian w opcjach // Przeniesione
  applyDietCheckbox.addEventListener("change", updateTotalCostWithOptions);
  applyMileageCheckbox.addEventListener("change", updateTotalCostWithOptions);
  mileageField.addEventListener("input", updateTotalCostWithOptions);

  // Dodatkowe nasłuchiwanie zmian w kalendarzu diet // Przeniesione
  document.querySelectorAll(".flatpickr-day").forEach(function (day) {
    day.addEventListener("click", updateTotalCostWithOptions);
  });

  // Nasłuchiwanie zmiany typu paragonu // Przeniesione
  receiptTypeSelect.addEventListener("change", function () {
    const selectedValue = receiptTypeSelect.value;
    addReceipt(selectedValue === "taxi" ? "Taksówka" : selectedValue);
  });

  // Nasłuchiwanie zmiany daty podróży // Przeniesione
  travelDateInput.addEventListener("change", updateTotalTravelDays);
  secondTravelDateInput.addEventListener("change", updateTotalTravelDays);
  mileageField.addEventListener("input", updateTotalTravelDays);

  // Funkcja aktualizująca liczbę dni podróży na podstawie wybranych dat. // Przeniesiony
  function updateTotalTravelDays() {
    const startDate = new Date(travelDateInput.value);
    const endDate = new Date(secondTravelDateInput.value);

    if (startDate && endDate && startDate <= endDate) {
      const timeDifference = endDate - startDate;
      const daysDifference =
        Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;
      totalTravelDaysInput.value = daysDifference;

      if (disableDietCalendar) {
        const selectedDates = getDaysBetweenDates(startDate, endDate).map(
          (date) => date.getTime()
        );

        // Pobierz daty wyłączone przez użytkownika z kalendarza diet
        const disabledDates = disableDietCalendar.selectedDates.map((date) =>
          date.getTime()
        );

        // Usuń daty wyłączone przez użytkownika z listy dat podróży
        const travelDatesWithoutDisabled = selectedDates.filter(
          (date) => !disabledDates.includes(date)
        );

        // Ustaw daty podróży w kalendarzu diet
        disableDietCalendar.setDate(travelDatesWithoutDisabled);
      }
      // Ustaw tekst w polu "disable-diet"
      disableDietInput.value = "Wyłącz dietę w dniach";
    } else {
      totalTravelDaysInput.value = "";

      if (disableDietCalendar) {
        // Wyczyść daty w kalendarzu diet,
        // jeśli daty podróży są niepoprawne
        disableDietCalendar.clear();
      }
    }
    if (disableDietCalendar) {
      const selectedDates = getDaysBetweenDates(startDate, endDate);

      // Wyczyść daty w kalendarzu diet przed ustawieniem nowych dat
      disableDietCalendar.clear();

      // Ustaw daty podróży w kalendarzu diety
      disableDietCalendar.setDate(selectedDates);
    }

    // Aktualizacja kosztów po zmianie dat podróży
    updateTotalCost();
  }

  applyDietCheckbox.addEventListener("change", updateTotalCost); // Przeniesione

  // Inicjalizacja kalendarza wyłączeń diety
  const disableDietCalendar = flatpickr(disableDietInput, {
    mode: "multiple",
    dateFormat: "Y-m-d",
    onClose: function (selectedDates, dateStr, instance) {
      if (selectedDates.length > 0) {
        disableDietInput.value = "Wyłącz lub Włącz dietę w dniach";
      } else {
        disableDietInput.value = "Wyłącz lub Włącz dietę w dniach";
      }
    },
  });

  // Funkcja do obliczania kosztu diety i przebiegu - do obliczania łącznych kosztów związanych z dietą i przebiegiem (koszty diety oraz koszty związane z przejechanymi kilometrami) na podstawie wybranych dat oraz stawek za dietę i przebieg. // Przeniesione
  function calculateDietAndMileageCost(  
    startDate,
    endDate,
    dietRate,
    mileageRate
  ) {
    const selectedDietDates = disableDietInput.selectedDates.map(
      (date) => new Date(date)
    );
    const travelDays = getDaysBetweenDates(startDate, endDate).filter(
      (date) => !selectedDietDates.some((d) => isSameDate(d, date))
    );
    const dietDays = getDaysDifference(startDate, endDate, selectedDietDates);
    const dietCost = calculateDietCost(dietDays, dietRate);
    const mileageCost = calculateMileageCost(
      parseFloat(mileageField.value) || 0,
      mileageRate,
      parseFloat(distanceLimitField.value) || 0
    );

    return { dietCost, mileageCost };
  }

  // Funkcja aktualizująca łączny koszt na podstawie obliczonych kosztów diety i przebiegu, a także uwzględniając inne koszty związane z paragonami.
  function updateTotalCost(dietCost, mileageRate) {
    const totalExpenseField = document.getElementById("total-amount");
    const applyMileageCheckbox = document.getElementById("apply-car");
    const mileageField = document.getElementById("car-distance");
    const mileageRateField = document.getElementById("admin-car-mileage-rate");
    const distanceLimitField = document.getElementById(
      "admin-car-distance-limit"
    );

    let totalCost = 0;

    // Obliczenia dotyczące stawki diety
    if (applyDietCheckbox.checked) {
      // dodałem if
      totalCost += parseFloat(dietCost);
    }

    // Obliczenia dotyczące przebiegu
    if (applyMileageCheckbox.checked) {
      const mileage = parseFloat(mileageField.value) || 0;
      const mileageRate = parseFloat(mileageRateField.value) || 0;
      const distanceLimit = parseFloat(distanceLimitField.value) || 0;
      const mileageCost = calculateMileageCost(
        mileage,
        mileageRate,
        distanceLimit
      );
      totalCost += mileageCost;
    }

    // Pozostałe koszty paragonów
    const receiptsCost = parseFloat(totalExpenseField.value) || 0;
    totalCost += receiptsCost;

    // Aktualizacja pola sumującego koszty
    totalExpenseField.value = totalCost.toFixed(2);
  }
//CZWARTEK 24
  // Nasłuchiwanie zmiany kwoty paragonu // Przeniesione
  receiptAmount.addEventListener("input", function () {
    updateTotalCost();
  });

  // Funkcja zwracająca listę dni pomiędzy dwoma datami ///Przeniesione
  function getDaysBetweenDates(startDate, endDate) {
    const days = [];
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      days.push(new Date(date));
    }
    return days;
  }

  // Funkcja aktualizująca łączny koszt oraz wyświetlania sumy paragonów. // Przeniesiony
  function updateTotalAmount() {
    const totalExpenseField = document.getElementById("total-amount");
    const totalReceiptsField = document.getElementById("total-receipts-field");

    let totalAmount = Object.keys(receipts).reduce(function (total, key) {
      const amountValue = parseFloat(receipts[key].amount.value) || 0;
      return total + amountValue;
    }, 0);

    totalExpenseField.value = totalAmount.toFixed(2);
    totalReceiptsField.textContent = `Suma paragonów: ${
      Object.keys(receipts).length
    }`;
  }

  // Funkcja do pobierania danych z ukrytych pól na stronie i zwracania ich w formie obiektu.
  function getHiddenFieldData() {
    const hiddenElements = findHiddenElements(); // Wywołujemy funkcję findHiddenElements() do uzyskania ukrytych elementów

    const dietRate = parseFloat(hiddenElements.dietRateField.value) || 0;
    const mileageRate = parseFloat(hiddenElements.mileageRateField.value) || 0;
    const availableExpenseTypes = hiddenElements.availableExpenseTypes.value;
    const expenseTypeLimits =
      parseFloat(hiddenElements.expenseTypeLimits.value) || 0;
    const totalExpenseLimit =
      parseFloat(hiddenElements.totalExpenseLimit.value) || 0;
    const carDistanceLimit =
      parseFloat(hiddenElements.carDistanceLimit.value) || 0;

    return {
      ...hiddenElements, // Rozprzestrzeniamy właściwości hiddenElements
      dietRate,
      mileageRate,
      availableExpenseTypes,
      expenseTypeLimits,
      totalExpenseLimit,
      carDistanceLimit,
    };
  }

  // Funkcja aktualizująca łączny koszt podróży  w zależności od wybranych opcji. // Przeniesiony
  function updateTotalCostWithOptions() {
    const dietRate = parseFloat(adminDailyDietRateField.value) || 0;
    const mileageRate = parseFloat(mileageRateField.value) || 0;
    const isDietApplied = applyDietCheckbox.checked;
    const mileage = parseFloat(mileageField.value) || 0;
    const distanceLimit = parseFloat(distanceLimitField.value) || 0;

    let totalCost = 0;

    if (isDietApplied) {
      const selectedDates = document.querySelectorAll(
        ".flatpickr-day.selected"
      );
      const dietDays = selectedDates.length;
      const dietCost = calculateDietCost(dietDays, dietRate);
      totalCost += dietCost;
    }

    if (applyMileageCheckbox.checked) {
      const mileageCost = calculateMileageCost(
        mileage,
        mileageRate,
        distanceLimit
      );
      totalCost += mileageCost;
    }

    // Dodatkowe koszty z paragonów
    Object.keys(receipts).forEach(function (receiptId) {
      const receiptAmountValue =
        parseFloat(receipts[receiptId].amount.value) || 0;
      totalCost += receiptAmountValue;
    });

    totalExpenseField.value = totalCost.toFixed(2);
  }

  // Funkcja aktualizująca pole "disable-diet" i łączny koszt na podstawie wybranych dat w kalendarzu diet.
  function updateDietCalendar() {
    const selectedDietDates = disableDietInput.selectedDates.map(
      (date) => new Date(date)
    );
    const allDates = getDaysBetweenDates(startDate, endDate); // Zakładam, że masz dostęp do funkcji getDaysBetweenDates
    const unselectedDietDates = allDates.filter(
      (date) => !selectedDietDates.some((d) => isSameDate(d, date))
    );

    updateDisableDietField(unselectedDietDates);
    updateTotalCostWithOptions();
  }

  // Funkcja, która przyjmuje dwie zmienne: days (liczba dni podróży) oraz dietRate (stawka diety).
  function updateTotalAmountWithDiet(days, dietRate) {
    const totalAmountField = document.getElementById("total-amount");
    const applyDietCheckbox = document.getElementById("apply-diet"); // Dodaj tę linię

    if (applyDietCheckbox.checked) {
      /// SOBOTA DODAŁEM NOWE - PONIŻEJ STARE
      // Obliczanie łącznej kwoty z uwzględnieniem diety
      const totalAmount = days * dietRate;
      totalAmountField.value = totalAmount.toFixed(2);
    } else {
      // Ustawienie łącznej kwoty bez diety
      const receiptsCost = parseFloat(totalExpenseField.value) || 0;
      totalAmountField.value = receiptsCost.toFixed(2);
    }
  }


  // Nasłuchiwanie zmiany stanu checkboxa "Zastosuj dietę" // Przeniesione
  applyDietCheckbox.addEventListener("change", function () {
    const hiddenElements = getHiddenFieldData();
    const days = calculateTravelDays(); // Obliczenie liczby dni podróży
    const dietRate = hiddenElements.dietRate; // Pobranie stawki diety z ukrytych elementów
    updateTotalAmountWithDiet(days, dietRate);
  });

  // Nasłuchiwanie zmiany daty podróży // Przeniesione
  travelDateInput.addEventListener("change", function () {
    const hiddenElements = getHiddenFieldData();
    const days = calculateTravelDays(); // Obliczenie liczby dni podróży
    const dietRate = hiddenElements.dietRate; // Pobranie stawki diety z ukrytych elementów
    updateTotalAmountWithDiet(days, dietRate);
  });
  // Przeniesione
  secondTravelDateInput.addEventListener("change", function () {
    const hiddenElements = getHiddenFieldData();
    const days = calculateTravelDays(); // Obliczenie liczby dni podróży
    const dietRate = hiddenElements.dietRate; // Pobranie stawki diety z ukrytych elementów
    updateTotalAmountWithDiet(days, dietRate);
  });

  // Nasłuchiwanie zmiany ilości przejechanych kilometrów // Przeniesione
  mileageField.addEventListener("input", function () {
    const hiddenElements = getHiddenFieldData();
    const days = calculateTravelDays(); // Obliczenie liczby dni podróży
    const dietRate = hiddenElements.dietRate; // Pobranie stawki diety z ukrytych elementów
    updateTotalAmountWithDiet(days, dietRate);
  });

  // Funkcja oblicza liczbę dni podróży na podstawie wybranych dat w polach podróży (travelDateInput i secondTravelDateInput)
  function calculateTravelDays() {
    const startDate = new Date(travelDateInput.value);
    const endDate = new Date(secondTravelDateInput.value);

    if (startDate && endDate && startDate <= endDate) {
      const timeDifference = endDate - startDate;
      const daysDifference =
        Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;
      return daysDifference;
    }
    return 0;
  }

  // Początkowa wartość stawki diety
  let dietRate = 0;
//CZWARTEK 24
  mileageField.addEventListener("input", updateTotalCostWithHiddenRatesAndDiet);

  // Aktualizacja łącznego kosztu na podstawie ukrytych stawek i danych o diecie w odpowiedzi na zmiany w polach "Zastosuj dietę", "Data podróży" i "Druga data podróży".
  function updateTotalCost(dietCost, mileageRate) {
    // Nasłuchiwanie zmian w kalendarzu diet
    applyDietCheckbox.addEventListener("change", updateTotalCostWithOptions);

    // Nasłuchiwanie zmian w przebiegu
    mileageField.addEventListener("input", updateTotalCostWithOptions); ///DODANE SOBOTA 20.30////
  }

  // Usunięcie nasłuchiwania fokusu na polu PIN  // Przeniesione
  adminPinInput.removeEventListener("focus", showNumericKeyboard);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  // Funkcja do włączania/wyłączania edycji pól
  function toggleFieldEditing(enableEditing) {
    console.log("toggleFieldEditing called. enableEditing:", enableEditing);
    for (const field of editableFields) {
      console.log("Setting disabled:", !enableEditing);
      field.disabled = !enableEditing;
    }
  }

  const editableFields = [
    adminDailyDietRateField,
    distanceLimitField,
    adminAvailableExpenseTypesSelect,
    emailField,
    adminExpenseTypeLimitsInput,
    adminTotalExpenseLimitInput
  ];
  

  // Obsługa przycisku Edytuj
  adminEditButton.addEventListener("click", function () {
  toggleFieldEditing(true);
  adminEditButton.disabled = true; // Wyłącz przycisk "Edytuj"
  adminSaveChangesButton.disabled = false; // Włącz przycisk "Zapisz zmiany"
  });
  // Obsługa przycisku Zapisz zmiany
  adminSaveChangesButton.addEventListener("click", () => {
  toggleFieldEditing(false);
  // adminSaveChangesButton.disabled = true; // Wyłącz przycisk "Zapisz zmiany"
  // adminEditButton.disabled = false; // Włącz przycisk "Edytuj" z powrotem
  });

  showFormButton.addEventListener('click', () => {
  formContainer.style.display = 'block';
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Obsługa przycisku Opcje Administratora // Przeniesione
  adminOptionsButton.addEventListener("click", () => {
    adminOptionsSection.style.display = "block"; // Pokaż sekcję Opcje Administratora
  });

  // Po zaznaczeniu lub odznaczeniu pola "Zastosuj dietę", wywołaj funkcję aktualizującą koszty // Przeniesione
  document.getElementById("apply-diet").addEventListener("change", function () {
    const hiddenElements = getHiddenFieldData();
    updateTotalCostWithHiddenRatesAndDiet(hiddenElements, dietRate); //SOBOTA DODAŁEM DIETRATE
  });

  disableDietInput.addEventListener("click", function (event) { // Przeniesione
    disableDietInput._flatpickr.open(); // Otwiera kalendarz diet
    event.preventDefault(); // Zatrzymaj domyślne zachowanie przycisku
  });

  // Po zmianie daty podróży, wywołaj funkcję aktualizującą koszty // Przeniesione
  document
    .getElementById("travel-date")
    .addEventListener("change", function () {
      const hiddenElements = getHiddenFieldData();
      updateTotalCostWithHiddenRatesAndDiet(hiddenElements);
    });

  document
    .getElementById("second-travel-date")
    .addEventListener("change", function () {
      const hiddenElements = getHiddenFieldData();
      updateTotalCostWithHiddenRatesAndDiet(hiddenElements);
    });

  // Nasłuchiwanie zmiany stanu checkboxa "Zastosuj przebieg samochodu" // Przeniesione
  applyMileageCheckbox.addEventListener("change", updateTotalCost);

  // Nasłuchiwanie zmiany ilości przejechanych kilometrów // Przeniesione
  mileageField.addEventListener("input", updateTotalCost);

  // Po zmianie daty podróży, wywołaj funkcję aktualizującą koszty // Przeniesione
  travelDateInput.addEventListener("change", function () {
    const hiddenElements = getHiddenFieldData();
    updateTotalCostWithHiddenRatesAndDiet(hiddenElements);
  });

  // Funkcja dla zmiany daty podróży // Przeniesione
  secondTravelDateInput.addEventListener("change", function () {
    const hiddenElements = getHiddenFieldData();
    updateTotalCostWithHiddenRatesAndDiet(hiddenElements);
  });
////////////////////////////NIE WIEDZIAŁEM, ŻE TAK MOŻNA I BĘDZIE DZIAŁAĆ//////////////////////////////////////////////
  document.addEventListener('DOMContentLoaded', () => {
    const showFormButton = document.getElementById('showFormBtn');
    const formContainer = document.getElementById('formContainer');

    showFormButton.addEventListener('click', () => {
        formContainer.style.display = 'block';
    });

    const totalReceiptsField = document.getElementById('total-receipts-field');
    const receiptTypeSelect = document.getElementById('receipt-type');
    const receiptList = document.getElementById('receipt-list');

    receiptTypeSelect.addEventListener('change', () => {
        const receiptType = receiptTypeSelect.value;
        if (receiptType !== 'empty') {
            const receiptAmount = parseFloat(prompt(`Podaj kwotę paragonu (${receiptType}):`));
            if (!isNaN(receiptAmount)) {
                const listItem = document.createElement('li');
                listItem.textContent = `${receiptType}: $${receiptAmount.toFixed(2)}`;
                receiptList.appendChild(listItem);
                updateTotalReceiptsField();
            }
        }
    });

    function updateTotalReceiptsField() {
        const receiptItems = receiptList.querySelectorAll('li');
        let totalAmount = 0;
        receiptItems.forEach(item => {
            const [, amountText] = item.textContent.split(': ');
            const amount = parseFloat(amountText.substring(1));
            totalAmount += amount;
        });
        totalReceiptsField.textContent = `Łączna kwota paragonów: $${totalAmount.toFixed(2)}`;
    }
});

});
