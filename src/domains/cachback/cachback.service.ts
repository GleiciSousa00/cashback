import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';

@Injectable()
export class CachbackService {
  constructor(private httpService: HttpService) {}

  async findOne(cpf: string): Promise<any> {
    const url = `https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${cpf}`;

    const response = await lastValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: 'Bearer XPURQOARHiMc6Y0flhRC1LVlZQVFRnm' },
      }),
    );

    return response.data.body;
  }

  // find(): Observable<AxiosResponse<CachbackService[]>> {
  //   const url =
  //     'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=05203424101';
  //   const response = this.httpService.get(url, {
  //     headers: { Authorization: 'Bearer XPURQOARHiMc6Y0flhRC1LVlZQVFRnm' },
  //   });
  // }
}
