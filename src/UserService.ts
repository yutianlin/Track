import QueryService from './QueryService';

export default class UserService {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getUsers = async () => {
    return this.queryService.query('SELECT * FROM users')
  }
}