import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectFilter'
})
export class SelectFilterPipe implements PipeTransform {

  transform(items: any, selectPet?: any): any {
    return (selectPet && selectPet != 'Todos') ? items.filter(opt => opt.patient_id === selectPet) : items;
  }

}
