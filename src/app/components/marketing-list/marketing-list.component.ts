import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';

export interface MarketingEntry {
  date: string; // Date in 'YYYY-MM-DD' format
  memberName: string;
  spentAmount: number;
  isEditing?: boolean; // New property to track editing state
}

@Component({
  selector: 'app-marketing-list',
  standalone: true,
  imports: [
    TableModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    InputNumberModule,
    AutoCompleteModule,
  ],
  templateUrl: './marketing-list.component.html',
  styleUrl: './marketing-list.component.scss',
})
export class MarketingListComponent {
  selectedMonth: Date = new Date();
  scheduleDates: Date[] = []; // All dates in the year
  filteredDates: string[] = []; // Filtered dates in string format
  marketingList: MarketingEntry[] = []; // List of marketing entries
  members: string[] = ['Member 1', 'Member 2', 'Member 3', 'Member 4']; // Sample member list
  filteredMembers: string[] = [];

  ngOnInit() {
    this.onMonthChange(); // Load data for the current month
  }

  onMonthChange() {
    this.generateScheduleDates(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth()
    );
    this.filterDatesForMonth(this.selectedMonth);
    this.loadMarketingData();
  }

  generateScheduleDates(year: number, month: number) {
    if (month < 0 || month > 11) {
      throw new Error('Month must be between 0 (January) and 11 (December)');
    }

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    this.scheduleDates = [];
    let date = startDate;

    while (date <= endDate) {
      this.scheduleDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }
  filterDatesForMonth(selectedMonth: Date) {
    const selectedYear = selectedMonth.getFullYear();
    const selectedMonthIndex = selectedMonth.getMonth();
    this.filteredDates = this.scheduleDates
      .filter(
        (date) =>
          date.getFullYear() === selectedYear &&
          date.getMonth() === selectedMonthIndex
      )
      .map((date) => date.toString());
  }

  loadMarketingData() {
    this.marketingList = this.filteredDates.map((date, index) => ({
      date,
      memberName: 'Please Edit',
      spentAmount: 0,
      isEditing: false,
    }));
  }

  editMarketingEntry(entry: MarketingEntry) {
    entry.isEditing = !entry.isEditing; // Toggle editing state
  }

  saveMarketingEntry(
    entry: MarketingEntry,
    newMember: string,
    newAmount: number
  ) {
    entry.memberName = newMember;
    entry.spentAmount = newAmount;
    entry.isEditing = false; // Exit editing mode
  }

  filterMembers(event: any) {
    const query = event.query.toLowerCase();
    this.filteredMembers = this.members.filter((member) =>
      member.toLowerCase().includes(query)
    );
  }
}
