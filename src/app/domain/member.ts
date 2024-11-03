export interface Member {
  id?: string;
  code?: number;
  name?: string;
  type?: string; // Restrict to the four specified types
  joinedDate?: Date;
  dueJoiningFees: number; // Amount due in joining fees
  joiningFees?: 'Full Paid' | 'Remain'; // Paid status
}
