type NotificationErrorProps = {
  context: string;
  message: string;
};

class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    return this.errors
      .filter((error) => {
        if (!context) return true;
        return error.context === context;
      })
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }
}

export { NotificationErrorProps, Notification };
