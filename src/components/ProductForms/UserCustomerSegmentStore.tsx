import { create } from 'zustand';
import { z } from 'zod';

const CategorySchema = z.object({
  name: z.string(),
  percentage: z.number().min(0).max(100)
});

const CustomerSegmentSchema = z.object({
  userCategories: z.array(CategorySchema),
  industries: z.array(CategorySchema),
  practiceAreas: z.array(CategorySchema),
  teamSizes: z.array(CategorySchema)
});

type CustomerSegment = z.infer<typeof CustomerSegmentSchema>;

interface CustomerSegmentStore {
  customerSegment: CustomerSegment;
  addCategory: (type: keyof CustomerSegment, name: string) => void;
  removeCategory: (type: keyof CustomerSegment, name: string) => void;
  updatePercentage: (type: keyof CustomerSegment, name: string, percentage: number) => void;
  validateAndSave: () => boolean;
}

export const useCustomerSegmentStore = create<CustomerSegmentStore>((set, get) => ({
  customerSegment: {
    userCategories: [],
    industries: [],
    practiceAreas: [],
    teamSizes: []
  },

  addCategory: (type, name) => set((state) => {
    const newCategories = [...state.customerSegment[type], { name, percentage: 0 }];
    const totalCategories = newCategories.length;
    const equalPercentage = Math.floor(100 / totalCategories);
    const remainder = 100 % totalCategories;

    const updatedCategories = newCategories.map((category, index) => ({
      ...category,
      percentage: equalPercentage + (index < remainder ? 1 : 0)
    }));

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),

  removeCategory: (type, name) => set((state) => {
    const updatedCategories = state.customerSegment[type].filter(category => category.name !== name);
    const totalCategories = updatedCategories.length;
    
    if (totalCategories > 0) {
      const equalPercentage = Math.floor(100 / totalCategories);
      const remainder = 100 % totalCategories;

      updatedCategories.forEach((category, index) => {
        category.percentage = equalPercentage + (index < remainder ? 1 : 0);
      });
    }

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),

  updatePercentage: (type, name, newPercentage) => set((state) => {
    const categories = state.customerSegment[type];
    const categoryIndex = categories.findIndex(category => category.name === name);
    
    if (categoryIndex === -1) return state;

    const oldPercentage = categories[categoryIndex].percentage;
    const diff = newPercentage - oldPercentage;

    const updatedCategories = categories.map((category, index) => {
      if (index === categoryIndex) {
        return { ...category, percentage: newPercentage };
      }

      const otherCategoriesCount = categories.length - 1;
      if (otherCategoriesCount > 0) {
        const adjustment = diff / otherCategoriesCount;
        return { ...category, percentage: Math.max(0, category.percentage - adjustment) };
      }

      return category;
    });

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),

  validateAndSave: () => {
    const result = CustomerSegmentSchema.safeParse(get().customerSegment);
    if (result.success) {
      // Here you would typically save the data to your backend
      console.log('Data is valid. Saving:', result.data);
      return true;
    } else {
      console.error('Validation failed:', result.error);
      return false;
    }
  }
}));