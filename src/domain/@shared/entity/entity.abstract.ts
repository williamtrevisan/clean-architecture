import { Notification } from "../notification/notification";

abstract class Entity {
  protected _id: string;
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }
}

export { Entity };
