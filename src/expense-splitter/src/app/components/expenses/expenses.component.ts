import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/tripDetails.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  @Input() tripDet!:Trip;
  tripId:string='';

  constructor(private route:Router, private ar:ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ar.params.subscribe(params=>{
      this.tripId=params['id'];
    })
  }
  // showTrip()
  // {
  //   console.log(this.tripDet);
  // }

}
