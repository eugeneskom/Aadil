export interface Catalog {
  Id: string;
  Name: string;
  Language: string;
  AdvertiserId: string;
  AdvertiserName: string;
  AdvertiserLocation: string;
  CampaignId: string;
  CampaignName: string;
  NumberOfItems: string;
  DateLastUpdated: Date;
  Locations: string[];
  FTPLocations: string[];
  ItemsUri: string;
  Uri: string;
}