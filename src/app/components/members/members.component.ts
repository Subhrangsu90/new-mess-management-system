import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { FilterComponent } from './filter/filter.component';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { Member } from '../../domain/member';
import { MembersService } from '../../service/members.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    MemberListComponent,
    FilterComponent,
    AddEditModalComponent,
    CommonModule,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  imageBaseUrl: string = environment.imageUrl;
  searchText = '';
  members: Member[] = [];
  showModal: boolean = false;
  selectedMember?: Member; // Currently selected member for editing
  private memberService = inject(MembersService);
  ngOnInit() {
    this.memberService.getMember().then((data) => {
      this.members = data;
    });
  }
  onSearch(text: string) {
    this.searchText = text;
    console.log(this.searchText);
  }

  openModal(member?: Member) {
    this.selectedMember = member || undefined; // Set the selected member for editing or null for new
    this.showModal = true; // Show the modal
  }

  onMemberAdded(newMember: Member) {
    console.log(newMember);

    if (newMember) {
      const existingMemberIndex = this.members.findIndex(
        (m) => m.id === newMember.id
      );

      if (existingMemberIndex > -1) {
        // Update existing member
        // this.members[existingMemberIndex] = newMember;
        this.members = [
          ...this.members.slice(0, existingMemberIndex),
          newMember,
          ...this.members.slice(existingMemberIndex + 1),
        ];
      } else {
        // If it's a new member, add it to the list
        this.members = [...this.members, newMember];
      }
    }
    this.showModal = false; // Close the modal
  }
  handleMemberDeletion(member: Member) {
    this.members = this.members.filter((m) => m.id !== member.id);
    // Optionally, update any other logic related to members
  }
}
