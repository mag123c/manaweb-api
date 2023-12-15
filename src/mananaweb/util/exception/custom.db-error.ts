export class DatabaseErrorException extends Error {
    public readonly code: string;
    public readonly query: string;
  
    constructor(code: string, message: string, query: string) {
      super(message);
      this.name = 'DatabaseErrorException';
      this.code = code;
      this.query = query;
    }
  }
  