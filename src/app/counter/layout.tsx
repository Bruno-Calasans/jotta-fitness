import { WorkoutContextProvider } from "@/components/counter/context/WorkoutContext";

type CounterLayoutProps = {
  children: React.ReactNode;
};

export default function CounterLayout({ children }: CounterLayoutProps) {
  return <WorkoutContextProvider>{children}</WorkoutContextProvider>;
}
