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
    },
};

const object2 = {
    title: "Title",
    id: 1,
    objTwo: {
        name: 'Hi',
        id: 2,
    },
};

// const object2 = [
//     5,
//     { b: { a: 8, t: { q: 48 } } },
//     47,
//     { l: { b: 85 } },
//     [2, { a: 'test', s: 'test2' }]
// ]

export const deepEqual = (obj, anotherObject) => {

    // let obj1Key = Object.keys(obj);
    let obj2Key = Object.keys(anotherObject);
    // let obj1Value = Object.values(obj);
    // let obj2Value = Object.values(anotherObject);
    let obj1 = Object.entries(obj);
    let obj2 = Object.entries(anotherObject);
    // console.log('obj1', obj1)
    // console.log('obj2', obj2)

    if (obj === null || anotherObject === null) {
        return false;
    }
    if (obj === undefined || anotherObject === undefined) {
        return false;
    }

    if (typeof obj !== typeof anotherObject) {
        console.log('не обєкт')
        return false;
    }
    if (Array.isArray(obj) || Array.isArray(anotherObject)) {
        console.log('один масив')
        return false;
    }

    if (obj1.length !== obj2.length) {
        console.log('різна довжина')
        return false;
    }

    return obj1.every(([key, value], index) => {
        if (typeof value === 'object') {
            console.log('є obj');
            return deepEqual(value, anotherObject[obj2Key[index]])
        } else if (key === obj2[index][0] && value === obj2[index][1]) {
            console.log('keys');
            return true;
        } else {
            return false
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

const objOriginal = {
    a: 5,
    b: { g: 8, b: { q: 48 } },
    q: { f: 85 },
    r: [3, 5, 7, 1],
};

const arrOriginal = [
    5,
    { b: { a: 8, t: { q: 48 } } },
    47,
    { l: { b: 85 } },
    [2, { a: 'test', s: 'test2' }]
];

export const deepCopy = (obj) => { 
    let clon = {};
    if (typeof obj !== 'object' || obj === null || obj === undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => typeof item === "object" ? deepCopy(item) : item

            // if (typeof item === "object" ) {
            //    return deepCopy(item);
            // } else {
            //    return item
            // }
        )
    } else {
        for (const i in obj) {
            // console.log(i, obj[i]);
            typeof obj[i] === 'object' ? clon[i] = deepCopy(obj[i]) : clon[i] = obj[i]
            // if (typeof obj[i] === 'object') {
            //     clon[i] = deepCopy(obj[i]);
            // } else {
            //     clon[i] = obj[i];
            // }
              
          }  
         return clon;
    }

   
   

};

console.log(deepCopy(arrOriginal));

console.log(deepCopy(objOriginal));


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
    }   
    }
   
    return [...new Set(arr)];
};
console.log(getAllObjectKeys(objOriginal));
