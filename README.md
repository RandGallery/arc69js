# arc69js

Fetches and parses ARC69 metadata for Algorand NFTs.

### Usage

```js
// STUPIDHORSE 069
// https://www.randgallery.com/algo-collection/?address=308075440
const assetId = 308075440; 

// Fetch and use ARC69 metadata.
const arc69 = new Arc69();
arc69.fetch(assetId).then((metadata) => {
    // Check metadata is available.
    if (!metadata) {
        console.log('No ARC69 metadata found 🥱');
        return;
    }

    // Check for description.
    if (metadata.description) {
        console.log('Description:', metadata.description);
    }

    // Check for external URL.
    if (metadata.external_url) {
        console.log('External URL:', metadata.external_url);
    }
    
    // Normalize properties.
    if (metadata.properties) {
        metadata.attributes = Object.entries(metadata.properties).map(
            ([trait_type, value]) => ({
                trait_type,
                value,
            })
        );
    }

    // Check for attributes.
    if (metadata.attributes) {
        metadata.attributes.map(({ trait_type, value }) => {
            console.log('Attribute:', trait_type, value);
        });
    }
});
```

## Resources

Want to _add_ metadata to existing NFTs? https://github.com/algokittens/arc69/blob/master/pre-existing-NFTs.md

Want to learn more about the ARC69 spec? https://github.com/algokittens/arc69
