import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';
import { AuthHttp, JwtHelper }    from 'angular2-jwt';
import { contentHeaders } from '../../../common/headers';
import { AuthGuard } from '../../../common/auth.guard';
import { UserService } from '../../../services/user.service';
import { User } from '../../../user';
import { environment } from '../../../../environments/environment';

const styles   = require('./file-upload.component.scss');
const template = require('./file-upload.component.html');

@Component({
  selector: 'file-upload',
  template: template,
  styles: [ styles ]
})
export class FileUploadComponent {

  constructor(private http: AuthHttp) {
    this.fileReader.onload = (file) => {
      this.fileData = this.fileReader.result;
      this.doUpload(this.fileData);
    }
  }

  @Input() id;
  @Output() fileUploaded = new EventEmitter();
  private url: string;
  private fileReader = new FileReader();
  private fileData: string;
  private file: File;

  ngOnInit() {
    this.url =  environment.API_URL;
  }

  uploadFile(event) {
    var file = event.srcElement.files[0];
    this.file = file;
    var fileStr = this.fileReader.readAsDataURL(this.file);
  }

  doUpload(file) {
    this.http.post(this.url + 'storage-files', {
      data: {
        type: "storage-files",
        attributes: {
          "name": 'test',
          "description": 'test2',
          "item": file
        }
      }
    }, { headers: contentHeaders }).toPromise().then((response) => {
      let data = response.json().data;
      this.fileUploaded.emit(data);
    });
  }
}
