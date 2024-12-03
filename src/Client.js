import createClient from "@sanity/client";

const client = new createClient({
    projectId: 'h83n4udb', // Replace with your actual project ID
    dataset: 'production', // Replace with your dataset
    useCdn: true, // `true` if you want to use the CDN for faster, cacheable responses
});

export default client;