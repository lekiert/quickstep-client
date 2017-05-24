import { Injectable } from '@angular/core';
import {User} from "../../user";

@Injectable()
export class UserPostDataService {

  public getPasswordChangePostData(userId, newPassword, oldPassword?): Object {
    let postData = {
      data: {
        type: "password-updates",
        attributes: {
          "user-id": userId,
          "new-password": newPassword
        }
      }
    }

    if (oldPassword) {
      postData.data.attributes["old-password"] = oldPassword;
    }

    return postData;
  }

  public getCreateUserPostData(user: User): Object {
    return {
      data: {
        type: "users",
        attributes: {
          "first-name": user.first_name,
          "last-name": user.last_name,
          "password": user.password,
          "email": user.email,
          "role": user.role
        }
      }
    }
  }

  public getUpdateUserPostData(user: User): Object {
    return {
      data: {
        id: user.id,
        type: "users",
        attributes: {
          "first-name": user.first_name,
          "last-name": user.last_name,
          "email": user.email,
          "role": user.role
        }
      }
    }
  }
}
