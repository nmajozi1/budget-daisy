import { useEffect, useState } from "react";

interface IError {
  open: boolean | undefined;
  message: string | undefined;
};

const AlertErrorMessage = (Props: IError) => {
  const [close, setClose] = useState<boolean>(false);
  const { open, message } = Props;

  const onCloseMessage = () => setClose(false);

  useEffect(() => {
    if (open) setClose(true);
  }, [open]);

  return (
    <>
      {close && (
        <div role="alert" className="alert alert-error">
          <svg
            onClick={onCloseMessage}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{message}</span>
        </div>
      )}
    </>
  )
}

export default AlertErrorMessage