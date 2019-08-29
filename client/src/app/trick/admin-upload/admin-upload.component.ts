import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { FileService } from '../file.service';
import { ITrick } from '../models/trick';
import { IUrl } from '../models/Url';
import { TrickService } from '../trick.service';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.scss']
})
export class AdminUploadComponent implements OnInit {
  error: Error;
  trick: ITrick;
  url: IUrl;
  uploader: FileUploader;
  disable: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trickService: TrickService,
    private fileService: FileService,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => {
      this.trick = trick;
      this.getUrl();
    });
  }

  private getUrl(): void {
    this.trick.videoKey = `${this.trick.name}.mp4`;
    console.log(this.trick.videoKey);
    this.fileService.getSignedUrlForPut(this.trick.videoKey).subscribe(url => {
      this.url = url;
      this.initUploader();
    });
  }

  setVideoNameToTrick(): void {
    this.trickService.updateTrick(this.trick.id, this.trick).subscribe(
      () => {
      },
      error => this.error = error
    );
  }

  private initUploader(): void {
    const options: FileUploaderOptions = {
      url: this.url.link,
      disableMultipart: true,
      method: 'PUT'
    };
    this.uploader = new FileUploader(options);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      if (!fileItem.file.type.startsWith('video/')) {
        throw new Error('File have wrong type');
      }
      this.disable = true;
      this.setVideoNameToTrick();
    };
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
    this.uploader.onErrorItem = () => {
      alert('Wrong file');
    };

    this.uploader.onCompleteItem = () => {
      this.uploader.clearQueue();
      this.disable = false;
    };
  }

  goBack(): void {
    this.location.back();
  }
}
