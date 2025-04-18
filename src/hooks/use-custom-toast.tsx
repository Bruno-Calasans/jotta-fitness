'use client';

import { useToast } from '@/hooks/use-toast';

export default function useCustomToast() {
  const { toast } = useToast();

  const errorToast = (title: string, description: string) => {
    toast({
      title: (<p className='text-white font-bold'>{title}</p>) as any,
      description: (
        <p className='text-white font-bold'>{description}</p>
      ) as any,
      variant: 'destructive',
    });
  };

  const successToast = (title: string, description: string) => {
    toast({
      title: (<p className='text-white font-bold'>{title}</p>) as any,
      description: (
        <p className='text-white font-bold'>{description}</p>
      ) as any,
      className: 'text-white bg-emerald-500 font-bold text-black',
    });
  };

  const infoToast = (title: string, description: string) => {
    toast({
      title: (<p className='text-white font-bold'>{title}</p>) as any,
      description: (
        <p className='text-white font-bold'>{description}</p>
      ) as any,
      className: 'bg-indigo200 font-bold text-black',
    });
  };

  return { errorToast, successToast, infoToast };
}
