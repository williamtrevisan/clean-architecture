/* eslint-disable no-underscore-dangle */
import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { Address } from "../value_object/address";

class Customer extends Entity {
  private _name = "";
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    super();

    this._id = id;
    this._name = name;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string): void {
    this._name = name;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (!this.address) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  isActive(): boolean {
    return this._active;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (!this._id) {
      this.notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }

    if (!this._name) {
      this.notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }
  }
}

export { Customer };
