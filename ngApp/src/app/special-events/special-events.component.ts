import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  events = [];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getSpecialEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      ) 
  }

}
