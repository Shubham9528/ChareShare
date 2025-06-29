import { useState, useEffect } from 'react';
import { dbService, InsuranceBenefit } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useInsuranceBenefits = () => {
  const { user } = useAuth();
  const [benefits, setBenefits] = useState<InsuranceBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Calculate overall benefits stats
  const overallBenefits = {
    total: benefits.reduce((sum, benefit) => sum + benefit.total_amount, 0),
    used: benefits.reduce((sum, benefit) => sum + benefit.used_amount, 0),
    get usedPercentage() {
      return this.total > 0 ? Math.round((this.used / this.total) * 100) : 0;
    },
    get remaining() {
      return this.total - this.used;
    }
  };

  // Fetch benefits
  useEffect(() => {
    const fetchBenefits = async () => {
      if (!user) {
        setBenefits([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getInsuranceBenefits(user.id);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setBenefits(data);
        } else {
          // If no data, create mock data for development
          setBenefits(mockInsuranceBenefits(user.id));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching insurance benefits:', err);
        setError(err as Error);
        // Use mock data on error
        setBenefits(mockInsuranceBenefits(user.id));
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, [user]);

  // Add benefit
  const addBenefit = async (benefit: Omit<InsuranceBenefit, 'id' | 'patient_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      setLoading(true);
      const newBenefit = await dbService.addInsuranceBenefit({
        patient_id: user.id,
        ...benefit
      });
      
      setBenefits(prev => [...prev, newBenefit]);
      return newBenefit;
    } catch (err) {
      console.error('Error adding insurance benefit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update benefit
  const updateBenefit = async (benefitId: string, updates: Partial<InsuranceBenefit>) => {
    try {
      setLoading(true);
      const updatedBenefit = await dbService.updateInsuranceBenefit(benefitId, updates);
      
      setBenefits(prev => 
        prev.map(benefit => 
          benefit.id === benefitId ? updatedBenefit : benefit
        )
      );
      
      return updatedBenefit;
    } catch (err) {
      console.error('Error updating insurance benefit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete benefit
  const deleteBenefit = async (benefitId: string) => {
    try {
      setLoading(true);
      await dbService.deleteInsuranceBenefit(benefitId);
      
      setBenefits(prev => prev.filter(benefit => benefit.id !== benefitId));
      return true;
    } catch (err) {
      console.error('Error deleting insurance benefit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    benefits,
    overallBenefits,
    loading,
    error,
    addBenefit,
    updateBenefit,
    deleteBenefit
  };
};

// Mock data for development
function mockInsuranceBenefits(patientId: string): InsuranceBenefit[] {
  return [
    {
      id: '1',
      patient_id: patientId,
      benefit_type: 'Dentistry',
      provider_name: 'Blue Cross Insurance',
      policy_number: 'DEN123456',
      total_amount: 1000,
      used_amount: 300,
      renewal_date: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      patient_id: patientId,
      benefit_type: 'Physiotherapy',
      provider_name: 'Blue Cross Insurance',
      policy_number: 'PHY123456',
      total_amount: 800,
      used_amount: 200,
      renewal_date: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      patient_id: patientId,
      benefit_type: 'Massage Therapy',
      provider_name: 'Blue Cross Insurance',
      policy_number: 'MAS123456',
      total_amount: 600,
      used_amount: 150,
      renewal_date: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      patient_id: patientId,
      benefit_type: 'Chiropractic',
      provider_name: 'Blue Cross Insurance',
      policy_number: 'CHI123456',
      total_amount: 500,
      used_amount: 100,
      renewal_date: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}