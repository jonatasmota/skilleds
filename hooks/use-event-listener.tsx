const { useEffect } = require("react");

const useEventListener = (
  eventName: string,
  handler: (event: Event) => void
): void => {
  useEffect(() => {
    const eventListner = (e: Event) => handler(e);

    document.addEventListener(eventName, eventListner);

    return () => {
      document.removeEventListener(eventName, eventListner);
    };
  }, [eventName, handler]);
};
export default useEventListener;
