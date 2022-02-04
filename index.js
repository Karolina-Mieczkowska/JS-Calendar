let selectedMonth = 0;

const calendarWkDays = document.querySelector('.calendar__week-days');
const headerDate = document.querySelector('.header__date');
const calendarContainer = document.querySelector('.calendar__main');
const btnArrow = document.querySelectorAll('.btn__arrow');

// WEEKDAYS
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

weekDays.forEach(function(day) {

    if (screen.width < 1200) {
        
        const weekDay = `<p class="week__day">${Array.from(day).splice(0,2).join('')}</p>`;
        calendarWkDays.insertAdjacentHTML('beforeend', weekDay);
    } else {

        const weekDay = `<p class="week__day">${day}</p>`;
        calendarWkDays.insertAdjacentHTML('beforeend', weekDay);
    }
})

// DATES
const date = new Date();
const day = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();

const firstDayOfMonth = new Date(year, month, 1);

const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
});

// FUNCTIONS
const renderHeaderDate = function(newMonth) {

    headerDate.textContent = new Date(year, month + newMonth, 1).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long'
    });
}

const calculateDaysInMonth = function(newMonth) {

    const daysInMonth = new Date(year, month + 1 + newMonth, 0).getDate();
    return daysInMonth;
}

const calculatePaddingDays = function(newMonth) {

    const paddingDays = new Date(year, month + newMonth, 1).getDay() -1;
    return paddingDays;
};

const renderCalendar = function() {

    const numberOfSquares = 41;

    calendarContainer.innerHTML = '';
    const daysInMonth = calculateDaysInMonth(selectedMonth);
    
    let days = [];
    for (let d=1; d<=daysInMonth; d++) {

        days.push(d)
    }

    const firstDay = weekDays.filter(function(day) {

        return day === new Date(year, month + selectedMonth, 1).toLocaleDateString('en-GB', {
            weekday: 'long'
        })
    })[0];

    const weekIndex = weekDays.findIndex(function(day) {

        return day === firstDay
    })

    for (let i=0; i<=numberOfSquares; i++) {

        const squareDay = document.createElement('div');
        squareDay.classList.add('main__square-day');
        calendarContainer.appendChild(squareDay);
        squareDay.classList = i>=weekIndex && i<=weekIndex+daysInMonth ? 'main__square-day main__square-day--hoover' : 'main__square-day';
    };

    Array.from(document.querySelectorAll('.main__square-day--hoover')).forEach(function(square, ind) {

        square.textContent = days[ind];
    })

    document.querySelectorAll('.main__square-day').forEach(square => square.style.height = `${square.clientWidth}px`);
};

// BUTTONS
btnArrow.forEach(arrow => arrow.addEventListener('click', function() {

    arrow.classList.contains('btn__arrow--next') ? selectedMonth++ : selectedMonth--;
    renderHeaderDate(selectedMonth);
    renderCalendar();
}))

renderHeaderDate(selectedMonth);
renderCalendar(selectedMonth);