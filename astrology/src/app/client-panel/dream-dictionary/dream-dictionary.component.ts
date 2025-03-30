import { Component, OnInit } from '@angular/core';
import { AstrologyService } from 'src/app/services/home.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './dream-dictionary.component.html',
  styleUrls: ['./dream-dictionary.component.scss'],
})
export class DreamDictionaryComponent implements OnInit {
  alphabetArray = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  astrologicalTerm: any = [];
  selectedAstrologyLetter: string = 'A';
  isMobileDevice: boolean = false;
  constructor(private _astrologyService: AstrologyService) {}
  astrologyTerm: string = '';
  astrologicalDesc: string = '';
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
  }

  onClickAstrology(letter: string) {
    this.selectedAstrologyLetter = letter;

    this.astrologicalTerm = [];

    this._astrologyService.fetchDreamTermByLetter(letter).subscribe({
      next: (response: any) => {
        this.astrologyTerm = response[0].name;
        this.astrologicalDesc = response[0].desc;
        this.astrologicalTerm = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onClickAstrologyTerm(name: string, desc: string) {
    this.astrologyTerm = name;
    this.astrologicalDesc = desc;
  }
}
