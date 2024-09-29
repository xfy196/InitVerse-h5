import { request } from "@/utils/request";

/**
 * 购买算力
 * @param {*} data
 * @returns
 */
export const purchaseComputingPower = (data) => {
  return request({
    url: "/h5/power/pay",
    method: "post",
    data,
  });
};
/**
 * 获取有效算力订单
 * @param {*} data
 * @returns
 */
export const getPowerInEffect = () => {
  return request({
    url: "/h5/power/inEffect",
    method: "get",
  });
};
export const getPowerAllList = () => {
  return request({
    url: "h5/power/list",
    method: "get",
  });
};
export const getRentingPowerSetting = () => {
  return request({
    url: "/h5/power/setting",
    method: "get",
  });
};

export const getProjectedRevenue = (data) => {
  return request({
    url: "/h5/power/pre/pay",
    method: "post",
    data,
  });
};

export const getBanners = () => {
  return request({
    url: "/h5/carousel/list",
    method: "get",
  });
};
export const getNotice = () => {
  return request({
    url: "/h5/notice/news",
    method: "get",
  });
};
export const getNoticeList = (parmas) => {
  return request({
    url: "/h5/notice/list",
    method: "get",
    parmas
  })
}
export const getNoticeDetail = (id) => {
  return request({
    url: "/h5/notice/detail/" + id,
    method: "get",
  })
}