import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

// WebSocketService 객체 선언
const WebSocketService = (() => {
    let stompClient: CompatClient | null = null;
    const subscriptions: Record<string, any> = {};

    // WebSocket 서버 연결 설정
    const connect = (
        endpoint: string,
        roomId: number,
        codeId: string,
        onMessage: (message: string) => void,
    ): void => {
        const socket = new SockJS(endpoint); // SockJS를 사용한 WebSocket 연결 생성
        stompClient = Stomp.over(socket); // STOMP 프로토콜 클라이언트 생성

        stompClient.connect({}, () => {
            const subscription = stompClient?.subscribe(
                `/sub/codingrooms/${roomId}`,
                (msg) => {
                    if (msg.body) {
                        onMessage(msg.body); // 메시지 콜백 실행
                    }
                },
                { id: `tab-${codeId}` }
            );

            if (subscription) {
                subscriptions[`tab-${codeId}`] = subscription; // 구독 저장
            }
        },
            (error: any) => {
                console.error("WebSocket error:", error);
            }
        );
    };

    // WebSocket 연결 해제
    const disconnect = (): void => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log("Disconnected from WebSocket");
            });
            stompClient = null;
        }
    };

    // 메시지 전송
    const send = (destination: string, body: string): void => {
        if (stompClient && stompClient.connected) {
            stompClient.send(destination, {}, body);
        } else {
            console.warn("Cannot send: WebSocket is not connected");
        }
    };

    // 재구독
    const resubscribe = (
        roomId: number,
        // unsubcribeCodeId: string,
        subscribeCodeId: string,
        onMessage: (message: string) => void
    ): void => {
        // 기존 구독 해제
        // if (unsubcribeCodeId) {
        //     unsubscribe(unsubcribeCodeId);
        // }

        if (subscribeCodeId) {
            // 새 구독 추가
            const subscription = stompClient?.subscribe(
                `/sub/codingrooms/${roomId}`,
                (msg) => {
                    if (msg.body) {
                        onMessage(msg.body);
                    }
                },
                { id: `tab-${subscribeCodeId}` }
            );

            if (subscription) {
                subscriptions[`tab-${subscribeCodeId}`] = subscription; // 구독 저장
            }
        }
    };

    // 구독 해제
    const unsubscribe = (codeId: string): void => {
        const subscription = subscriptions[`tab-${codeId}`];
        if (subscription) {
            subscription.unsubscribe();
            delete subscriptions[`tab-${codeId}`]; // 구독 목록에서 제거
        } else {
            console.warn(`No subscription found for tab-${codeId}`);
        }
    };

    return {
        subscriptions, connect, disconnect,
        send, resubscribe, unsubscribe
    };
})();

export default WebSocketService;
