import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../../../domain/member';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-edit-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
  ],
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.scss',
})
export class AddEditModalComponent {
  @Output() memberAdded = new EventEmitter<any>();
  @Input() member?: Member; // Accept a member for editing
  idCounter = 1;
  selectedMemberType: { label: string; value: string } | undefined;
  memberTypes: { label: string; value: string }[] = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Full Border', value: 'Full Border' },
    { label: 'Guest', value: 'Guest' },
  ];

  feesStatus: { label: string; value: string }[] = [
    { label: 'Full Paid', value: 'Full Paid' },
    { label: 'Remain', value: 'Remain' },
  ];
  joiningFees: number = 500;
  paidAmount: number = 0;
  newMember: Member = {
    id: Date.now().toString(),
    code: this.idCounter,
    name: '',
    type: '',
    joinedDate: new Date(),
    dueJoiningFees: this.joiningFees,
    joiningFees: 'Remain',
  };

  ngOnChanges() {
    if (this.member) {
      this.populateForm(this.member);
    } else {
      this.resetForm();
    }
  }

  populateForm(member: Member) {
    this.newMember = { ...member }; // Populate form with the member data
    this.paidAmount =
      member.dueJoiningFees < this.joiningFees
        ? this.joiningFees - member.dueJoiningFees
        : 0;
    this.selectedMemberType = this.memberTypes.find(
      (type) => type.value === member.type
    );
  }

  resetForm() {
    this.newMember = {
      id: Date.now().toString(),
      code: this.idCounter++,
      name: '',
      type: '',
      joinedDate: new Date(),
      dueJoiningFees: this.joiningFees,
      joiningFees: 'Remain',
    };
    this.paidAmount = 0;
    this.selectedMemberType = undefined;
  }

  // Handle change in paid amount and update due fees
  onPaidAmountChange(paidAmount: number) {
    this.paidAmount = paidAmount;
    this.newMember.dueJoiningFees = this.joiningFees - paidAmount;
    this.newMember.joiningFees =
      this.newMember.dueJoiningFees > 0 ? 'Remain' : 'Full Paid';
  }

  // Update joining fees if the admin modifies it
  onJoiningFeesChange(newFees: number) {
    this.joiningFees = newFees;
    this.newMember.dueJoiningFees = this.joiningFees - this.paidAmount;
    this.newMember.joiningFees =
      this.newMember.dueJoiningFees > 0 ? 'Remain' : 'Full Paid';
  }

  // Reset joining fees if type changes from Admin to another type
  onMemberTypeChange(selectedOption: { label: string; value: string }) {
    this.newMember.type = selectedOption.value;
    if (this.newMember.type !== 'Admin') {
      this.joiningFees = 500; // Reset to default for non-admins
      this.onJoiningFeesChange(this.joiningFees); // Update member's fees
    }
  }

  saveMember() {
    if (
      this.newMember.name &&
      this.newMember.type &&
      this.newMember.joinedDate
    ) {
      // Only generate a new ID if this is a new member
      if (!this.member || !this.member.id) {
        this.newMember.id = Date.now().toString(); // Update unique ID for new members only
      } else {
        this.newMember.id = this.member.id; // Keep the existing ID for updates
      }
      this.memberAdded.emit(this.newMember); // Emit the new or updated member
      this.closeModal();
    }
  }

  closeModal() {
    this.memberAdded.emit(null); // Emit null to close without adding
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
