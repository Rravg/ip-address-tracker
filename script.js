var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IpApi_url;
var IpGeolocation = /** @class */ (function () {
    function IpGeolocation() {
        this.ipAddress = "";
        this.location = "";
        this.timezone = "";
        this.isp = "";
        this.latitude = 0;
        this.longitude = 0;
    }
    IpGeolocation.prototype.getData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        // console.log(data); // logs the API response
                        this.ipAddress = data.ip;
                        this.location = "".concat(data.district, ", ").concat(data.city);
                        this.timezone = this.getTimezone(data.time_zone.offset);
                        this.isp = data.isp;
                        this.latitude = data.latitude;
                        this.longitude = data.longitude;
                        return [2 /*return*/, {
                                ipAddress: this.ipAddress,
                                location: this.location,
                                timezone: this.timezone,
                                isp: this.isp,
                                latitude: this.latitude,
                                longitude: this.longitude
                            }];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IpGeolocation.prototype.getTimezone = function (n) {
        var sign = Math.sign(n);
        var timezone = "";
        var num = "";
        if (Math.abs(n) >= 10) {
            num = Math.abs(n).toString();
        }
        else {
            num = "0".concat(Math.abs(n).toString());
        }
        if (sign >= 0) {
            timezone = "UTC ".concat(num, ":00");
        }
        else {
            timezone = "UTC -".concat(num, ":00");
        }
        return timezone;
    };
    return IpGeolocation;
}());
var IpApi = /** @class */ (function () {
    function IpApi(domain, apiKey, ipAddress) {
        if (ipAddress === void 0) { ipAddress = ""; }
        _IpApi_url.set(this, void 0);
        this.domain = domain;
        this.apiKey = apiKey;
        this.ipAddress = ipAddress;
        __classPrivateFieldSet(this, _IpApi_url, "".concat(this.domain, "?apiKey=").concat(this.apiKey, "&").concat(this.ipAddress.length === 0 ? "" : "ip=" + this.ipAddress), "f");
    }
    Object.defineProperty(IpApi.prototype, "apiIP", {
        set: function (v) {
            this.ipAddress = v;
            __classPrivateFieldSet(this, _IpApi_url, "".concat(this.domain, "?apiKey=").concat(this.apiKey, "&").concat(this.ipAddress.length === 0 ? "" : "ip=" + this.ipAddress), "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IpApi.prototype, "apiURL", {
        get: function () {
            return __classPrivateFieldGet(this, _IpApi_url, "f");
        },
        enumerable: false,
        configurable: true
    });
    return IpApi;
}());
_IpApi_url = new WeakMap();
var LeafletMap = /** @class */ (function () {
    function LeafletMap() {
        this.map = L.map("map").setView([51.505, -0.09], 14);
        this.icon = L.icon({
            iconUrl: "./images/icon-location.svg",
            iconSize: [40, 40]
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap"
        }).addTo(this.map);
    }
    /**
     * updateMap
     */
    LeafletMap.prototype.updateMap = function (latitude, longitude) {
        this.map.setView([latitude, longitude]);
        L.marker([latitude, longitude], { icon: this.icon }).addTo(this.map);
    };
    return LeafletMap;
}());
var ipApi = new IpApi("https://api.ipgeolocation.io/ipgeo", "c2b4513ff2af4409bafe6bbed426ecaf");
var ipGeolocation = new IpGeolocation();
var Lmap = new LeafletMap();
var ipAddress = document.getElementById("ip-address");
var location_ = document.getElementById("location");
var timezone = document.getElementById("timezone");
var isp = document.getElementById("isp");
var submitButton = document.getElementById("submit");
var form = document.getElementById("ip-form");
var input = document.getElementById("ip");
function handleClick(ev) {
    ev.preventDefault();
    ipApi.apiIP = input.value;
    ipGeolocation.getData(ipApi.apiURL).then(function (data) {
        ipAddress.innerText = data.ipAddress;
        location_.innerText = data.location;
        timezone.innerText = data.timezone;
        isp.innerText = data.isp;
        Lmap.updateMap(data.latitude, data.longitude);
    });
}
form.onsubmit = handleClick;
(function () {
    ipGeolocation.getData(ipApi.apiURL).then(function (data) {
        ipAddress.innerText = data.ipAddress;
        location_.innerText = data.location;
        timezone.innerText = data.timezone;
        isp.innerText = data.isp;
        Lmap.updateMap(data.latitude, data.longitude);
    });
})();
