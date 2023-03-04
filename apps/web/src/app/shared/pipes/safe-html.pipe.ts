import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  public constructor(private readonly sanitized: DomSanitizer) {}

  public transform(value = '') {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
