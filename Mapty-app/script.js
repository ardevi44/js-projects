'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Could not get your position');
      });
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 17);
    this.#map.invalidateSize();
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // L.marker(coords).addTo(map).bindPopup('This is a Marker').openPopup();
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // This should be activated when the user hits Enter.
  _newWorkout(e) {
    // 1. Get Data from form
    e.preventDefault();
    let type = inputType.value;
    let distance = inputDistance.value.trim();
    let duration = inputDuration.value.trim();

    // ****** Adapt this part as the course shows *********
    // ****** But using our implementation of regexes ******

    // isFinite (the number hasn't be infinity or NaN)
    // every() each one and all of the values have to be true after the evaluation

    const validNumbersPattern = new RegExp(/^\d*(\.\d+)?$/);

    // This function evaluates that every input has a real positive number
    // through the Regular Expression above. All validations on string values.
    const validRunningData = (...inputs) => {
      return inputs.every(input => validNumbersPattern.test(input));
    };

    const someEmptyRunningData = (...inputs) => {
      return inputs.some(input => input === '');
    };

    // 3. If workout running, create running object
    if (type === 'running') {
      let cadence = inputCadence.value.trim();
      console.log({
        distance,
        duration,
        cadence,
      });

      // 2. Check if data is valid
      if (someEmptyRunningData(distance, duration, cadence)) {
        alert('Some inputs are empty');
      } else if (validRunningData(distance, duration, cadence)) {
        alert('These inputs are OK');
        distance = Number(distance);
        duration = Number(duration);
        cadence = Number(cadence);
        console.log({
          distance,
          duration,
          cadence,
        });
      } else {
        alert('Invalid Data.');
      }
      // if (!Number.isFinite(distance))
      //   return alert('Inputs have to be positive values!');
    }
    // 4. If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevationGain = +inputElevation.value;
    }
    // 5. Add the new object to the workouts array
    // 6. Render workout on map as a marker */
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
    /*
    7. Render the workout on the list
    8. Hide form and clear input fields
    */
    e.preventDefault();

    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }
}
const app = new App();

/*
- Later take a look how the form is displayed (the animation)
*/
