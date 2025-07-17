import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortContent',
  standalone: true
})
export class ShortContentPipe implements PipeTransform {
  transform(content: string, length: number = 120): string {
    return content.length > length ? content.substring(0, length) + '...' : content;
  }
}
