import moment from "moment";
import { MainFetcherDto } from "../dto/mainFetcher.dto";
import Ad from "../models/ad";
import Organization from "../models/organization";
import Slot from "../models/slot";
import * as geoip from "fast-geoip";
import AdLog from "../models/adLog";
import DefaultAd from "../models/defaultAd";

class AdUtils {
  public static async slotFetcher({ categoryId }) {
    let currTime = moment().utcOffset("+0530");
    let currDate = moment().utcOffset("+0530").format("YYYY-MM-DD");
    let currHour = currTime.hours();
    // let currHour = 13;
    if (currHour % 2 == 1) {
      currHour = currHour - 1;
    }
    let finalTime = currHour + ":00";
    let finalDate = currDate + finalTime;
    let newDate = moment(finalDate, "YYYY-MM-DD HH:mm");
    let afterDate = newDate.clone().add(2, "hours");
    let startTime = newDate.toDate();
    let endTime = afterDate.toDate();

    console.log("looking for ", startTime, " and ", endTime);
    let slotData = await Slot.findOne({
      startTime,
      endTime,
      categoryId,
    }).populate([
      { path: "organizationId", model: Organization },
      { path: "adId", model: Ad },
    ]);

    console.log("slot data is ", slotData);

    return slotData;
  }

  public static async checkActivityStatus({ slotData }) {
    let view = false;
    let click = false;
    if (slotData.adId.currViewCounts < slotData.organizationId.balanceViews) {
      view = true;
    }
    if (slotData.adId.currClickCounts < slotData.organizationId.balanceClicks) {
      click = true;
    }

    return { view, click };
  }

  public static async updateActivityStatus({ organizationId, adId }) {
    let updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      {
        $inc: {
          balanceViews: -1,
        },
      },
      {
        new: true,
      }
    );

    let updatedAd = await Ad.findByIdAndUpdate(
      adId,
      {
        $inc: {
          currViewCounts: 1,
        },
      },
      {
        new: true,
      }
    );

    console.log("updated organization is ", updatedOrganization);
    console.log("updated ad is ", updatedAd);
  }

  public static async adLogCreator({ adId, requestUrl, ipAddress, type }) {
    let locationData = await geoip.lookup(ipAddress);

    let newAdLog = await AdLog.findOneAndUpdate(
      { adId, ipAddress, type },
      {
        $set: {
          adId,
          ipAddress,
          locationData,
          requestUrl,
          type,
        },

        $inc: {
          count: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log("updated ad log is ", newAdLog);

    return;
  }

  public static async mainFetcher({ categoryId, ipAddress, requestUrl }) {
    let slotData: any = await this.slotFetcher({ categoryId });

    let finalResult: MainFetcherDto = {};
    let defaultAd = await DefaultAd.findOne({ categoryId });

    if (slotData) {
      let activityStatus = await this.checkActivityStatus({ slotData });

      console.log("activity status is ", activityStatus);
      finalResult.click = activityStatus.click;
      finalResult.view = activityStatus.view;

      if (finalResult.view) {
        await this.updateActivityStatus({
          adId: slotData.adId._id,
          organizationId: slotData.organizationId._id,
        });

        this.adLogCreator({
          adId: slotData.adId._id,
          ipAddress,
          requestUrl,
          type: "VIEW",
        });

        finalResult.imageUrl = slotData.adId.imageLink;
        finalResult.redirectUrl = slotData.adId.redirectUrl;
        finalResult.status = true;
        finalResult.message = "Views Available";
      } else {
        //views are vanished so send default ad based on category

        finalResult.default = true;
        finalResult.status = true;
        finalResult.message = "Views Are Vanished";
        finalResult.redirectUrl = defaultAd.categoryId;
        finalResult.imageUrl = defaultAd.imageLink;
      }
    } else {
      //to add dynamic default url based on category
      finalResult.click = false;
      finalResult.view = false;
      finalResult.default = true;
      finalResult.status = true;
      finalResult.message = "Slot Not Available";
      finalResult.redirectUrl = defaultAd.categoryId;
      finalResult.imageUrl = defaultAd.imageLink;
    }

    return finalResult;
  }

  public static async adClickHandler({ redirectUrl, ipAddress, requestUrl }) {
    let adData: any = await Ad.findOne({ redirectUrl }).populate(
      "organizationId"
    );
    console.log("ad data is ", adData);
    if (adData) {
      if (adData.currClickCounts > adData.organizationId.balanceClicks) {
        return { status: false };
      }

      let updatedAd = await Ad.findByIdAndUpdate(
        adData._id,
        {
          $inc: {
            currClickCounts: 1,
          },
        },
        {
          new: true,
        }
      );

      let updatedOrg = await Organization.findByIdAndUpdate(
        adData.organizationId._id,
        {
          $inc: {
            balanceClicks: -1,
          },
        },
        {
          new: true,
        }
      );

      this.adLogCreator({
        adId: adData._id,
        ipAddress,
        requestUrl,
        type: "CLICK",
      });

      console.log("udpated ad and organization are ", updatedAd, updatedOrg);
      return { status: true };
    }
  }
}

export default AdUtils;
