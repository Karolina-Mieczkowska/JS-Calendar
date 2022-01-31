const calendarWkDays = document.querySelector('.calendar__week-days');
const headerDate = document.querySelector('.header__date');
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const squareDay = document.querySelectorAll('.main__square-day');

headerDate.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
})

squareDay.forEach(square => square.style.height = `${square.clientWidth}px`);
console.log(squareDay.clientWidth);

const renderWeekDays = function() {

    weekDays.forEach(function(day) {

        if (screen.width < 576) {
            
            const weekDay = `<p class="week__day">${Array.from(day).splice(0,2).join('')}</p>`;
            calendarWkDays.insertAdjacentHTML('beforeend', weekDay);
        } else {

            const weekDay = `<p class="week__day">${day}</p>`;
            calendarWkDays.insertAdjacentHTML('beforeend', weekDay);
        }
        // console.log(Array.from(day).splice(0,2).join(''));
    })
}

renderWeekDays();