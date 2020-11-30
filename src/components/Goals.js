import MoneyProgress from "./MoneyProgress";
import * as d3 from 'd3';

export default class Goals{
    buildGoals(element){
      const div = document.createElement('div');
      div.classList.add('goals');
      const firstRow = this.row();
      const money = new MoneyProgress();

      firstRow.appendChild(money.buildMoneyProgress(150, 1000, 400, 400));
        d3.interval(() => {
            money.update(Math.round(-40 + 200 * Math.random()))
        }, 3000);

      firstRow.appendChild(this.placeholder());
      div.appendChild(firstRow);
      const secondRow = this.row();
      secondRow.appendChild(this.placeholder());
      secondRow.appendChild(this.placeholder());
      div.appendChild(secondRow);


      element.innerHTML = '';
      element.appendChild(div);
    }

    row(){
        const row = document.createElement('div');
        row.classList.add('row');
        return row;
    }

    placeholder(){
        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        return placeholder;
    }
}