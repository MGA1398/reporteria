import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCount'
})
export class FilterCountPipe implements PipeTransform {

  transform(items: any[]): any {
    if(!items) return [];
    let total = 0;
    for (let item of items) {
      total += item.transaction_amount;
    }
    return total;
  }

}
