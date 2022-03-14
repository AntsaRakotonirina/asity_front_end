export interface MessageModel{
    "message":string
}

export interface LoginMessage extends MessageModel{
    "token":string,
}

export interface ErrorMessage extends MessageModel{
    "errors":any
}