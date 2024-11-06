import { axiosInstance } from "../(hooks)/axiosConfig";

const index = () => {
  axiosInstance.get("/api")
  return (
    <>
      <h1>default Component</h1>
    </>
  )
}
export default index;