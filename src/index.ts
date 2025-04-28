import express, { Request, Response } from 'express';

const { MetadataService } = require("@aws-sdk/ec2-metadata-service");


const app = express();
const port = 80;
const hostname = '0.0.0.0'; // Set the hostname (e.g., 0.0.0.0 to listen on all interfaces)

const metadataService = new MetadataService({});


const getRegion = async () => {
    try {
        const region = await metadataService.request("/latest/meta-data/placement/availability-zone", {});
        
        return region;
    } catch (error) {
        console.error('Error fetching regions:', error);
        throw error;
    }
};

// Define a GET endpoint
app.get('/', async (req: Request, res: Response) => {
    const r = await getRegion();
    // res.send('Hello, World!');
    res.send(`AWS Region: ${JSON.stringify(r, null, 1)}`);
});

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});





