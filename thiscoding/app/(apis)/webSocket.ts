import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

class WebSocketService {
    // null 초기화로 WebSocket 연결이 없는 객체를 선언
    private stompClient: CompatClient | null = null;

    // WebSocket 서버 연결 설정
    connect(endpoint: string, onMessage: (message: string) => void): void {
        // endpoint: WebSocket 서버의 엔드 포인트 URL
        // onMessage: 서버에서 수신한 메시지를 처리하는 콜백 함수

        const socket = new SockJS(endpoint); // SockJS를 사용한 WebSocket 연결 생성
        this.stompClient = Stomp.over(socket); // STOMP 프로토콜 클라이언트 생성

        // 서버와 연결
        this.stompClient.connect({}, () => {
            console.log("Connected to WebSocket");

            // 구독 설정
            // stompClient가 존재할 경우, STOMP 프로토콜을 통해 /topic/messages를 구독
            this.stompClient?.subscribe("/topic/messages", (msg) => {
                // 수신한 메시지가 있다면, 
                // subscribe 메서드는 서버로부터 메시지를 받을 때 호출되는 콜백 함수를 등록
                // 콜백 함수는 서버가 보낸 메시지(msg) 객체를 받음

                if (msg.body) { // 메시지 본문인 msg.body가 유효한 경우
                    onMessage(msg.body); // 메시지 콜백 실행
                }
            });
        }, (error: any) => {
            console.error("WebSocket error:", error);
        });
    }

    send(destination: string, body: string): void {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, body);
        } else {
            console.warn("Cannot send: WebSocket is not connected");
        }
    }

    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log("Disconnected from WebSocket");
            });
            this.stompClient = null;
        }
    }
}

export default new WebSocketService();
