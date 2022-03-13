export interface iMapper<T, Y> {
  toDTO(obj: T): Y | null;
  toEntity(obj: Y): T;
}
