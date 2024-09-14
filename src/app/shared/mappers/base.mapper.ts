export abstract class BaseMapper<T, U> {
  abstract to(entity: T): U;
  abstract from(dto: U): T;
  abstract mapList(entities: T[]): U[];
  abstract mapListFrom(dtos: U[]): T[];
  // Optional methods

}
