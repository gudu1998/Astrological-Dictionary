import { Component, OnInit } from '@angular/core';
import { AstrologyService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{

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
  astrologicalTerm:any = [];
  dreamTerm:any = [];
  selectedAstrologyLetter: string = 'A';
  selectedDreamLetter: string = 'A';
  constructor(private _astrologyService: AstrologyService) {}

  ngOnInit(): void {
    this.onClickAstrology(this.selectedAstrologyLetter);
    this.onClickDream(this.selectedDreamLetter);
  }

  onClickAstrology(letter: string) {
    this.selectedAstrologyLetter = letter;
    this._astrologyService.fetchAstrologicalTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.astrologicalTerm = response;
      },
      error: (error) => console.error(error),
    });
  }

  onClickDream(letter: string) {
    this.selectedDreamLetter = letter;
    this._astrologyService.fetchDreamTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.dreamTerm = response;
      },
      error: (error) => console.error(error),
    });
  }

  onSearchAstrology(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onClickAstrology(target.value)
  }

  onSearchDream(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onClickDream(target.value)
  }
}
