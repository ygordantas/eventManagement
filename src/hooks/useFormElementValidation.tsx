import { useCallback, useRef, useState } from "react";

export default function useFormElementValidation<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onBlurHandler = useCallback(
    (
      e: React.FocusEvent<T, Element>,
      onBlur?: (e: React.FocusEvent<T, Element>) => void
    ) => {
      onBlur?.(e);

      const element = ref.current;

      if (!element) return;

      if ("checkValidity" in element && "validationMessage" in element) {
        const formElement = element as unknown as
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLSelectElement;

        setErrorMessage(
          formElement.checkValidity() ? "" : formElement.validationMessage
        );
      }
    },
    []
  );

  return { ref, errorMessage, onBlurHandler };
}
