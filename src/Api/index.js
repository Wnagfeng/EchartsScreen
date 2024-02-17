import WfRequest from "../request/index";
export function GetAllMapData() {
    return WfRequest.get({
        url: "/screen/map",
    });
}
export function GetAllUserData() {
    return WfRequest.get({
        url: "/screen/data",
    });
}