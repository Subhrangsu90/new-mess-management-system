import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { environment } from '../../../environments/environment';

export interface Member {
  id: string;
  name: string;
  joinedDate: string;
  meals: { [date: string]: { lunch: boolean; dinner: boolean } };
}

export interface Guest {
  id: string;
  name: string;

  meals: { [date: string]: { lunch: boolean; dinner: boolean } };
}

@Component({
  selector: 'app-meal-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CalendarModule,
    InputSwitchModule,
  ],
  templateUrl: './meal-schedule.component.html',
  styleUrl: './meal-schedule.component.scss',
})
export class MealScheduleComponent {
  members: Member[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      joinedDate: '2024-01-15T00:00:00.000Z',
      meals: {},
    },
    {
      id: '2',
      name: 'Bob Smith',
      joinedDate: '2024-02-10T00:00:00.000Z',
      meals: {},
    },
    {
      id: '3',
      name: 'Subha',
      joinedDate: '2024-01-15T00:00:00.000Z',
      meals: {},
    },
  ];
  guests: Guest[] = [
    {
      id: 'g1',
      name: 'Guest 1',
      meals: {},
    },
    {
      id: 'g2',
      name: 'Guest 2',
      meals: {},
    },
  ];

  scheduleDates: Date[] = []; // All dates in the year
  filteredDates: string[] = []; // Filtered dates in string format
  selectedMonth: Date = new Date(); // Default to current month

  ngOnInit() {
    this.onMonthChange(); // Default to the current month
  }
  initializeMeals(member: Member, year: number, month: number): void {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    member.meals = {}; // Clear existing meals

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      member.meals[date] = { lunch: false, dinner: false };
    }
  }
  initializeGuestMeals(guest: Guest, year: number, month: number): void {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    guest.meals = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      guest.meals[date] = { lunch: false, dinner: false };
    }
  }

  // Generate dates for the specified month and year
  generateScheduleDates(year: number, month: number) {
    // Validate month range (0 = January, 11 = December)
    if (month < 0 || month > 11) {
      throw new Error('Month must be between 0 (January) and 11 (December)');
    }

    const startDate = new Date(year, month, 1); // First day of the month
    const endDate = new Date(year, month + 1, 0); // Last day of the month

    this.scheduleDates = []; // Clear previous dates
    let date = startDate;

    // Generate all dates for the specified month
    while (date <= endDate) {
      this.scheduleDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  // Triggered when a month is selected
  onMonthChange() {
    this.generateScheduleDates(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth()
    );
    this.filterDatesForMonth(this.selectedMonth);
    this.members.forEach((member) => {
      this.initializeMeals(
        member,
        this.selectedMonth.getFullYear(),
        this.selectedMonth.getMonth()
      );
    });

    this.guests.forEach((guest) =>
      this.initializeGuestMeals(
        guest,
        this.selectedMonth.getFullYear(),
        this.selectedMonth.getMonth()
      )
    );
  }

  // Filter dates based on the selected month, excluding the first day of the month
  filterDatesForMonth(selectedMonth: Date) {
    const selectedYear = selectedMonth.getFullYear();
    const selectedMonthIndex = selectedMonth.getMonth();

    this.filteredDates = this.scheduleDates
      .filter(
        (date) =>
          date.getFullYear() === selectedYear &&
          date.getMonth() === selectedMonthIndex
      )
      .map((date) => date.toString()); // Format dates as 'YYYY-MM-DD'
  }

  getMealStatus(
    member: Member,
    date: string,
    mealType: 'lunch' | 'dinner'
  ): boolean {
    return member.meals[date]?.[mealType] || false; // Defaults to false if not found
  }

  toggleMeal(member: Member, date: string, mealType: 'lunch' | 'dinner') {
    if (member.meals[date]) {
      member.meals[date][mealType] = !member.meals[date][mealType];
    } else {
      member.meals[date] = { lunch: false, dinner: false };
      member.meals[date][mealType] = true;
    }
    console.log('Updated members data:', this.members);
  }

  getTotalCount(date: string, mealType: 'lunch' | 'dinner'): number {
    return this.members.reduce((count, member) => {
      return count + (member.meals?.[date]?.[mealType] ? 1 : 0);
    }, 0);
  }

  isPastDate(date: string): boolean {
    const today = new Date();
    const currentDate = new Date(date);
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
    return currentDate < today;
  }
  // Calculate total meals for a member for the selected month
  getTotalMealsForMember(member: Member): number {
    return this.filteredDates.reduce((total, date) => {
      const lunch = member.meals[date]?.lunch ? 1 : 0;
      const dinner = member.meals[date]?.dinner ? 1 : 0;
      return total + lunch + dinner;
    }, 0);
  }

  getGrandTotalMeals(): number {
    return this.members.reduce((total, member) => {
      return total + this.getTotalMealsForMember(member);
    }, 0);
  }

  getTotalGuestCount(date: string, mealType: 'lunch' | 'dinner'): number {
    return this.guests.reduce((count, guest) => {
      return count + (guest.meals?.[date]?.[mealType] ? 1 : 0);
    }, 0);
  }

  // Function to calculate total meals for each guest across all dates in the month
  getTotalMealsForGuest(guest: Guest): number {
    return Object.values(guest.meals || {}).reduce(
      (total, meals) => total + (meals.lunch ? 1 : 0) + (meals.dinner ? 1 : 0),
      0
    );
  }

  // Function to get the grand total meals for all guests in the month
  getGrandTotalGuestMeals(): number {
    return this.guests.reduce((total, guest) => {
      return total + this.getTotalMealsForGuest(guest);
    }, 0);
  }
}
