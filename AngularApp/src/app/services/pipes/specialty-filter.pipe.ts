import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialtyFilter'
})
export class SpecialtyFilterPipe implements PipeTransform {

  transform(items: any, selectSpecialty?: any): any {
    return (selectSpecialty && selectSpecialty != 'Todos') ? items.filter(opt => opt.speciality_id === selectSpecialty) : items;
  }

}
