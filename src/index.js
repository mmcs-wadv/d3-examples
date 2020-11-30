import * as d3 from 'd3'
import _ from 'lodash'
import Quotes from './quotes.json'
import Goals from "./components/Goals";



document.addEventListener('DOMContentLoaded', function (){
    const mainSection = document.getElementById("main-section");
    mainSection.innerHTML = `<h1>${_.sample(Quotes.quotes)}</h1>`

    const calendarButton = document.getElementById("calendar-button");
    calendarButton.onclick = ShowCalendar;
    const booksButton = document.getElementById("books-button");
    booksButton.onclick = ShowBooks;
    const goalsButton = document.getElementById("goals-button");
    goalsButton.onclick = ShowGoals;

    function ShowCalendar() {
        mainSection.innerHTML = "<h1>I will a Calendar one day!</h1>"
    }

    function ShowBooks() {
        mainSection.innerHTML = "<h1>I will a Books List one day!</h1>"
    }

    function ShowGoals() {
        const goals = new Goals();
        goals.buildGoals(mainSection);
    }

});
