export default interface EventModel {
  id: string;
  name: string;
  isOnline: boolean;
  isPrivate: boolean;
  date: string;
  time: string;
  timezoneCode: string;
  address: string;
  createdAt: Date;
  createdBy: string;
  dressCode?: string;
  entrancePrice?: number;
  maxCapacity?: number;
  minPeopleRequired?: number;
  description?: string;
}
