export type FunctionExecution = {
  id: string;
  functionId: string;
  status: string;
  responseStatusCode: number;
  responseBody: string;
  logs: string;
  errors: string;
};

export interface FunctionAdapter {
  execute(input: {
    functionId: string;
    body?: string;
    async?: boolean;
  }): Promise<FunctionExecution>;
  getExecution(input: {
    functionId: string;
    executionId: string;
  }): Promise<FunctionExecution>;
}
