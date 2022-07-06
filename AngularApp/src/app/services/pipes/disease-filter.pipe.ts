import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diseaseFilter'
})
export class DiseaseFilterPipe implements PipeTransform {

  transform(items: any, selectDisease?: any): any {
    return (selectDisease && selectDisease != 'Ninguna') ? items.filter(opt => opt.disease_id === selectDisease) : items;
  }

}
