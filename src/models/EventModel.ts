export default interface EventModel {
  id: string;
  name: string;
  isOnline: boolean;
  isPrivate: boolean;
  date: Date;
  address: string;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
  dressCode?: string;
  entrancePrice?: number;
  maxCapacity?: number;
  minPeopleRequired?: number;
  description?: string;
}
