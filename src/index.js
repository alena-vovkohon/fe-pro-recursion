/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */

const object1 = {
    title: "Title",
    id: 1,
    objTwo: {
        name: 'Hi',
        id: { id: 2 }
    },
};

const object2 = {
    title: "Title",
    id: 1,
    objTwo: {
        name: 'Hi',
        id: {
            id: 2,
        },
    },
};


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

    if (Array.isArray(obj) || Array.isArray(anotherObject)) {
        return false;
    }

    if (objFirst.length !== objAnother.length) {
        return false;
    }

    return objFirst.every(([key, value]) => {
        if (typeof value === 'object') {
            return deepEqual(value, anotherObject[key]);

        } else {
            return value === anotherObject[key]
        }
    })

};

console.log(deepEqual(object1, object2));
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
