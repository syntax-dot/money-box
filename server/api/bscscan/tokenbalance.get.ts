export default defineEventHandler(async (event) => {
    const baseUrl = `https://api.bscscan.com/api`
    const contractaddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
    // const address = '0x89e73303049ee32919903c09e8de5629b84f59eb';
    const address = '0xdDa9365BbC83E17Cf99E530D2d6F1425C0Fd8137';
    const apikey = 'HJHSF5WYCM8262DRKYYUGKT4IP41T55SID';

    const queryParams = new URLSearchParams({
        module: 'account',
        action: 'tokenbalance',
        tag: 'latest',
        address,
        apikey,
        contractaddress,
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
        // Make the API request using fetch
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Use the data or return it as needed
        console.log(data);

        // Example: return the data from the API request
        return data;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
        return error;
    }
})
