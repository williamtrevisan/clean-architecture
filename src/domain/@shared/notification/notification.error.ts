import { NotificationErrorProps } from "./notification";

class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(errors.map((error) => error.message).join(","));
  }
}

export { NotificationError };
