export default defineEventHandler(async (event) => {
    const baseUrl = `https://api.bscscan.com/api`
    const contractaddress = process.env['USDT_CONTRACT_ADDRESS'] || '';
    const address = process.env['DEFAULT_ADDRESS'] || '';
    // const address = '0xdDa9365BbC83E17Cf99E530D2d6F1425C0Fd8137';
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
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }

        const data = await response.json();

        return data.result / 10 ** 18;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
        return error;
    }
})
