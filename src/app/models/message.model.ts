import { EntityContainer } from "./entityContainer.model";
import { UserAttributes } from "./user.model";

export interface MessageModel{
    "message":string
}

export interface LoginMessage extends MessageModel{
    "token":string,
    "user":EntityContainer<UserAttributes>
}

export interface ErrorMessage extends MessageModel{
    "errors":any
}

export interface DataMessage<T> extends MessageModel{
    "data":T
}