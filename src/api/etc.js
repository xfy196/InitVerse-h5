import {request} from "@/utils/request";
const token = '330bdb02bd934c7aa07fb0aa03f132a3'

export const getBalance = (data) => {
return request({
    method: "GET",
    url: `/tsanghiApi/api/fin/crypto/realtime?token=${token}&ticker=${data.ticker}`
})
};