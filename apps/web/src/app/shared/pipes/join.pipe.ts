import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  public transform(array: any[], field: string = '', separator = ', '): string {
    const fields = field.split('.');
    return array.map(item => fields.reduce((value, field) => value[field] ?? value, item)).join(separator);
  }

}
