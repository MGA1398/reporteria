import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(items: any, start: Date, end?: Date): any {
    start.toString().length == 0 ? start = new Date("1995-12-25T11:30:00.000Z") : start;
    end == null ? end = new Date() :end;
    if (start >= end || start == null) { return items;}
    return items.filter(x=>{return new Date(x.transaction_date) >= new Date(start) && new Date(x.transaction_date) <= new Date(end)});
  }

}
