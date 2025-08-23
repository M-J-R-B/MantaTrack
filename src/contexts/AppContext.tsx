import React, { createContext, useContext, useState, useReducer, ReactNode } from 'react';
import { AppState, PriceEntry, FilterOptions, PriceHistory } from '../types';
import { priceEntries as initialPriceEntries, priceHistory as initialPriceHistory, vegetables as initialVegetables } from '../data/mockData';

interface AppContextType extends AppState {
  setFilters: (filters: Partial<FilterOptions>) => void;
  openModal: (type: AppState['modalType'], priceEntry?: PriceEntry) => void;
  closeModal: () => void;
  addPriceEntry: (entry: Omit<PriceEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePriceEntry: (id: string, updates: Partial<PriceEntry>) => void;
  deletePriceEntry: (id: string) => void;
  bulkUpdatePrices: (updates: { id: string; newPrice: number }[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Reducer for managing price entries
type AppAction = 
  | { type: 'SET_FILTERS'; payload: Partial<FilterOptions> }
  | { type: 'OPEN_MODAL'; payload: { type: AppState['modalType']; priceEntry?: PriceEntry } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_PRICE_ENTRY'; payload: PriceEntry }
  | { type: 'UPDATE_PRICE_ENTRY'; payload: { id: string; updates: Partial<PriceEntry> } }
  | { type: 'DELETE_PRICE_ENTRY'; payload: string }
  | { type: 'BULK_UPDATE_PRICES'; payload: { id: string; newPrice: number }[] };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        modalType: action.payload.type,
        selectedPriceEntry: action.payload.priceEntry || null,
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        modalType: null,
        selectedPriceEntry: null,
      };
    
    case 'ADD_PRICE_ENTRY':
      return {
        ...state,
        priceEntries: [...state.priceEntries, action.payload],
      };
    
    case 'UPDATE_PRICE_ENTRY':
      return {
        ...state,
        priceEntries: state.priceEntries.map(entry =>
          entry.id === action.payload.id
            ? { ...entry, ...action.payload.updates, updatedAt: new Date() }
            : entry
        ),
      };
    
    case 'DELETE_PRICE_ENTRY':
      return {
        ...state,
        priceEntries: state.priceEntries.filter(entry => entry.id !== action.payload),
      };
    
    case 'BULK_UPDATE_PRICES':
      return {
        ...state,
        priceEntries: state.priceEntries.map(entry => {
          const update = action.payload.find(u => u.id === entry.id);
          if (update) {
            return {
              ...entry,
              price: update.newPrice,
              updatedAt: new Date(),
            };
          }
          return entry;
        }),
      };
    
    default:
      return state;
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    vegetables: initialVegetables,
    priceEntries: initialPriceEntries,
    priceHistory: initialPriceHistory,
    filters: {},
    selectedPriceEntry: null,
    isModalOpen: false,
    modalType: null,
  });

  const setFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const openModal = (type: AppState['modalType'], priceEntry?: PriceEntry) => {
    dispatch({ type: 'OPEN_MODAL', payload: { type, priceEntry } });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const addPriceEntry = (entryData: Omit<PriceEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: PriceEntry = {
      ...entryData,
      id: (state.priceEntries.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_PRICE_ENTRY', payload: newEntry });
  };

  const updatePriceEntry = (id: string, updates: Partial<PriceEntry>) => {
    dispatch({ type: 'UPDATE_PRICE_ENTRY', payload: { id, updates } });
  };

  const deletePriceEntry = (id: string) => {
    dispatch({ type: 'DELETE_PRICE_ENTRY', payload: id });
  };

  const bulkUpdatePrices = (updates: { id: string; newPrice: number }[]) => {
    dispatch({ type: 'BULK_UPDATE_PRICES', payload: updates });
  };

  const value: AppContextType = {
    ...state,
    setFilters,
    openModal,
    closeModal,
    addPriceEntry,
    updatePriceEntry,
    deletePriceEntry,
    bulkUpdatePrices,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
