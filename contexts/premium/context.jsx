"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";


const PremiumContext = createContext();

export default function PremiumProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);


    const [selectedPackage, setSelectedPackage] = useState(null);



  

  return (
    <PremiumContext.Provider
      value={{
        error,
        isLoading,
        selectedPackage,
        setSelectedPackage,
        
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export const usePremium = () => useContext(PremiumContext);
