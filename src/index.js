/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */

export const deepEqual = (obj, anotherObject) => {
    let objFirst = Object.entries(obj);
    let objAnother = Object.entries(anotherObject);

    if (obj === null || anotherObject === null) {
        return false;
    }

    if (obj === undefined || anotherObject === undefined) {
        return false;
    }

    if (typeof obj !== typeof anotherObject) {
        return false;
    }

    if (objFirst.length !== objAnother.length) {
        return false;
    }

    return objFirst.every(([key, value], index) => {
        if (typeof value === 'object') {
            console.log('є obj');
            return deepEqual(value, objAnother[index][1])
        } else if (key === objAnother[index][0] && value === objAnother[index][1]) {
            console.log('keys');
            return true;
        } else {
            return false
        }
    })


};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */

export const deepCopy = (obj) => { 
    let clon = {};
    if (typeof obj !== 'object' || obj === null || obj === undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => typeof item === "object" ? deepCopy(item) : item);
    } else {
        for (const i in obj) {
            typeof obj[i] === 'object' ? clon[i] = deepCopy(obj[i]) : clon[i] = obj[i]
          }  
         return clon;
    }
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */

export const getAllObjectKeys = (obj) => {
    let arr = [];
    if (typeof obj === "object") {
        for (const i in obj) {
        if (typeof obj[i] === 'object') {
            arr.push(i); 
            arr.push(...getAllObjectKeys(obj[i]));
        }
        else {
           arr.push(i);
        }
    }}
    return [...new Set(arr)];
};
