/**
 * Constructor cho Person
 * @param {string} name 
 * @param {number} age 
 */
export function Person(name, age) {
    this.name = name;
    this.age = age;
}

/** Giới thiệu bản thân */
Person.prototype.introduce = function() {
    return `Xin chào, tôi là ${this.name}, ${this.age} tuổi`;
};

/** Tăng tuổi */
Person.prototype.haveBirthday = function() {
    this.age++;
};

/**
 * Constructor cho Student kế thừa từ Person
 */
export function Student(name, age, school) {
    // Gọi constructor của cha (giống super() trong Java)
    Person.call(this, name, age);
    this.school = school;
}

// Thiết lập kế thừa prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

/** Phương thức riêng của Student */
Student.prototype.study = function() {
    return `${this.name} đang học tại ${this.school}`;
};