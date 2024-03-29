import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {
  public transform<T>(arr: T[], key: keyof T): Array<T> {
    return arr.filter((item) => item[key]);
  }
}
