import fetch from "node-fetch"
import * as fs from "fs";
/*
Explain
How to set up 
1.npm install
1. first need to set Json server run at port 4000 => to get the devices.json using fetch
npx json-server -p 4000 data/devices.json
2. run by => node solution-ex1.js 
how these functions work ?

- main function => to run the solution
- getData function => get data from devices.json
then call reformatData => this will transform data to output format
according to the schema.json

In side reformatData,  I called another 3 functions, 
1.getInfo => to split the uuid and reform the Info datails
2.getPayloadTotal => to calculate total Sensors payload of each device
3.setDataToOrder => to sort array by name (alphabetically)


*/
const main = () => {

    getData();

}
const getData = async () => {
    fetch('http://localhost:4000/Devices')
        .then((response) => response.json())
        .then((data) => {
            const updateData = reformatData(data);

            console.log('result:', updateData);
            fs.writeFile('result.json', JSON.stringify(updateData), 'utf8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('successfully created result.json');
                }
            })
        })
        .catch((error) => {
            console.log('Failed to fetched :', error);
            return;
        });
}

const reformatData = (data) => {
    const updateData = data.map((element => {
        const { Name, Type, Info, Sensors } = element;
        const { infoDetails, uuid } = getInfo(Info);
        const total = getPayloadTotal(Sensors);

        return {
            Name: Name,
            Type: Type,
            Info: infoDetails,
            Uuid: uuid,
            PayloadTotal: total
        }
    }))
    const dataInOrder = setDataToOrder(updateData);
    return {Devices:dataInOrder};
}
const getInfo = (info) => {
    const splits = info.split(' ');
    let infoDetails = "", uuid = "";
    for (let i = 0; i < splits.length; i++) {
        if (splits[i].includes('uuid:')) {
            uuid = splits[i].replace('uuid:', '');
        } else {
            infoDetails = infoDetails + splits[i] + ' ';
        }
    }

    return { infoDetails: infoDetails, uuid: uuid };

}
const getPayloadTotal = (Sensors) => {
    const total = Sensors.reduce((sum, sensor) => {
        return Number(sum) + Number(sensor.Payload);
    }, 0)
    return total;
}
const setDataToOrder = (updateData)=>{
    return updateData.sort((a, b) => a.Name.localeCompare(b.Name));

}


main();