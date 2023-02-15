const {Client} = require('@elastic/elasticsearch');
const {Indexer} = require('./lib/Indexer');
const configuration = require('./configuration.json');
const ocfl = require("@ocfl/ocfl-fs");
const fs = require("fs-extra");
const assert = require("assert");

(async () => {
  console.log('Configuring elastic');
  // Init elastic client
  const client = new Client({
    node: 'http://localhost:9200', //This is different from Oni since we are talking to it directly
  });
  // Bootstrap index
  // Delete
  await client.indices.delete({
    index: '*'
  });
  // Configure mappings
  const elastic = configuration['api']['elastic'];
  await client.indices.create({
    index: elastic['index'],
    body: {mappings: elastic['mappings']}
  });
  // Put Settings
  await client.indices.putSettings({
    index: elastic['index'],
    body: {mapping: {total_fields: {limit: elastic['mappingFieldLimit'] || 1000}}}
  })
  //Cluster settings
  const settings = {
    "persistent": {
      "search.max_open_scroll_context": elastic?.maxScroll || 5000
    },
    "transient": {
      "search.max_open_scroll_context": elastic?.maxScroll || 5000
    }
  }
  await client.cluster.putSettings({body: settings});
  const config = await client.cluster.getSettings();
  console.log(JSON.stringify(config));
  // Connect to an ocfl-repo
  const ocflConf = configuration.api.ocfl;
  const repository = ocfl.storage({root: ocflConf.ocflPath, workspace: ocflConf.ocflScratch, ocflVersion: '1.0'});
  console.log(repository.root)
  await repository.load();
  // Do we need to skip some collections/objects?
  let skipCollections = [];
  const skipConfiguration = "./index.skip.json"
  if (await fs.exists(skipConfiguration)) {
    skipCollections = await fs.readJson(skipConfiguration, "utf-8");
    assert(Array.isArray(skipCollections), `${skipConfiguration} not an array of strings, please fix.`);
  }
  // Create an Indexer and index collections
  const indexer = new Indexer({configuration, repository, client});
  await indexer.findOcflObjects({memberOf: null, conformsTo: indexer.conformsToCollection, skip: skipCollections});

})();
