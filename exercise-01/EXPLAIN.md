
Explain

How to set up 

1. npm install
2. first need to set Json server run at port 4000 => to get the devices.json using fetch
npx json-server -p 4000 data/devices.json
3. run by => node solution-ex1.js 
   
How these functions work ?

- main function => to run the solution
- getData function => get data from devices.json
then call reformatData => this will transform data to output format
according to the schema.json

In side reformatData,  I called another 3 functions

1.getInfo => to split the uuid and reform the Info datails

2.getPayloadTotal => to calculate total Sensors payload of each device

3.setDataToOrder => to sort array by name (alphabetically)

