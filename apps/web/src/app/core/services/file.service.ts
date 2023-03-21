import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public constructor(private readonly http: HttpClient, private readonly errorService: ErrorService) {}

  public upload(files: FileList): Observable<FileDto[]> {
    const filesObservables: Observable<FileDto>[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i], files[i].name);
        filesObservables.push(this.http.post<FileDto>('/file', formData));
      }
    }

    return filesObservables.length
      ? forkJoin(filesObservables).pipe(
          catchError((error) => {
            this.errorService.addDefaultError(error);
            return throwError(error);
          })
        )
      : of([]);
  }

  public deleteFile(path: string): Observable<void> {
    return this.http.delete<void>(`/file/${path}`);
  }

  public deleteFiles(files: FileDto[]): Observable<any[]> {
    const filesObservables: Observable<any>[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        filesObservables.push(this.http.delete<null>(`/file/${files[i].path}`));
      }
    }

    return filesObservables.length
      ? forkJoin(filesObservables).pipe(
          catchError((error) => {
            this.errorService.addDefaultError(error);
            return throwError(error);
          })
        )
      : of([]);
  }
}
