import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { environment } from '../../../environments/environment';
import { IUserTrick } from '../../user/model/userTrick';
import { FileService } from '../file.service';
import { ITrick } from '../models/trick';
import { IUrl } from '../models/Url';
import { TrickService } from '../trick.service';
import { UserTrickService } from '../user-trick.service';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.scss']
})
export class UserUploadComponent implements OnInit {
  trick: ITrick;
  url: IUrl;
  uploader: FileUploader;
  disable: boolean;
  userTrick: IUserTrick;
  height: string = '20px';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trickService: TrickService,
    private userTrickService: UserTrickService,
    private fileService: FileService,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
  }

  private getTrick(): void {
    const trickId = +this.route.snapshot.paramMap.get('trickId');
    this.trickService.getTrickById(trickId).subscribe(trick => {
      this.trick = trick;
      this.getUserTrick();
    });
  }

  private getUserTrick(): void {
    const trickId = +this.route.snapshot.paramMap.get('trickId');
    const userId = environment.currentUser;
    this.userTrickService.getUserTrick(userId, trickId).subscribe(
      userTrick => {
        this.userTrick = userTrick;
        this.getUrl();
      }
    );
  }

  private getUrl(): void {
    this.userTrick.videoKey = `${this.userTrick.UserId}-${this.userTrick.TrickId}-${this.trick.name}.mp4`;
    console.log(this.userTrick.videoKey);
    this.fileService.getSignedUrlForPut(this.userTrick.videoKey).subscribe(url => {
      this.url = url;
      this.initUploader();
    });
  }

  updateUserTrick(): void {
    this.userTrickService.updateUserTrick(this.userTrick).subscribe(
      userTrick => this.userTrick = userTrick
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
      this.updateUserTrick();
      this.disable = false;
    };
  }

  goBack(): void {
    this.location.back();
  }
}
