import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { AstrologyService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(100, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'scale(1.05)' })),
            animate('0.2s ease-out', style({ transform: 'scale(1)' }))
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('dreamAnimation', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'rotateX(90deg)' }),
          stagger(150, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'rotateX(0)' }))
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('inputFocusAnimation', [
      state('focused', style({
        boxShadow: '0px 0px 10px rgba(245, 158, 11, 0.8)'
      })),
      state('unfocused', style({
        boxShadow: 'none'
      })),
      transition('unfocused => focused', animate('300ms ease-in')),
      transition('focused => unfocused', animate('200ms ease-out'))
    ])
  ],
})
export class HomeComponent implements OnInit {
  alphabetArray = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  moonSignImages = [
    '../../assets/images/Aries.svg',
    '../../assets/images/Taurus.svg',
    '../../assets/images/Gemini.svg',
    '../../assets/images/Cancer.svg',
    '../../assets/images/Leo.svg',
    '../../assets/images/Virgo.svg',
    '../../assets/images/Libra.svg',
    '../../assets/images/Scorpio.svg',
    '../../assets/images/Sagittarius.svg',
    '../../assets/images/Capricorn.svg',
    '../../assets/images/Aquarius.svg',
    '../../assets/images/Pisces.svg',
  ];
  astrologicalTerm: any = [];
  dreamTerm: any = [];
  selectedAstrologyLetter: string = 'A';
  selectedDreamLetter: string = 'A';
  isMobileDevice: boolean = false;
  constructor(private _astrologyService: AstrologyService) {}
  astrologyFocused: boolean = false;
  dreamFocused: boolean = false;

  onFocusAstrologyInput() {
    this.astrologyFocused = true;
  }

  onBlurAstrologyInput() {
    this.astrologyFocused = false;
  }

  onFocusDreamInput() {
    this.dreamFocused = true;
  }

  onBlurDreamInput() {
    this.dreamFocused = false;
  }

  ngOnInit(): void {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/windows/i.test(userAgent)) {
      this.isMobileDevice = false;
    }

    if (/android/i.test(userAgent)) {
      this.isMobileDevice = true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      this.isMobileDevice = true;
    }

    this.onClickAstrology(this.selectedAstrologyLetter);
    this.onClickDream(this.selectedDreamLetter);
  }


  onClickAstrology(letter: string) {
    if (this.selectedAstrologyLetter === letter && this.astrologicalTerm.length > 0) return;
    this.selectedAstrologyLetter = letter;

    this.astrologicalTerm = [];

    this._astrologyService.fetchAstrologicalTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.astrologicalTerm = response;

      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onClickDream(letter: string) {
    if (this.selectedDreamLetter === letter && this.dreamTerm.length > 0) return;
    this.selectedDreamLetter = letter;
    this.dreamTerm = [];
    this._astrologyService.fetchDreamTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.dreamTerm = response;
      },
      error: (error) => console.error(error),
    });
  }

  onSearchAstrology(event: any): void {
    const letter = event.target.value;
    this.astrologicalTerm = [];
    if (letter) {
    this._astrologyService.fetchAstrologicalTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.astrologicalTerm = response;
      },
      error: (error) => console.error(error),
    });
    } else {
      this.onClickAstrology(this.selectedAstrologyLetter);
    }
  }


  onSearchDream(event: any): void {
    const letter = event.target.value;
    this.dreamTerm = [];
    if (letter) {
    this._astrologyService.fetchDreamTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.dreamTerm = response;
      },
      error: (error) => console.error(error),
    });
    } else {
      this.onClickDream(this.selectedDreamLetter);
    }

  }
}
