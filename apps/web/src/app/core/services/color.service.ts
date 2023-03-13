import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  public isColorLight(color: string): boolean {
    if (color[0] !== '#') {
      return false;
    }

    const c = color.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const coeff = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return coeff > 200;
  }

  public setColorText(color: string): string {
    if (color) {
      return this.isColorLight(color) ? '#000000' : '#ffffff';
    } else {
      return '#000000';
    }
  }
}
