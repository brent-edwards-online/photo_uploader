import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster/angular2-toaster';
import { ConfigAWS } from '../config.aws';
import 'aws-sdk/dist/aws-sdk';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  inputs: ['member'],
})
export class ImageComponent implements OnInit {
  @ViewChild('videoCanvas') video:ElementRef;
  @ViewChild('videoMediaContainer') videoMediaContainer:ElementRef;
  @ViewChild('pictureCanvas') picture:ElementRef;
  @Input() member: string;

  videoContainerHeight: number;
  videoContainerWidth: number;
  capturedImage: any;
  imageData: any;
  currentMember: string;

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

  ngOnChanges(changes: SimpleChanges) {
    this.currentMember = changes['member'].currentValue; 

    if(!this.currentMember) {
      return;
    }

    let AWSService = (<any>window).AWS;
    AWSService.config.accessKeyId = ConfigAWS.ACCESS_KEY;
    AWSService.config.secretAccessKey = ConfigAWS.ACCESS_KEY_SECRET
    AWSService.config.region ='ap-southeast-2';
    let bucket = new AWSService.S3({params: {Bucket:'photo-uploader-images'}});
    
    var m = function(error,response){
      if(error){
        var toast : Toast = {
          type: 'error',
          title: 'S3 Download Failed',
          body: 'Download from S3 fail: ' + error,
          showCloseButton: true,
        };
        this.toasterService.pop(toast);
      }
      else{
        var context = this.picture.nativeElement.getContext("2d");
        var img = new Image();
        img.src = response.Body;
        img.onload = function() {
          context.drawImage(img, 0, 0);
        }

        var toast : Toast = {
          type: 'success',
          title: 'S3 Download Success',
          body: 'Download from S3 success',
          showCloseButton: true,
        };
        this.toasterService.pop(toast);
      }
    }

    var f = m.bind(this);

    let downloadParams = { Bucket: "photo-uploader-images", Key: this.currentMember  + "/profile.png"};
    bucket.getObject(downloadParams, function(err, res){
      f(err, res);
    })
  }

  captureImage() {
    let canvas = this.picture.nativeElement;
    let _video=this.video.nativeElement;
    canvas.getContext('2d').drawImage(_video, 0, 0, canvas.width, canvas.height);
  }

  imagedata: any;

  saveImage() {
    let canvas = this.picture.nativeElement;
    let data = canvas.toDataURL('image/png');
    
    let AWSService = (<any>window).AWS;
    AWSService.config.accessKeyId = ConfigAWS.ACCESS_KEY;
    AWSService.config.secretAccessKey = ConfigAWS.ACCESS_KEY_SECRET
    AWSService.config.region ='ap-southeast-2';
    let bucket = new AWSService.S3({params: {Bucket:'photo-uploader-images'}});
    let uploadParams = { Bucket: "photo-uploader-images", Key: this.currentMember + "/profile.png", Body: data};

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
