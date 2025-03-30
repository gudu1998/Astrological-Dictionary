import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'astrological-profile',
  templateUrl: './astrological-profile.component.html',
  styleUrls: ['./astrological-profile.component.scss'],
})
export class AstrologicalProfileComponent implements OnInit {
  activeZodiac: string = 'aries';
  zodiacDesc: string = '';
  isMobileDevice: boolean = false;
  constructor(private _astrologyService: AdminService) {}
  zodiacSigns = [
    { name: 'aries', image: 'aries-logo.svg', angle: '0deg' },
    { name: 'taurus', image: 'taurus-logo.svg', angle: '30deg' },
    { name: 'gemini', image: 'gemini-logo.svg', angle: '60deg' },
    { name: 'cancer', image: 'cancer-logo.svg', angle: '90deg' },
    { name: 'leo', image: 'leo-logo.svg', angle: '120deg' },
    { name: 'virgo', image: 'virgo-logo.svg', angle: '150deg' },
    { name: 'libra', image: 'libra-logo.svg', angle: '180deg' },
    { name: 'scorpio', image: 'scorpio-logo.svg', angle: '210deg' },
    { name: 'sagittarius', image: 'sagittarius-logo.svg', angle: '240deg' },
    { name: 'capricorn', image: 'capricorn-logo.svg', angle: '270deg' },
    { name: 'aquarius', image: 'aquarius-logo.svg', angle: '300deg' },
    { name: 'pisces', image: 'pisces-logo.svg', angle: '330deg' },
  ];

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

    this.fetchZodiacSignByName(this.activeZodiac);
  }
  setActiveMenu(zodiac: string) {
    this.activeZodiac = zodiac;
    this.fetchZodiacSignByName(zodiac);
  }

  fetchZodiacSignByName(termName: string) {
    this._astrologyService.fetchZodiacSignByName(termName).subscribe({
      next: (response: any) => {
        this.zodiacDesc = response.desc;
      },
      error: () => {},
    });
  }
}
