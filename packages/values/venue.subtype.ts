import {
  EVenueType,
  EPool,
  EWaterPark,
  ESPA,
  ECottage,
  EHotel,
  ETank,
  EBath,
} from '../core/enums';

export const VenueSubtype: Record<EVenueType, string[]> = {
  [EVenueType.pool]: Object.values(EPool),
  [EVenueType.water_park]: Object.values(EWaterPark),
  [EVenueType.spa_center]: Object.values(ESPA),
  [EVenueType.hotel]: Object.values(EHotel),
  [EVenueType.cottage]: Object.values(ECottage),
  [EVenueType.tank]: Object.values(ETank),
  [EVenueType.bath]: Object.values(EBath),
};
