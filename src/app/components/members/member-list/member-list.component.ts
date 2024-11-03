import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Member } from '../../../domain/member';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';
import { CommonModule } from '@angular/common';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    TableModule,
    TooltipModule,
    AddEditModalComponent,
    AddEditModalComponent,
    CommonModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent {
  imageBaseUrl: string = environment.imageUrl;
  @Input() members: Member[] = [];
  @Input() filterText = '';
  filteredMembers: Member[] = [];
  @Output() memberEditClicked = new EventEmitter<Member>();
  @Output() memberDeleted = new EventEmitter<Member>();
  cols: Column[] = [
    { field: 'code', header: 'Member No' },
    { field: 'name', header: 'Full Name' },
    { field: 'type', header: 'Member Type' },
    { field: 'joinedDate', header: 'Joined' },
    { field: 'dueJoiningFees', header: 'Due Joining Fees' },
    { field: 'joiningFees', header: 'Joining Fees Status' },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterText'] && changes['filterText'].currentValue) {
      this.applyFilter();
    }
    if (changes['members']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    this.filteredMembers = this.members.filter((member) =>
      Object.values(member)
        .join(' ')
        .toLowerCase()
        .includes(this.filterText.toLowerCase())
    );
  }

  openModal(member: Member) {
    // Emit event to parent for editing a member
    this.memberEditClicked.emit(member);
  }
  confirmDelete(member: Member) {
    const confirmed = confirm(
      `Are you sure you want to delete ${member.name}?`
    );
    if (confirmed) {
      this.memberDeleted.emit(member); // Emit event to delete the member
    }
  }
}
