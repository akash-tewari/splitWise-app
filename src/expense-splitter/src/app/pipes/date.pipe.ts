import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, ...args: Date[]): string {
    let months=['JAN','FEB','MAR','MAY','APR','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    let date = new Date(value);
    let month = date.getMonth();
    let monthName=months[month];
    return date.getDate()+"-"+monthName
    +"-"+date.getFullYear();

  }

}
