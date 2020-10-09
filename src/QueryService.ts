const Pool = require('pg').Pool

export default class QueryService {
    pool: any;
    
    constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT,
        });
    }

    public async query(query: string) {
        const results = await this.pool.query(query);
        return results.rows;
    }
}