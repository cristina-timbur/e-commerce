function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return arr1.every((value, index) => value === arr2[index]);
}

function generateCompositeFK(n, randGen1, randGenParams1, randGen2, randGenParams2){
    const keys = new Array(n).fill([0, 0]);
    for(let i = 0; i < keys.length; i ++){
        let newKey = [randGen1(randGenParams1), randGen2(randGenParams2)];
        let found = keys.find(item => compareArrays(item, newKey));
        while(found != undefined){
            newKey = [randGen1(randGenParams1), randGen2(randGenParams2)];
            found = keys.find(item => compareArrays(item, newKey));    
        }
        keys[i] = newKey;
    }
    return keys;
}

module.exports = {
    generateCompositeFK
}