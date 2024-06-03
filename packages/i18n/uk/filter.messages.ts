import {
  EBath,
  ECottage,
  EHotel,
  EPool,
  ESPA,
  ETank,
  EVenueType,
  EWaterPark,
} from '@spaps/enums';

export const filter_messages = {
  [EVenueType.pool]: 'Басейни',
  [EVenueType.water_park]: 'Аквапарки',
  [EVenueType.spa_center]: 'SPA-Центри',
  [EVenueType.hotel]: 'Готелі',
  [EVenueType.cottage]: 'Коттеджі',
  [EVenueType.tank]: 'Чани',
  [EVenueType.bath]: 'Лазні',
  [EBath.russian]: 'російська лазня',
  [EBath.finnish]: 'фінська сауна',
  [EBath.turkish]: 'турецький хаммам',
  [EBath.roman]: 'римська лазня',
  [EBath.infrared]: 'інфрачервона сауна',
  [EBath.japanese_ofuro]: 'японська лазня офуро',
  [EBath.carpathian]: 'карпатська лазня',
  [EBath.plunge_pools]: 'лазні з купелями',
  [ECottage.relax]: 'для відпочинку',
  [ECottage.events]: 'для заходів',
  [ECottage.eco]: 'еко-котеджі',
  [ECottage.luxury]: 'люкс-котеджі',
  [ECottage.pool]: 'з басейном',
  [ECottage.family]: 'cімейні',
  [ECottage.agricultural_estate]: 'котеджі в агросадибах',
  [EHotel.urban]: 'міські',
  [EHotel.resort]: 'курортні',
  [EHotel.boutique]: 'бутік-готелі',
  [EHotel.business]: 'бізнес-готелі',
  [EHotel.spa]: 'SPA готелі',
  [EHotel.thermal]: 'термальні',
  [EHotel.apart]: 'апарт готелі',
  [EHotel.eco]: 'еко-готелі',
  [EHotel.hostel]: 'хостели',
  [EHotel.agro_estate]: 'агро-садиби',
  [EPool.sports]: 'спортивні',
  [EPool.health]: 'оздоровчі',
  [EPool.thermal]: 'термальні',
  [EPool.private]: 'приватні',
  [EPool.public]: 'громадські',
  [EPool.childrens]: 'дитячі',
  [ESPA.day]: 'денні SPA',
  [ESPA.resort]: 'курортні SPA',
  [ESPA.medical]: 'медичні SPA',
  [ESPA.hotel]: 'SPA у готелях',
  [ESPA.thermal_springs]: 'SPA на термальних джерелах',
  [ESPA.fitness]: 'фітнес та SPA центри',
  [ESPA.eco]: 'еко-SPA',
  [ETank.wooden]: "дерев'яні",
  [ETank.metal]: 'металеві',
  [ETank.mineral_water]: 'з мінеральною водою',
  [ETank.thermal]: 'термальні',
  [ETank.spa]: 'SPA чани',
  [ETank.jacuzzi]: 'джакузі-чани',
  [ETank.herbal_infusion]: "чани з трав'яними відварами",
  [EWaterPark.covered]: 'криті',
  [EWaterPark.open]: 'відкриті',
  [EWaterPark.combined]: 'комбіновані',
  [EWaterPark.thematic]: 'тематичні',
  [EWaterPark.thermal]: 'термальні',
  date: 'Дата',
  guest_number: 'Кількість осіб',
  adults: 'Дорослі',
  children: 'Діти',
  price_range_per_hour: 'Діапазон цін / год.',
};
