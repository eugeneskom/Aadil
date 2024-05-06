export interface singleCategoryType {
  count: number;
  category: string;
  subcategories: SubcategoryType[];
}
export interface SubcategoryType {
  category: string;
  count: number;
}