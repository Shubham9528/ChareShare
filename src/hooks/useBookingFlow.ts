import { create } from 'zustand';
import { Provider, DetailedProvider } from '../types/provider';
import { PackageOption } from '../components/patientprofile/providerservice/package/PackageSelectionPage';

interface BookingState {
  // Step 1: Category Selection
  selectedCategory: string | null;
  
  // Step 2: Provider Selection
  selectedProvider: DetailedProvider | null;
  
  // Step 3: Provider Profile & Initial Details
  appointmentType: 'voice' | 'video' | 'message' | 'in-person' | null;
  
  // Step 4: Package Selection
  selectedPackage: PackageOption | null;
  duration: number;
  
  // Step 5: Appointment Details
  appointmentDate: string;
  appointmentTime: string;
  patientConcern: string;
  selectedAddress: string;
  
  // Actions
  setCategory: (category: string) => void;
  setProvider: (provider: DetailedProvider) => void;
  setAppointmentType: (type: 'voice' | 'video' | 'message' | 'in-person') => void;
  setPackageDetails: (pkg: PackageOption, duration: number) => void;
  setAppointmentDetails: (details: {
    date: string;
    time: string;
    concern: string;
    address: string;
  }) => void;
  resetBookingFlow: () => void;

  // Add validation
  isBookingComplete: () => boolean;
}

const initialState = {
  selectedCategory: null,
  selectedProvider: null,
  appointmentType: null,
  selectedPackage: null,
  duration: 30,
  appointmentDate: '',
  appointmentTime: '',
  patientConcern: '',
  selectedAddress: ''
};

export const useBookingFlow = create<BookingState>((set, get) => ({
  ...initialState,

  setCategory: (category: string) => set({ selectedCategory: category }),
  
  setProvider: (provider: DetailedProvider) => set({ selectedProvider: provider }),
  
  setAppointmentType: (type: 'voice' | 'video' | 'message' | 'in-person') => 
    set({ appointmentType: type }),
  
  setPackageDetails: (pkg: PackageOption, duration: number) => 
    set({ selectedPackage: pkg, duration }),
  
  setAppointmentDetails: (details: {
    date: string;
    time: string;
    concern: string;
    address: string;
  }) => set({
    appointmentDate: details.date,
    appointmentTime: details.time,
    patientConcern: details.concern,
    selectedAddress: details.address
  }),
  
  resetBookingFlow: () => set(initialState),

  // Add validation method
  isBookingComplete: () => {
    const state = get();
    return !!(
      state.selectedCategory &&
      state.selectedProvider &&
      state.appointmentType &&
      state.selectedPackage &&
      state.appointmentDate &&
      state.appointmentTime
    );
  }
})); 