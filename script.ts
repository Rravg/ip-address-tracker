class IpGeolocation {
  ipAddress: string = "";
  location: string = "";
  timezone: string = "";
  isp: string = "";

  latitude: number = 0;
  longitude: number = 0;

  constructor() {}

  async getData(url: string): Promise<
    | {
        ipAddress: string;
        location: string;
        timezone: string;
        isp: string;
        latitude: number;
        longitude: number;
      }
    | undefined
  > {
    try {
      let response: Response = await fetch(url);
      let data = await response.json();
      // console.log(data); // logs the API response
      this.ipAddress = data.ip;
      this.location = `${data.district}, ${data.city}`;
      this.timezone = this.getTimezone(data.time_zone.offset);
      this.isp = data.isp;

      this.latitude = data.latitude;
      this.longitude = data.longitude;
      return {
        ipAddress: this.ipAddress,
        location: this.location,
        timezone: this.timezone,
        isp: this.isp,
        latitude: this.latitude,
        longitude: this.longitude,
      };
    } catch (error) {
      console.log(error);
    }
  }

  private getTimezone(n: number): string {
    const sign: number = Math.sign(n);
    let timezone: string = "";
    let num: string = "";

    if (Math.abs(n) >= 10) {
      num = Math.abs(n).toString();
    } else {
      num = `0${Math.abs(n).toString()}`;
    }

    if (sign >= 0) {
      timezone = `UTC ${num}:00`;
    } else {
      timezone = `UTC -${num}:00`;
    }
    return timezone;
  }
}

class IpApi {
  domain: string;
  apiKey: string;
  ipAddress: string;
  #url: string;

  constructor(domain: string, apiKey: string, ipAddress: string = "") {
    this.domain = domain;
    this.apiKey = apiKey;
    this.ipAddress = ipAddress;
    this.#url = `${this.domain}?apiKey=${this.apiKey}&${
      this.ipAddress.length === 0 ? "" : "ip=" + this.ipAddress
    }`;
  }

  set apiIP(v: string) {
    this.ipAddress = v;
    this.#url = `${this.domain}?apiKey=${this.apiKey}&${
      this.ipAddress.length === 0 ? "" : "ip=" + this.ipAddress
    }`;
  }

  get apiURL(): string {
    return this.#url;
  }
}

class LeafletMap {
  map = L.map("map").setView([51.505, -0.09], 14);
  icon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [40, 40],
  });
  constructor() {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
  }

  /**
   * updateMap
   */
  public updateMap(latitude: number, longitude: number) {
    this.map.setView([latitude, longitude]);
    L.marker([latitude, longitude], { icon: this.icon }).addTo(this.map);
  }
}

const ipApi = new IpApi(
  "https://api.ipgeolocation.io/ipgeo",
  "c2b4513ff2af4409bafe6bbed426ecaf"
);
const ipGeolocation = new IpGeolocation();
const Lmap = new LeafletMap();

const ipAddress = document.getElementById("ip-address");
const location_ = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

const submitButton: HTMLElement | null = document.getElementById("submit");
const form = document.getElementById("ip-form");
const input = document.getElementById("ip") as HTMLInputElement;

function handleClick(ev: SubmitEvent) {
  ev.preventDefault();
  ipApi.apiIP = input.value;
  ipGeolocation.getData(ipApi.apiURL).then((data) => {
    ipAddress!.innerText = data!.ipAddress;
    location_!.innerText = data!.location;
    timezone!.innerText = data!.timezone;
    isp!.innerText = data!.isp;

    Lmap.updateMap(data!.latitude, data!.longitude);
  });
}
form!.onsubmit = handleClick;

(function () {
  ipGeolocation.getData(ipApi.apiURL).then((data) => {
    ipAddress!.innerText = data!.ipAddress;
    location_!.innerText = data!.location;
    timezone!.innerText = data!.timezone;
    isp!.innerText = data!.isp;

    Lmap.updateMap(data!.latitude, data!.longitude);
  });
})();
