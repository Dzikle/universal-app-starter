import type { FunctionExecution } from './types';

type RawExecution = {
  $id: string;
  functionId: string;
  status: string;
  responseStatusCode: number;
  responseBody: string;
  logs: string;
  errors: string;
};

export function normalizeExecution(execution: RawExecution): FunctionExecution {
  return {
    id: execution.$id,
    functionId: execution.functionId,
    status: String(execution.status),
    responseStatusCode: execution.responseStatusCode,
    responseBody: execution.responseBody,
    logs: execution.logs,
    errors: execution.errors,
  };
}
