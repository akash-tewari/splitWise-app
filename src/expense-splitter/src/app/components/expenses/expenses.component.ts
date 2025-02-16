import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/tripDetails.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  @Input() tripDet!:Trip;

  constructor(private route:Router){}

  
  // showTrip()
  // {
  //   console.log(this.tripDet);
  // }

}
