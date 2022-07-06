import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceFilter'
})
export class ServiceFilterPipe implements PipeTransform {

  transform(items: any, selectService?: any): any {
    return (selectService && selectService != 'Todos') ? items.filter(opt => opt.service_id === selectService) : items;
  }

}
