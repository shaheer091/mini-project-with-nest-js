import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  updateUserProfile(iamgeUrl: any) {
    console.log(iamgeUrl);
    if (iamgeUrl) {
      return { message: 'got the image' };
    } else {
      return { message: 'provide the image to save' };
    }
  }
}
