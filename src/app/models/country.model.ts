export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  languages: { [code: string]: string };
  maps: {
      googleMaps: "https://goo.gl/maps/138JaXW8EZzRVitY9",
      openStreetMaps: "https://www.openstreetmap.org/relation/1311341"
    };
}