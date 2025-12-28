export function User() {
  this.name = null;
  this.age = null;

  this.askName = () => {
    this.name = prompt("Введите ваше имя:");
    return this;
  };
  this.askAge = () => {
    this.age = parseInt(prompt("Введите ваш возраст:"), 10);
    return this;
  };
  this.showAgeInConsole = () => {
    console.log(`Возраст: ${this.age}`);
    return this;
  };
  this.showNameInAlert = () => {
    alert(`Имя: ${this.name}`);
    return this;
  };
  return this;
}
