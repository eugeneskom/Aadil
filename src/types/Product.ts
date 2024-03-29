export interface Product {
  Id: string; 
  CatalogId: string; 
  CampaignId: string; 
  CampaignName: string; 
  CatalogItemId: string; 
  Name: string; 
  Description: string;
  StockAvailability: string; 
  OriginalFormatCategory: string;
  CurrentPrice: string;
  OriginalPrice: string;
  Manufacturer: string;
  Currency: string;
  Colors: string[];
  Condition: string;
  Gender: string;
  ImageUrl:string;
  Url: String;
  Uri: String;
  Category: String;
  SubCategory: String;
}