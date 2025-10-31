'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ProductType = 'gallery' | 'transfer';

interface ProductContextType {
  activeProduct: ProductType;
  setActiveProduct: (product: ProductType) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<ProductType>('gallery');

  return (
    <ProductContext.Provider value={{ activeProduct, setActiveProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}