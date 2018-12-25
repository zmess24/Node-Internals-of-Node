const dns = require('dns');

/**
|--------------------------------------------------
| DNS MODULE
|
| Translate networks to addresses, and vice versa.
|--------------------------------------------------
*/
// 1. Gives us the IP address for provided hostname.
dns.lookup('pluralsight.com', (err, address) => {
    console.log(address);
});

// 2. Gives us an array of addresses in cases the hostname has multiple IP addresses.
// Defaults to 'A' records.
dns.resolve4('pluralsight.com', (err, address) => {
    console.log(address);
});

// 3.
dns.resolveMx('pluralsight.com', (err, address) => {
    console.log(address);
});

// 4. Translates an IP address back into hostnames
dns.reverse('54.213.183.159', (err, hostnames) => {
    console.log(hostnames)
})