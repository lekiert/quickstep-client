import {Component, Input} from '@angular/core';
const maxColorValue = 200;

@Component({
  selector: 'score-circle',
  templateUrl: './score-circle.component.html',
  styleUrls: ['./score-circle.component.scss']
})
export class ScoreCircleComponent {

  @Input() score: number;
  @Input() dark: boolean;

  get color() {
    return `rgb(${this.red}, ${this.green}, 0)`;
  }

  get green() {
    let part = <number>(maxColorValue * (this.score / 100));
    return Math.floor(part)+''
  }

  get red() {
    let part = <number>(maxColorValue * ((100-this.score) / 100));
    return Math.floor(part)+''
  }
}
