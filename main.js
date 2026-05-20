const validSeats = Array.from(document.querySelectorAll(".row .seat:not(.occupied)"));
const container = document.querySelector(".container");

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
let priceOfMovie = parseInt(movieSelect.value);

(function () {
    //////////////////////////////////////
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats != null && selectedSeats.length > 0) {
        validSeats.forEach(function (seat, index) {
            if (selectedSeats.includes(index)) {
                seat.classList.add("selected");
            }
        })
    }
    ///////////////////////////////////////
    const selectedMovieIndex = localStorage.getItem("IndexOfMovie");
    const selectedMoviePrice = JSON.parse(localStorage.getItem("ValueOfMovie")); // important make this number
    console.log(selectedMoviePrice);
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    updateSelectedCount(selectedMoviePrice);
})();


function setMovieData(index, value) {
    localStorage.setItem("IndexOfMovie", JSON.stringify(index));
    localStorage.setItem("ValueOfMovie", JSON.stringify(value));
}

movieSelect.addEventListener("change", (e) => {
    priceOfMovie = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value); //return index of selector
    updateSelectedCount(priceOfMovie);
})

function updateSelectedCount(price) {
    const seats = Array.from(document.querySelectorAll(".row .seat.selected"));
    // Local Storage
    let indexOfSeats = seats.map((seatByseat) => validSeats.indexOf(seatByseat));
    localStorage.setItem("selectedSeats", JSON.stringify(indexOfSeats));

    console.log(seats.length, (seats.length * price));
    count.innerHTML = seats.length;
    total.innerHTML = (seats.length * price);
}

validSeats.forEach((e) => {
    e.addEventListener("click", (ele) => {
        e.classList.toggle("selected");
        updateSelectedCount(priceOfMovie);
    })
})


