export function ForceConstructor(param1, param2, param3) {
  if (!new.target) {
    return new ForceConstructor(param1, param2, param3);
  }
  this.param1 = param1;
  this.param2 = param2;
  this.param3 = param3;
}
