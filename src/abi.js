export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }
        ],
        "name": "CampaignCreated",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "title", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "string", "name": "category", "type": "string" },
            { "internalType": "string", "name": "image", "type": "string" },
            { "internalType": "uint256", "name": "goal", "type": "uint256" }
        ],
        "name": "createCampaign",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "campaignId", "type": "uint256" }
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "donor", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "Donated",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "campaignId", "type": "uint256" }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "Withdrawn",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "name": "campaigns",
        "outputs": [
            { "internalType": "string", "name": "title", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "string", "name": "category", "type": "string" },
            { "internalType": "string", "name": "image", "type": "string" },
            { "internalType": "uint256", "name": "goal", "type": "uint256" },
            { "internalType": "uint256", "name": "raised", "type": "uint256" },
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "bool", "name": "withdrawn", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "name": "donations",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "campaignId", "type": "uint256" }
        ],
        "name": "getCampaign",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "title", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "string", "name": "category", "type": "string" },
                    { "internalType": "string", "name": "image", "type": "string" },
                    { "internalType": "uint256", "name": "goal", "type": "uint256" },
                    { "internalType": "uint256", "name": "raised", "type": "uint256" },
                    { "internalType": "address", "name": "owner", "type": "address" },
                    { "internalType": "bool", "name": "withdrawn", "type": "bool" }
                ],
                "internalType": "struct WeCare.Campaign",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCampaigns",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "title", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "string", "name": "category", "type": "string" },
                    { "internalType": "string", "name": "image", "type": "string" },
                    { "internalType": "uint256", "name": "goal", "type": "uint256" },
                    { "internalType": "uint256", "name": "raised", "type": "uint256" },
                    { "internalType": "address", "name": "owner", "type": "address" },
                    { "internalType": "bool", "name": "withdrawn", "type": "bool" }
                ],
                "internalType": "struct WeCare.Campaign[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
export const CONTRACT_ADDRESS = "0x6c30c14c182d3e83d5943dfb0729d1a02d4086a6";