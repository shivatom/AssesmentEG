import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
  protected visible!: boolean;
  protected position = { x: 0, y: 0 };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (event.target.className.indexOf('optionMenu') == -1) {
      this.closeMenu();
    }
  }
  closeMenu() {
    this.visible = false;
  }
  showMenu(event: MouseEvent) {
    this.position.x = event.clientX,
      this.position.y = event.clientY
    this.visible = true;
  }
}
