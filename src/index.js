/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */


export const deepEqual = (obj, anotherObject) => {

    let obj1 = Object.keys(obj);
    let obj2 = Object.keys(anotherObject);
    console.log(obj1);
    console.log(obj2);
    let obj1Value = Object.values(obj);
    let obj2Value = Object.values(anotherObject);
    console.log(obj1Value);
    console.log(obj2Value);

    if (typeof obj !==  typeof anotherObject) {
        return false;
    }
    if (Array.isArray(obj) || Array.isArray(anotherObject)) {
        return false;
    }

    if (obj1.length !== obj2.length) {
        return false;
    }

    for (let i = 0; i < obj1.length; i += 1){
        if (typeof obj[obj1[i]] === "object") {
            return deepEqual(obj[obj1[i]], anotherObject[obj2[i]]);
        } else {
            if (!obj2.includes(obj1[i]) || !obj2Value.includes(obj1Value[i])) {
                return false;
            }
        }
    }

    return true
    
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

    if (Array.isArray(obj)) {
        obj.map((item) => {
            if (typeof item === "object") {
                deepCopy(item);
            }
        })
    }
    for (const i in obj) {
        if (typeof obj[i] === 'object') {
            clon[i] = deepCopy(obj[i]);
        }
        clon[i] = obj[i];
    }
    return clon;
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */

export const getAllObjectKeys = (obj) => {
    let arr = [];
    for (const i in obj) {
        if (typeof obj[i] === 'object') {
            arr.push(i); 
            arr.push(...getAllObjectKeys(obj[i]));
        } else {
            arr.push(i);
        }
    }
    let set = new Set(arr);
    return set;
};