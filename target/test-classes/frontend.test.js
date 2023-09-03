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