import {Component, Input} from '@angular/core';
import {environment} from "environments/environment";

@Component({
  selector: 'qAudio',
  templateUrl: './qaudio.component.html',
  styleUrls: ['./qaudio.component.scss']
})
export class QAudioComponent {

  @Input() id;
  @Input() audio;
  readonly storageUrl = environment.API_URL;

  get audioEl() {
    return <HTMLAudioElement>document.getElementById(this.id);
  }

  get isPlaying() {
    let el = this.audioEl;
    if (el) {
      return this.audioEl.duration > 0 && !this.audioEl.paused;
    }

    return false;
  }

  play($event) {
    $event.stopPropagation();
    $event.preventDefault();
    console.log($event);
    this.audioEl.onended = () => {
      this.audioEl.currentTime = 0;
    }
    this.audioEl.play()
  }
}
