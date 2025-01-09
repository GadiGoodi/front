import axios from "axios"

const CodingroomsModalApi = () => {

    // 코드방 생성 POST
    const postCodingrooms = (data: any) => {
        const result = axios.post("http://localhost:8080/api/codingrooms-modal/create", data)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
                alert(err.response.data.message);
            });

        return result;
    };

    // "코드방 참여" 생성 POST
    const postUserCodeRoom = (userId: number, roomId: number) => {
        const result = axios.post(`http://localhost:8080/api/user-code-rooms/${userId}/${roomId}`)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
                alert(err.response.data.message);
            });
    };

    // "코드방 참여" 수정 PATCH
    const patchUserCodeRoom = (userId: number, roomId: number) => {
        const result = axios.patch(`http://localhost:8080/api/user-code-rooms/${userId}/${roomId}`)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
                alert(err.response.data.message);
            });
    };

    // 코드 파일 생성 POST
    const postCode = (data: any) => {
        const result = axios.post("http://localhost:8080/api/code/create", data)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
                alert(err.response.data.message);
            });
        // return result;
    };

    return {
        postCodingrooms, postUserCodeRoom, patchUserCodeRoom, postCode
    }
}

export default CodingroomsModalApi;