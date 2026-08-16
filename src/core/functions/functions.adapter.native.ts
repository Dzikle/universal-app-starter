import { getNativeAppwrite } from '@/core/appwrite/services.native';

import { normalizeExecution } from './normalize';
import type { FunctionAdapter } from './types';

const functions = () => getNativeAppwrite().functions;

export const functionAdapter: FunctionAdapter = {
  async execute(input) {
    return normalizeExecution(
      await functions().createExecution({
        functionId: input.functionId,
        body: input.body,
        async: input.async,
      }),
    );
  },

  async getExecution(input) {
    return normalizeExecution(await functions().getExecution(input));
  },
};
