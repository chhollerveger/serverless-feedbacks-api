export type GenericType<T> = {
  [index in string | number | any]: T;
}