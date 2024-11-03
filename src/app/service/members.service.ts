import { Injectable } from '@angular/core';
import { Member } from '../domain/member';
@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor() {}

  getMemberList(): Member[] {
    return [
      {
        id: '1',
        code: 1001,
        name: 'Alice Johnson',
        type: 'Admin',
        joinedDate: new Date('2023-01-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '2',
        code: 1002,
        name: 'Bob Smith',
        type: 'Manager',
        joinedDate: new Date('2023-02-10'),
        dueJoiningFees: 50,
        joiningFees: 'Remain',
      },
      {
        id: '3',
        code: 1003,
        name: 'Charlie Brown',
        type: 'Full Border',
        joinedDate: new Date('2023-03-20'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '4',
        code: 1004,
        name: 'David Williams',
        type: 'Guest',
        joinedDate: new Date('2023-04-05'),
        dueJoiningFees: 20,
        joiningFees: 'Remain',
      },
      {
        id: '5',
        code: 1005,
        name: 'Eva Green',
        type: 'Manager',
        joinedDate: new Date('2023-05-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '6',
        code: 1001,
        name: 'Alice Johnson',
        type: 'Admin',
        joinedDate: new Date('2023-01-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '7',
        code: 1002,
        name: 'Bob Smith',
        type: 'Manager',
        joinedDate: new Date('2023-02-10'),
        dueJoiningFees: 50,
        joiningFees: 'Remain',
      },
      {
        id: '8',
        code: 1003,
        name: 'Charlie Brown',
        type: 'Full Border',
        joinedDate: new Date('2023-03-20'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '9',
        code: 1004,
        name: 'David Williams',
        type: 'Guest',
        joinedDate: new Date('2023-04-05'),
        dueJoiningFees: 20,
        joiningFees: 'Remain',
      },
      {
        id: '10',
        code: 1005,
        name: 'Eva Green',
        type: 'Manager',
        joinedDate: new Date('2023-05-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '11',
        code: 1001,
        name: 'Alice Johnson',
        type: 'Admin',
        joinedDate: new Date('2023-01-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '12',
        code: 1002,
        name: 'Bob Smith',
        type: 'Manager',
        joinedDate: new Date('2023-02-10'),
        dueJoiningFees: 50,
        joiningFees: 'Remain',
      },
      {
        id: '13',
        code: 1003,
        name: 'Charlie Brown',
        type: 'Full Border',
        joinedDate: new Date('2023-03-20'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '14',
        code: 1004,
        name: 'David Williams',
        type: 'Guest',
        joinedDate: new Date('2023-04-05'),
        dueJoiningFees: 20,
        joiningFees: 'Remain',
      },
      {
        id: '15',
        code: 1005,
        name: 'Eva Green',
        type: 'Manager',
        joinedDate: new Date('2023-05-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '16',
        code: 1001,
        name: 'Alice Johnson',
        type: 'Admin',
        joinedDate: new Date('2023-01-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '17',
        code: 1002,
        name: 'Bob Smith',
        type: 'Manager',
        joinedDate: new Date('2023-02-10'),
        dueJoiningFees: 50,
        joiningFees: 'Remain',
      },
      {
        id: '18',
        code: 1003,
        name: 'Charlie Brown',
        type: 'Full Border',
        joinedDate: new Date('2023-03-20'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
      {
        id: '19',
        code: 1004,
        name: 'David Williams',
        type: 'Guest',
        joinedDate: new Date('2023-04-05'),
        dueJoiningFees: 20,
        joiningFees: 'Remain',
      },
      {
        id: '20',
        code: 1005,
        name: 'Eva Green',
        type: 'Manager',
        joinedDate: new Date('2023-05-15'),
        dueJoiningFees: 0,
        joiningFees: 'Full Paid',
      },
    ];
  }

  getMember() {
    return Promise.resolve(this.getMemberList());
  }
}