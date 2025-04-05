export interface IEnviroment {
    backendUrl: string;
}

export const Enviroment: IEnviroment = {
    backendUrl: "http://localhost:9999" // Thêm http:// vào trước
};
