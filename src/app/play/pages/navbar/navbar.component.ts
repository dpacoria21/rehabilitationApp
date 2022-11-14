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
  myObjects: Gif[] = [];
  lim: number = 0;
  play: string = '';

  puntos:number = 0;
  activatePuntos: boolean = false;

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


  goActivate(): void {
    let elementos: string[] = this.gifService.generarIds();
    let currentDroppable: any = null;
    this.activatePuntos = true;
    for (let i = 0; i < elementos.length; i++) {
      let ball: any = document.getElementById(elementos[i]);
      ball.onmousedown = function (event: any) {
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;

        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
        document.body.append(ball);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX: any, pageY: any) {
          ball.style.left = pageX - shiftX + 'px';
          ball.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event: any) {
          moveAt(event.pageX, event.pageY);

          ball.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          ball.hidden = false;

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.droppable');
          if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null si no estábamos sobre un receptor (droppable) antes de este evento
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null si no estamos sobre un receptor ahora
              // (pudo haber dejado el receptor recién)
              enterDroppable(currentDroppable);
              
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        ball.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };

      };
      
      function enterDroppable(elem: any) {
        elem.style.background = 'pink';
        ball.remove();
      }

      function leaveDroppable(elem: any) {
        elem.style.background = '';
      }

      ball.ondragstart = function () {
        return false;
      };
    }
  }


}
