import axios from "axios"
import { UUID } from "crypto";

const CodingroomsApi = () => {

    // 코드방 입장 GET
    const getCodingrooms = (uuid: UUID) => {
        const result = axios.get(`http://localhost:8080/api/codingrooms/${uuid as string}`)
        .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message);
        });
        
        return result;
    };

    // 코드 파일 GET
    const getCode = (codeId: string) => {
        const result = axios.get(`http://localhost:8080/api/code/${codeId}`)
        .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message);
        });
        
        return result;
    };

    // 코드 파일 저장(수정) POST
    const postEditedCode = (data: any) => {
        const result = axios.post("http://localhost:8080/api/code/save", data)
        .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message);
            return null;
        });

        return result;
    };

    return { getCodingrooms,
        getCode, postEditedCode }
}

export default CodingroomsApi;