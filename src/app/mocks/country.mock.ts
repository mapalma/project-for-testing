import { Country } from "../models/country.model";

export const mockCountry: Country[] = [{
    name: {
    common: 'test',
    official: 'test',
    },
    cca2: 'test',
    capital: ['test', 'test'],
    region: 'test',
    population:100,
    flags: {
    png: 'test',
    svg: 'test',
    },
    languages: { 'TS': 'test' },
    maps: {
        googleMaps: "https://goo.gl/maps/138JaXW8EZzRVitY9",
        openStreetMaps: "https://www.openstreetmap.org/relation/1311341"
    },
}]