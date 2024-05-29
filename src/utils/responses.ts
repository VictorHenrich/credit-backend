export enum ResponseTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  UNAUTHORIZED = 'unauthorized',
}

export interface JSONResponseProps<T> {
  statusCode: number;
  info: ResponseTypes;
  data: T;
}

export class JSONSuccessResponse implements JSONResponseProps<any> {
  statusCode: number;
  info: ResponseTypes;
  data: any;

  constructor({ data }: Pick<JSONResponseProps<any>, 'data'> = { data: null }) {
    this.statusCode = 200;
    this.info = ResponseTypes.SUCCESS;
    this.data = data;
  }
}

export class JSONErrorResponse implements JSONResponseProps<string> {
  statusCode: number;
  info: ResponseTypes;
  data: string;

  constructor({ data }: Pick<JSONResponseProps<string>, 'data'>) {
    this.statusCode = 200;
    this.info = ResponseTypes.ERROR;
    this.data = data;
  }
}

export class JSONUnauthorizedResponse implements JSONResponseProps<string> {
  statusCode: number;
  info: ResponseTypes;
  data: string;

  constructor() {
    this.statusCode = 200;
    this.info = ResponseTypes.UNAUTHORIZED;
    this.data = 'Request blocked, please check authentication keys';
  }
}
