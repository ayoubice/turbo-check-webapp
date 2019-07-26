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
const express_1 = __importDefault(require("express"));
const crawler_1 = require("./opposition/crawler");
const app = express_1.default();
const port = 8080 || process.env.PORT;
const crawler = new crawler_1.MinisterCrawler();
const parseLicenseFrom = (license) => {
    const parts = license.replace('"', "").split("-");
    if (parts.length === 3 && !parts.some(((elm) => (elm == null || elm === "")))) {
        return {
            RegionKey1: parts[1],
            RegionKey2: parts[2],
            VehiculeID: parts[0],
        };
    }
    return null;
};
app.get("/api/v1/car/status", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const licenseParam = req.query.license;
    const license = parseLicenseFrom(licenseParam);
    if (!license) {
        res.status(400);
        return res.json({
            error: "license plate format is incorrect",
        });
    }
    const result = yield crawler.getVehiculeStatus(license);
    res.json({
        statusCode: result,
        statusName: (result === crawler_1.Status.Valide) ? "No opposition" : "Vehicule not found or with opposition",
        ts: +new Date(),
    });
}));
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map