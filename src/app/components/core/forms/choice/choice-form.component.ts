import {Component, Input, Output, EventEmitter} from "@angular/core";
import {environment} from "../../../../../environments/environment";

const styles = require('./choice-form.component.scss');
const template = require('./choice-form.component.html');

@Component({
  selector: 'choice-form',
  template: template,
  styles: [ styles ],
})
export class ChoiceFormComponent {

  storageUrl = environment.API_URL;
  @Input() excercise;
  @Output() updateExcercise = new EventEmitter();
  @Output() fileUploaded = new EventEmitter();

  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  addSentence() {
    let lastIndex = 0;
    let keys = this.keys(this.excercise.data).map((val) => { return parseInt(val) });
    if (keys.length > 0) {
      lastIndex = Math.max(...keys);
    }
    let newIndex = lastIndex + 1;
    this.excercise.data[newIndex] = '';
    this.excercise.answers[newIndex] = [];
  }

  addOption(sentenceId) {
    this.excercise.answers[sentenceId].push({ text: '', correct: false });
  }

  deleteSentence(index) {
    delete this.excercise.data[index];
    delete this.excercise.answers[index];
  }

  setAnswerAsMedia(evt, sentence, answer) {
    this.excercise.answers[sentence][answer].text = evt.id;
    this.excercise.answers[sentence][answer].media = evt.attributes.item;
    this.excercise.answers[sentence][answer].mime = evt.attributes.mime;
  }

}
