import { Injectable } from '@nestjs/common';
import { InvalidDataFormatException } from 'src/common/exceptions/invalid-data-format.exception';
import * as Papa from 'papaparse';
import { Observable, Observer, firstValueFrom } from 'rxjs';

@Injectable()
export class StudentImportService {
  async parseCsv(file: Express.Multer.File): Promise<any[]> {
    //TODO add type

    if (!(file.mimetype === 'text/csv')) throw new InvalidDataFormatException();

    return await firstValueFrom(
      new Observable((observer: Observer<any>) => {
        //TODO add type
        Papa.parse(file.buffer.toString(), {
          header: true,
          complete: (result) => {
            observer.next(result.data);
            observer.complete();
          },
          error: (error: Error) => {
            observer.error(error);
          },
        });
      }),
    );
  }

  async parseJson(file: Express.Multer.File): Promise<any> {
    //TODO add type
    if (!(file.mimetype === 'application/json'))
      throw new InvalidDataFormatException();

    return await JSON.parse(file.buffer.toString());
  }
}
