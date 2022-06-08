import { Notification } from "./notification";

describe("Unit tests for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error1 = {
      context: "customer",
      message: "error message",
    };

    notification.addError(error1);

    expect(notification.messages("customer")).toBe("customer: error message");

    const error2 = {
      context: "customer",
      message: "error message 2",
    };

    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message, customer: error message 2"
    );

    const orderError1 = {
      context: "order",
      message: "order error message",
    };

    notification.addError(orderError1);

    expect(notification.messages("customer")).toBe(
      "customer: error message, customer: error message 2"
    );
    expect(notification.messages("order")).toBe("order: order error message");
    expect(notification.messages()).toBe(
      "customer: error message, customer: error message 2, order: order error message"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      context: "customer",
      message: "error message",
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });
});
