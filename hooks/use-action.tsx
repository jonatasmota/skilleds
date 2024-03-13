import { useCallback, useState } from "react";

interface Options {
  onError?: (error: any) => void;
  onSuccess?: (data: any) => void;
  onComplete?: () => void;
}

export const useAction = (
  action: (
    input: any
  ) => Promise<{ fieldErrors: any; error?: any; data?: any }>,
  options: Options = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<any>(null);

  const result = useCallback(
    async (input: any) => {
      try {
        const res = await action(input);

        if (!res) return;

        setFieldErrors(res.fieldErrors);
        if (res.error) {
          options.onError?.(res.error);
        }
        if (res.data) {
          options.onSuccess?.(res.data);
        }
      } finally {
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    result,
    fieldErrors,
  };
};
