'use strict';

const movieMenu = document.getElementById('movies');
const seatSelect = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('price-total');

populateUI();

let ticketPrice = parseInt(movieMenu.value);

// FUNCTION - to save selected Movie + Price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// FUNCTION - update Total count & price + save selectedSeatIndex to localStorage + setMovieData to localStorage
function seatSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatIndex = [...selectedSeats].map((seat) => [...seatSelect].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieMenu.selectedIndex, movieMenu.value);
}

// FUNCTION - Get data from localStorage and populateUI
function populateUI() {
  const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (storedSelectedSeats !== null && storedSelectedSeats.length > 0) {
    seatSelect.forEach((seat, index) => {
      if (storedSelectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}

// LISTENER - Movie Menu select
movieMenu.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  populateUI();
});

// LISTENER - Seat select
seatSelect.forEach((seat) =>
  seat.addEventListener('click', function (e) {
    seat.classList.toggle('selected');
    seatSelectedCount();
  })
);

seatSelectedCount();
