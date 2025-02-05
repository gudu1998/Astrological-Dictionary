import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tele-read-more',
  templateUrl: './tele-read-more.component.html',
  styleUrls: ['./tele-read-more.component.scss'],
})
export class TeleReadMoreComponent implements OnInit {
  @Input() content: string = '';
  @Input() maxHeight: number = 60;

  public isCollapsed: boolean = true;
  public isCollapsable: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      let currentHeight = this.elementRef.nativeElement.querySelector(
        '.description-container'
      )?.scrollHeight;
      this.isCollapsable = currentHeight > this.maxHeight;
    }, 100);
  }
}
