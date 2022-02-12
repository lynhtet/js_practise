document.querySelector("#loan-form").addEventListener("submit", (e) => {
    document.querySelector("#loader").style.display = "block";
    document.querySelector("#result").style.display = "none";

    setTimeout(() => {
        calculate();
    }, 1000);

    e.preventDefault();
});

function calculate() {
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value * 12);

    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        document.querySelector("#loader").style.display = "none";
        document.querySelector("#result").style.display = "block";
    } else {
        showError("Please check the number input!");
    }
}

function showError(msg) {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("#result").style.display = "none";

    const error = document.createElement("div");
    error.className = "alert alert-danger";
    error.appendChild(document.createTextNode(msg));

    const cardBody = document.querySelector(".card-body");
    const head = document.querySelector(".card-title");

    cardBody.insertBefore(error, head);

    setTimeout(() => {
        removeError();
    }, 2000);
}

function removeError() {
    document.querySelector(".alert").remove();
}