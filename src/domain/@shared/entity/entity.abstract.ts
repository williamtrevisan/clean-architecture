import { Notification } from "../notification/notification";

abstract class Entity {
  protected _id: string;
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._id;
  }
}

export { Entity };
