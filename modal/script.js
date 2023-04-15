'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');
const openModalBtns = document.querySelectorAll('.show-modal');

// Close the modal
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Close modal with Escape key
const closeModalEscapeKey = function (e) {
  if (e.code === 'Escape' && !modal.classList.contains('hidden')) closeModal();
};

// Show the modal
const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Add event listeners for the three buttons in the page.
for (let i = 0; i < openModalBtns.length; i++) {
  openModalBtns[i].addEventListener('click', openModal);
}

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModalEscapeKey);
