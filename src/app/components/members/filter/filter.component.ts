import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() searchTextChanged = new EventEmitter<string>();
  @Output() addMemberClicked = new EventEmitter<void>(); // Emit an event when "Add Member" is clicked
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTextChanged.emit(target.value);
  }

  openModal() {
    this.addMemberClicked.emit();
  }
}
