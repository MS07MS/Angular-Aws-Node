import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'uploadfile';

  
  displayMultipleImages!: Boolean;
  displayMultipleImageArray!: Array<any>;
  

  

  @ViewChild('multipleInput', { static: false })
  multipleInput!: ElementRef;

  images: any;
  multipleImages = [];

  constructor(private http: HttpClient) {
    //this.displaySingleImage = false;
    this.displayMultipleImageArray = [];
    this.displayMultipleImages = false;
    //this.displaySingleImageArray = [];
  }

  

  

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onMultipleSubmit() {
    const formdata = new FormData()

    for (let img of this.multipleImages) {
      formdata.append('files',img)
    }

    this.http.post<any>('http://localhost:3000/multipleFiles', formdata)
      .subscribe((res) => {
        console.log(res)
        this.multipleInput.nativeElement.value = ""
        console.log(res.path)
        this.displayMultipleImages=true
        this.displayMultipleImageArray = res.path
        
    })
  }
}