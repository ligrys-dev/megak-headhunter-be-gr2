import { Injectable } from '@nestjs/common';
import { InvalidDataFormatException } from 'src/common/exceptions/invalid-data-format.exception';
import * as Papa from 'papaparse';
import { Observable, Observer, firstValueFrom } from 'rxjs';

@Injectable()
export class StudentImportService {
  async parseFile(file: Express.Multer.File): Promise<any[]> {
    //TODO add type
    const uploadingFile = file.buffer.toString();

    if (file.mimetype === 'text/csv') {
      return await firstValueFrom(
        new Observable((observer: Observer<any>) => {
          //TODO add type
          Papa.parse(uploadingFile, {
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
    } else if (file.mimetype === 'application/json') {
      return await JSON.parse(uploadingFile);
    } else {
      throw new InvalidDataFormatException();
    }
  }
}
