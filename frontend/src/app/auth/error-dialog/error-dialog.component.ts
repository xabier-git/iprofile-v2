import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
  @Input() message: string = '';
  @Input() visible: boolean = true;
  @Output() closed = new EventEmitter<void>();

  closeDialog(): void {
    this.visible = false;
    this.closed.emit();
  }
}