import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValueFilter'
})
export class KeyValueFilterPipe implements PipeTransform {

  public transform<T>(arr: T[], filters: Record<string, any>): T[] {
    const entries = Object.entries(filters);
    if (!entries.length) {
      return arr;
    }

    return arr.filter((item) => {
      return entries.every((entry) => {
        const value = entry[0].split('.').reduce((prop, key) => prop != undefined ? prop[key] : prop, item);
        return Array.isArray(entry[1]) ? entry[1].includes(value) : entry[1] === value;
      });
    });
  }

}
