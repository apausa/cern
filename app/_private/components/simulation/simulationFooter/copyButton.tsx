import { Button } from '@nextui-org/react';
import React, { useCallback } from 'react';

export default function CopyButton() {
  const onCopy = useCallback((): void => {
    navigator.clipboard.writeText(window.location.toString());
  }, [navigator, window]);

  return (
    <Button
      onClick={onCopy}
      variant="light"
    >
      Copy link
    </Button>
  );
}
