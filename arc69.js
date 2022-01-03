/** Fetches and parses ARC69 metadata for Algorand NFTs. */
export class Arc69 {
    constructor() {
        this.algoExplorerApiBaseUrl = "https://algoindexer.algoexplorerapi.io/v2";
    }

    async fetch(assetId) {
        // Fetch `acfg` transactions.
        const url = `${this.algoExplorerApiBaseUrl}/assets/${assetId}/transactions?tx-type=acfg`;
        let transactions;
        try {
            transactions = (await fetch(url).then((res) => res.json())).transactions;
        }
        catch (err) {
            console.error(err);
            return null;
        }

        // Sort the most recent `acfg` transactions first.
        transactions.sort((a, b) => b["round-time"] - a["round-time"]);

        // Attempt to parse each `acf` transaction's note for ARC69 metadata.
        for (const transaction of transactions) {
            try {
                const noteBase64 = transaction.note;
                const noteString = atob(noteBase64)
                    .trim()
                    .replace(/[^ -~]+/g, "");
                const noteObject = JSON.parse(noteString);
                if (noteObject.standard === "arc69") {
                    return noteObject;
                }
            }
            catch (err) {
                // Oh well...
            }
        }
        return null;
    }
}
