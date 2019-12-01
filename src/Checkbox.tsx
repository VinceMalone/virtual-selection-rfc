import * as React from 'react';

type ElementProps = Omit<JSX.IntrinsicElements['input'], 'type'>;

export interface CheckboxProps extends ElementProps {
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current);

    React.useLayoutEffect(() => {
      inputRef.current.indeterminate = !!indeterminate;
    }, [indeterminate]);

    return <input {...props} ref={inputRef} type="checkbox" />;
  },
);
