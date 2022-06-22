import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(private httpService: HttpService) {}

  getCurrentUser(accessToken: string) {
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    };

    const axiosResponse = this.httpService.get(process.env.SERVER_URL + '/account', {
      headers: headersRequest,
    });
    const user = lastValueFrom(axiosResponse.pipe(map((response) => response.data.user)));

    return user;
  }
}
