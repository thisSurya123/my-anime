import axios from 'axios';

export const axiosInstace = axios.create(
    {
        baseURL: "https://otakudesu-anime-api.vercel.app/api/v1",
    }
)