import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input()
  public name: string;

  constructor() { }

  ngOnInit() {
  }

}
