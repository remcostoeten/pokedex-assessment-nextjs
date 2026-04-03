const fs = require('fs');

const pokemon = fs.readFile('./all.json', (err, buf) => {

    const fileAsString = buf.toString();
    let parsedFileAsString = fileAsString.slice(0, -2);
    parsedFileAsString = parsedFileAsString + ']';

    const pokemon = JSON.parse(parsedFileAsString);
    const filtered = pokemon.map(p => ({
        id: p.id,
        name: p.name,
        sprites: p.sprites,
        stats: p.stats,
        types: p.types,
        weight: p.weight
    }));
    
    fs.writeFileSync('./parsed.json', JSON.stringify(filtered));
});

