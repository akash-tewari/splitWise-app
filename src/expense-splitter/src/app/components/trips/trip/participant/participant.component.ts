import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant } from 'src/app/models/participant.model';
import { Trip } from 'src/app/models/tripDetails.model';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {
  @Input()
  tripId!: string;
  @Input() trip!:Trip;
  @Output() getParticpants:EventEmitter<Participant>;

  constructor(){
    this.getParticpants=new EventEmitter;
  }

  getParticipant(i:number){
    this.getParticpants.emit(this.trip.particpants[i]);
  }

  

  
}
