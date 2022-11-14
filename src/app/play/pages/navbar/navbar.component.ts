import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  search: boolean = false;
  lim: number = 0;
  play: string = '';


  constructor(private gifService: GifsService) { }

  showSearch(): void {
    this.search = !this.search;
  }

  goSearch(): void {
    if (this.play === '' || this.lim === 0) {
      alert('Rellene todos los datos');
    } else {
      if (this.lim >= 12) {
        this.lim = 12;
      }
      this.gifService.Search(this.play, this.lim);


      this.play = '';
      this.lim = 0;
    }
  }
}
