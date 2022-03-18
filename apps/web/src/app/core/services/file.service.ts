import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { catchError, forkJoin, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public constructor(private readonly http: HttpClient,
                     private readonly errorService: ErrorService) {
  }

  public upload(files: FileList, path: string = '/file'): Observable<FileDto[]> {
    const filesObservables: Observable<FileDto>[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i], files[i].name);
        filesObservables.push(this.http.post<FileDto>(path, formData));
      }
    }

    return filesObservables.length
      ? forkJoin(filesObservables)
        .pipe(
          catchError((error) => {
            this.errorService.addDefaultError(error);
            return throwError(error);
          })
        )
      : of([]);
  }

  public deleteFile(path: string): Observable<null> {
    return this.http.delete<null>(`/file/${path}`);
  }

  public deleteFiles(files: FileDto[]): Observable<null[]> {
    const filesObservables: Observable<null>[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        filesObservables.push(this.http.delete<null>(`/file/${files[i].path}`));
      }
    }

    return filesObservables.length
      ? forkJoin(filesObservables)
        .pipe(
          catchError((error) => {
            this.errorService.addDefaultError(error);
            return throwError(error);
          })
        )
      : of([]);
  }

}
