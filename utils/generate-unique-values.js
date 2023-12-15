function generateUniqueValues(randGen, randGenParams, n){
    const data = new Array(n).fill();
    for(let i = 0; i < data.length; i ++){
        let newValue = randGen(randGenParams);
        let found = data.find(item => item === newValue);
        while(found != undefined){
            newValue = randGen(randGenParams);
            found = data.find(item => item === newValue);
        }
        data[i] = newValue;
    }
    return data;
}

module.exports = {
    generateUniqueValues
}