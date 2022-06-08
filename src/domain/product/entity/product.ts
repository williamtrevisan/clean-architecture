import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factory/customer.validator.factory";
import { ProductInterface } from "./product.interface";

/* eslint-disable no-underscore-dangle */
class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();

    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  changePrice(price: number) {
    this._price = price;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  validate() {
    ProductValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}

export { Product };
