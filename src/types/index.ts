export interface User {
  id: string;
  name: string;
  email: string;
  market: string;
  location: string;
  contactVisible: boolean;
  createdAt: Date;
}

export interface Vegetable {
  id: string;
  name: string;
  category: string;
}

export interface PriceEntry {
  id: string;
  vegetableId: string;
  vegetableName: string;
  price: number;
  unit: 'kg' | 'pc' | 'bundle';
  buyerId: string;
  buyerName: string;
  market: string;
  location: string;
  availableQuantity?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceHistory {
  id: string;
  priceEntryId: string;
  oldPrice: number;
  newPrice: number;
  updatedAt: Date;
}

export interface FilterOptions {
  vegetable?: string;
  market?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  sortBy?: 'price' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  vegetables: Vegetable[];
  priceEntries: PriceEntry[];
  priceHistory: PriceHistory[];
  filters: FilterOptions;
  selectedPriceEntry: PriceEntry | null;
  isModalOpen: boolean;
  modalType: 'priceHistory' | 'addEdit' | 'bulkUpdate' | null;
}
