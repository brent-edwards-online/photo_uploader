import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster/angular2-toaster';
//import * as AWS from 'aws-sdk';
//require('aws-sdk/dist/aws-sdk');
import 'aws-sdk/dist/aws-sdk';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @ViewChild('videoCanvas') video:ElementRef;
  @ViewChild('videoMediaContainer') videoMediaContainer:ElementRef;
  @ViewChild('pictureCanvas') picture:ElementRef;
  
  videoContainerHeight: number;
  videoContainerWidth: number;
  capturedImage: any;
  imageData: any;

  public fileUploadSuccess = false;
  public fileUploadFail = false;
  public fileUploadMessage = '';

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.setCanvasSize(this.video.nativeElement.parentElement.clientWidth);
  }
  
  ngAfterViewInit() {
    let _video=this.video.nativeElement;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
                            .then(stream => {
                              _video.src = window.URL.createObjectURL(stream);
                              _video.play();
                            })
    }
  }

  onResize(boundingRectangle:any) {
    this.setCanvasSize(this.video.nativeElement.parentElement.clientWidth);
  }

  setCanvasSize(canvasWidth: number) {
    this.videoContainerWidth = canvasWidth; 
    this.videoContainerHeight = ( 360 * canvasWidth ) / 480;
  }

  captureImage() {
    let canvas = this.picture.nativeElement;
    let _video=this.video.nativeElement;
    canvas.getContext('2d').drawImage(_video, 0, 0, canvas.width, canvas.height);
  }

  saveImage() {
    this.fileUploadSuccess = false;
    this.fileUploadFail = false;
    this.fileUploadMessage = '';

    let canvas = this.picture.nativeElement;
    let data = canvas.toDataURL('image/png');
    
    let AWSService = (<any>window).AWS;
    AWSService.config.accessKeyId = 'AKIAIOSDC3ZYPB2BW4RQ';
    AWSService.config.secretAccessKey = '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';
    AWSService.config.region ='ap-southeast-2';
    let bucket = new AWSService.S3({params: {Bucket:'photo-uploader-images'}});
    let uploadParams = { Bucket: "photo-uploader-images", Key: "7AE0219D-B466-4B9E-B03A-B966B7DB38A0/profile.png", Body: data};

    var m = function(e,r){
      if(e){
        var toast : Toast = {
          type: 'error',
          title: 'S3 Upload Failed',
          body: 'Upload to S3 fail: ' + e,
          showCloseButton: true,
        };
        this.toasterService.pop(toast);
        console.log(e);
      }
      else{
        var toast : Toast = {
          type: 'success',
          title: 'S3 Upload Success',
          body: 'Upload to S3 success',
          showCloseButton: true,
        };
        this.toasterService.pop(toast);
        console.log(r);
      }
    }

    var f = m.bind(this);

    bucket.upload(uploadParams, function(err, res){
      f(err, res);
    })
    
  }
}
