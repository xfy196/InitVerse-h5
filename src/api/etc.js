import { request } from "@/utils/request";
const token = "330bdb02bd934c7aa07fb0aa03f132a3";

export const getRealTimeBalance = (params) => {
  return request({
    method: "GET",
    url: "/h5/coin/price/realtime",
    params,
  });
};
