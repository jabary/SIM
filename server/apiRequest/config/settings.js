const config = {
    marklogic: {
        sourceDb: {
            hostname: "mldev1a.apa.org",
            xdpc: 9285,
            http: 8000,
            username: "mjabari",
            password: "mjabari",
            dbName: "asc2-dev-r1"
        },
        desctinationDb: {
            hostname: "mldev1a.apa.org",
            xdpc: 9255,
            http: 9255,
            username: "asultan",
            password: "asultan",
            dbName: "asc2-dev-sim"
        }
    }
};

module.exports = config;

