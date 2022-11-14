import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent {
  constructor( private gifService:GifsService ){}

  Ids: string[] = [];

  get getMyPlayers():Gif[]{
    this.Ids = this.gifService.generarIds();
    return this.gifService.getPersonajes();
  }


}
