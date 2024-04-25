import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/dto/user.dto';


@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService) {}
    async list(): Promise<User[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any>('https://dummyjson.com/users').pipe(
              catchError((error:any) => {
                console.log("Error: ", error);
                throw 'An error happened!';
              }),
            ),
          );
        return data.users;
    }
    
}