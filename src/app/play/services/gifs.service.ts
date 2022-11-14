import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif } from '../interfaces/gif.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  personajes: Gif[] = [];
  Ids: string[] = []; 

  limit:number = 0;
  constructor( private httpClient: HttpClient ) { }

  baseUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key=MtQuaZGfd1UdsZHqwxwvkHPmbPZ8hhBB&q=';
  limitUrl: string = '&limit=';



  Search(name:string, lim:number):void {
    this.limit = lim;
    let valor:boolean = true;
    this.httpClient.get<Gif>(`${this.baseUrl+name+this.limitUrl+lim}`)
      .subscribe(resp => {
        if(resp.data.length !== 0){
          this.personajes = resp.data;
        }else {
          console.log('No se encontraron busquedas');
        }
      })
  }

  getPersonajes():Gif[] {
    return this.personajes;
  }

  generarIds(): string[]{
    for(let i =0; i<this.limit; i++){
      this.Ids[i] = 'img'+(i+1);
    }
    return this.Ids;
  }

}