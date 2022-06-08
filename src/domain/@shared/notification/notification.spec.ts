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
  });
});
