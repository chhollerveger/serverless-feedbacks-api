import { v4 as uuid } from 'uuid';

export class Feedback {
  private _id: string;
  private _type: string;
  private _comment: string;
  private _screenshot: string;
  private _createdAt: string;

  constructor(type: string, comment: string, screenshot?: string) {
    this._id = uuid();
    this._type = type;
    this._comment = comment;
    this._screenshot = screenshot;
    this._createdAt = new Date().toISOString();
    Object.freeze(this);
  }

  get id(): string {
    return this._id;
  }

  get type(): string {
    return this._type;
  }

  get comment(): string {
    return this._comment;
  }

  get screenshot(): string {
    return this._screenshot;
  }

  get createdAt(): string {
    return this._createdAt;
  }
}