import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeyValue'
})
export class ObjectKeyValuePipe implements PipeTransform {

  public transform(arr: Record<any, any>): any[] {
    return Object.values(arr);
  }

}
