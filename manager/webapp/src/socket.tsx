import React from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "ws://localhost:${window.location.host}:8888";

export interface IGenerateRequest {
    album: string;
    prompt: string;
    seed: number;

    steps: number;
    width: number;
    height: number;

    count: number;
}

export interface IStatusLine {
    request: IGenerateRequest;
    remaining: number;
    total: number;
}
export interface IStatusResponse {
    lines: IStatusLine[];
    images_per_second: number;
}

export interface IClientLogin {
    password: string;
}

export interface IC2SEvents {
    login: (login: IClientLogin) => boolean;
    generate: (request: IGenerateRequest) => void;
}
export interface IS2CEvents {
    status: (status: IStatusResponse) => void;
}

type TClientSocket = Socket<IS2CEvents, IC2SEvents>;

export const socket: TClientSocket = io(SOCKET_URL, {
    transports: ["websocket"]
});

export const SocketContext = React.createContext<TClientSocket>(socket);
