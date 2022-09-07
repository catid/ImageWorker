import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { SocketContext, IStatusResponse, IClientLogin, IGenerateRequest } from "./socket";

export interface Props {
}

export interface IGeneratedImage {
    album: string;
    prompt: string;
    seed: number;
    batch: number;

    steps: number;
    width: number;
    height: number;

    batch_index: number;
}


const ChatRoom: React.FC<Props> = () => {
    const socket = useContext(SocketContext);
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isBusy, setIsBusy] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [status, setStatus] = useState<IStatusResponse | null>(null);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Successfully Connected to the Server");
        });

        socket.on("status", (status: IStatusResponse) => {
            setStatus(status);
        });
    }, [socket]);

    const generate = (request: IGenerateRequest) => {
        socket.emit("generate", request);
        setError(null);
        setIsBusy(true);
    };

    const login = () => {
        if (password.length === 0) {
            setError("Please Enter a password");
            return;
        }

        let login: IClientLogin = {
            password: password
        };

        socket.emit("login", login);
        setError(null);
        setIsBusy(true);
    };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div>
      <Form>
        <Container>
          {error && <Alert variant={"warning"}>{error}</Alert>}
          {loggedIn ? (
            <>
              {allMessages.map((msg, i) => (
                <Row key={i}>{`${msg.username} : ${msg.message}`}</Row>
              ))}
              <Row className="align-items-center">
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      placeholder="Enter a Message"
                      value={message || ""}
                      onChange={(v) => setMessage(v.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="Submit"
                    onClick={handleSubmit}
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                  placeholder="Enter a username"
                  value={username || ""}
                  onChange={(v) => setUsername(v.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Button variant="primary" type="Submit" onClick={login}>
                Login
              </Button>
            </>
          )}
        </Container>
      </Form>
    </div>
  );
};

export default ChatRoom;