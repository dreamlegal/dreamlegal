"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const useStepContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};

interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <Context.Provider value={{ step, nextStep, prevStep, setStep }}>
      {children}
    </Context.Provider>
  );
};
