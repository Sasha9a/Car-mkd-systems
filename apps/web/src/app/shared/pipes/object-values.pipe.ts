import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues',
  standalone: true
})
export class ObjectValuesPipe implements PipeTransform {
  public transform<T>(object: { [p: string]: T } | ArrayLike<T>): T[] {
    return Object.values<T>(object);
  }
}
