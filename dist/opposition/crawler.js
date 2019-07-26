"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
var Status;
(function (Status) {
    Status["Valide"] = "1";
    Status["Invalide_not_found"] = "0";
    Status["Err"] = "-1";
})(Status = exports.Status || (exports.Status = {}));
class MinisterCrawler {
    constructor() {
        this.URI = "http://www.assiaqacard.ma/opppub/";
        this.OK_IMAGE_NAME = "images/Visuel_Etat-opposition_Non.png";
        this.KO_IMAGE_NAME = "images/Visuel_Etat-opposition_Oui.png";
        this.RESP_SELECTOR = ".ts-1-26 > img";
        this.REGION_KEY_MAP = {
            A: "أ",
            B: "ب",
            D: "د",
            H: "ھ",
            O: "و",
        };
    }
    getVehiculeStatus(licensePlate) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.send(licensePlate);
            return this.parseResponse(resp);
        });
    }
    parseResponse(resp) {
        if (resp === undefined) {
            return null;
        }
        if (resp === this.OK_IMAGE_NAME) {
            return Status.Valide;
        }
        if (resp === this.KO_IMAGE_NAME) {
            return Status.Invalide_not_found;
        }
        return Status.Invalide_not_found;
    }
    send(plate) {
        const options = {
            form: {
                immat1: plate.VehiculeID,
                immat2: this.mapRegionKey(plate.RegionKey1),
                immat3: plate.RegionKey2,
                suivant: null,
                type: "V",
            },
            transform: (body) => {
                const $ = cheerio_1.default.load(body);
                return $(this.RESP_SELECTOR).attr("src");
            },
            url: this.URI,
        };
        return request_promise_1.default.post(options);
    }
    mapRegionKey(key) {
        if (this.REGION_KEY_MAP[key]) {
            return this.REGION_KEY_MAP[key];
        }
        return key;
    }
}
exports.MinisterCrawler = MinisterCrawler;
//# sourceMappingURL=crawler.js.map