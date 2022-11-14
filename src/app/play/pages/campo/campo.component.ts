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

  goActivate(id: string): void {
    let currentDroppable: any = null;
    
      let ball: any = document.getElementById(id);
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
